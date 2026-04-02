import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservation,
  lookupByCode,
  updateStatus,
  updateReservation,
  cancelReservation,
  getAvailableSlots,
} from "../controller/Reservation.controller.js";

const router = express.Router();

/* ── Public Routes ── */

// Create new reservation
// POST /api/reservations
router.post("/", createReservation);

// Check available slots for a date
// GET /api/reservations/available-slots?date=2025-12-25
router.get("/available-slots", getAvailableSlots);

// Guest self-lookup by confirmation code
// GET /api/reservations/lookup/AROMA-ABC123
router.get("/lookup/:code", lookupByCode);

// Get / update / cancel a single reservation
// GET    /api/reservations/:id
// PATCH  /api/reservations/:id
// DELETE /api/reservations/:id
router.get("/:id",    getReservation);
router.patch("/:id",  updateReservation);
router.delete("/:id", cancelReservation);

/* ── Admin Routes ── */
import { protect, admin } from "../middleware/auth.middleware.js";

// GET all reservations with filters
// GET /api/reservations?status=confirmed&date=2025-12-25&page=1&limit=20
router.get("/", protect, admin, getAllReservations);

// Update status only
// PATCH /api/reservations/:id/status
router.patch("/:id/status", protect, admin, updateStatus);

export default router;