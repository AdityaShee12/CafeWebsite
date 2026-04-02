import Reservation from "../models/Reservation.models.js";
import mongoose from "mongoose";

/* ─────────────────────────────────────────
   Helper: check if a time slot is available
───────────────────────────────────────── */
const isSlotAvailable = async (date, time, excludeId = null) => {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  const query = {
    date: { $gte: dayStart, $lte: dayEnd },
    time,
    status: { $in: ["pending", "confirmed"] },
  };

  // Exclude current reservation when updating
  if (excludeId) query._id = { $ne: excludeId };

  const count = await Reservation.countDocuments(query);
  // Max 3 simultaneous bookings per slot
  return count < 3;
};

/* ─────────────────────────────────────────
   POST /api/reservations
   Create a new reservation
───────────────────────────────────────── */
export const createReservation = async (req, res) => {
  try {
    const {
      name, email, phone,
      date, time, guests,
      occasion, seatingPreference, specialRequests,
    } = req.body;

    /* Validate date is not in the past */
    const reservationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (reservationDate < today) {
      return res.status(400).json({
        success: false,
        message: "Reservation date cannot be in the past.",
      });
    }

    /* Check slot availability */
    const available = await isSlotAvailable(date, time);
    if (!available) {
      return res.status(409).json({
        success: false,
        message: "This time slot is fully booked. Please choose another time.",
      });
    }

    const reservation = await Reservation.create({
      name, email, phone,
      date: reservationDate, time, guests,
      occasion: occasion || "",
      seatingPreference: seatingPreference || "No Preference",
      specialRequests: specialRequests || "",
    });

    res.status(201).json({
      success: true,
      message: "Reservation confirmed! We look forward to seeing you.",
      data: {
        confirmationCode: reservation.confirmationCode,
        name: reservation.name,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
        status: reservation.status,
        _id: reservation._id,
      },
    });
  } catch (err) {
    /* Mongoose validation errors */
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    console.error("createReservation error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

/* ─────────────────────────────────────────
   GET /api/reservations
   Get all reservations (admin)
   Query params: status, date, page, limit
───────────────────────────────────────── */
export const getAllReservations = async (req, res) => {
  try {
    const { status, date, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (date) {
      const d = new Date(date);
      const start = new Date(d.setHours(0, 0, 0, 0));
      const end   = new Date(d.setHours(23, 59, 59, 999));
      filter.date = { $gte: start, $lte: end };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Reservation.countDocuments(filter);

    const reservations = await Reservation.find(filter)
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: reservations,
    });
  } catch (err) {
    console.error("getAllReservations error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/* ─────────────────────────────────────────
   GET /api/reservations/:id
   Get single reservation by ID or confirmation code
───────────────────────────────────────── */
export const getReservation = async (req, res) => {
  try {
    const { id } = req.params;

    // Support both MongoDB _id and confirmation code
    const reservation = mongoose.Types.ObjectId.isValid(id)
      ? await Reservation.findById(id)
      : await Reservation.findOne({ confirmationCode: id.toUpperCase() });

    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found." });
    }

    res.json({ success: true, data: reservation });
  } catch (err) {
    console.error("getReservation error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/* ─────────────────────────────────────────
   GET /api/reservations/lookup/:code
   Guest self-lookup by confirmation code
───────────────────────────────────────── */
export const lookupByCode = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      confirmationCode: req.params.code.toUpperCase(),
    }).select("-adminNotes");

    if (!reservation) {
      return res.status(404).json({ success: false, message: "No reservation found with that code." });
    }

    res.json({ success: true, data: reservation });
  } catch (err) {
    console.error("lookupByCode error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/* ─────────────────────────────────────────
   PATCH /api/reservations/:id/status
   Update reservation status (admin)
───────────────────────────────────────── */
export const updateStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const validStatuses = ["pending", "confirmed", "cancelled", "completed", "no-show"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status, ...(adminNotes !== undefined && { adminNotes }) },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found." });
    }

    res.json({
      success: true,
      message: `Reservation ${status}.`,
      data: reservation,
    });
  } catch (err) {
    console.error("updateStatus error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/* ─────────────────────────────────────────
   PATCH /api/reservations/:id
   Guest updates their own reservation
───────────────────────────────────────── */
export const updateReservation = async (req, res) => {
  try {
    const {
      name, phone,
      date, time, guests,
      occasion, seatingPreference, specialRequests,
    } = req.body;

    const existing = await Reservation.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Reservation not found." });
    }
    if (existing.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Cannot modify a cancelled reservation." });
    }

    /* If date/time changed, recheck availability */
    if (date || time) {
      const newDate = date ? new Date(date) : existing.date;
      const newTime = time || existing.time;
      const available = await isSlotAvailable(newDate, newTime, existing._id);
      if (!available) {
        return res.status(409).json({ success: false, message: "The new time slot is fully booked." });
      }
    }

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        ...(name  && { name }),
        ...(phone && { phone }),
        ...(date  && { date: new Date(date) }),
        ...(time  && { time }),
        ...(guests && { guests }),
        ...(occasion          !== undefined && { occasion }),
        ...(seatingPreference !== undefined && { seatingPreference }),
        ...(specialRequests   !== undefined && { specialRequests }),
        status: "pending", // reset to pending on guest edit
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Reservation updated successfully.",
      data: updated,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    console.error("updateReservation error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/* ─────────────────────────────────────────
   DELETE /api/reservations/:id
   Cancel reservation (guest or admin)
───────────────────────────────────────── */
export const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found." });
    }

    res.json({
      success: true,
      message: "Reservation cancelled successfully.",
      data: reservation,
    });
  } catch (err) {
    console.error("cancelReservation error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/* ─────────────────────────────────────────
   GET /api/reservations/available-slots
   Check available time slots for a date
   Query: date (required)
───────────────────────────────────────── */
export const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required." });
    }

    const ALL_SLOTS = [
      "08:00","08:30","09:00","09:30","10:00","10:30",
      "11:00","11:30","12:00","12:30","13:00","13:30",
      "14:00","14:30","15:00","15:30","16:00","16:30",
      "17:00","17:30","18:00","18:30","19:00","19:30",
      "20:00","20:30","21:00","21:30","22:00","22:30",
    ];

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    /* Count bookings per slot */
    const booked = await Reservation.aggregate([
      {
        $match: {
          date: { $gte: dayStart, $lte: dayEnd },
          status: { $in: ["pending", "confirmed"] },
        },
      },
      { $group: { _id: "$time", count: { $sum: 1 } } },
    ]);

    const bookedMap = {};
    booked.forEach(b => { bookedMap[b._id] = b.count; });

    const slots = ALL_SLOTS.map(slot => ({
      time: slot,
      available: (bookedMap[slot] || 0) < 3,
      remaining: Math.max(0, 3 - (bookedMap[slot] || 0)),
    }));

    res.json({ success: true, date, data: slots });
  } catch (err) {
    console.error("getAvailableSlots error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};