import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";

import { jwtAuth } from "../middleware/jwtAuth.js";

const router = express.Router();

// 🌍 Public
router.post("/", createBooking);

// 🔐 Admin only
router.get("/", jwtAuth, getAllBookings);
router.put("/:id/status", jwtAuth, updateBookingStatus);

export default router;
