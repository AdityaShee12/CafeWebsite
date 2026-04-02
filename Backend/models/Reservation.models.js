import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    /* ── Guest Info ── */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [80, "Name cannot exceed 80 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[+]?[\d\s\-()]{7,20}$/, "Please provide a valid phone number"],
    },

    /* ── Booking Details ── */
    date: {
      type: Date,
      required: [true, "Reservation date is required"],
    },
    time: {
      type: String,
      required: [true, "Reservation time is required"],
      enum: {
        values: [
          "08:00", "08:30",
          "09:00", "09:30",
          "10:00", "10:30",
          "11:00", "11:30",
          "12:00", "12:30",
          "13:00", "13:30",
          "14:00", "14:30",
          "15:00", "15:30",
          "16:00", "16:30",
          "17:00", "17:30",
          "18:00", "18:30",
          "19:00", "19:30",
          "20:00", "20:30",
          "21:00", "21:30",
          "22:00", "22:30",
        ],
        message: "Invalid time slot",
      },
    },
    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least 1 guest required"],
      max: [20, "Maximum 20 guests per reservation"],
    },

    /* ── Optional Details ── */
    occasion: {
      type: String,
      enum: ["", "Birthday", "Anniversary", "Date Night", "Business Lunch", "Family Gathering", "Bridal Shower", "Other"],
      default: "",
    },
    seatingPreference: {
      type: String,
      enum: ["", "Indoor", "Outdoor", "Window Seat", "Private Corner", "No Preference"],
      default: "No Preference",
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [500, "Special requests cannot exceed 500 characters"],
      default: "",
    },

    /* ── Status ── */
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "no-show"],
      default: "pending",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },

    /* ── Internal Notes ── */
    adminNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* ── Auto-generate confirmation code before save ── */
reservationSchema.pre("save", function () {
  if (!this.confirmationCode) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "AROMA-";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.confirmationCode = code;
  }
});

/* ── Index for faster queries ── */
reservationSchema.index({ date: 1, time: 1 });
reservationSchema.index({ email: 1 });
reservationSchema.index({ status: 1 });

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;