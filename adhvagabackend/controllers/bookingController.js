import Booking from "../models/bookingModels.js";

/**
 * POST /api/bookings
 * Public - Create booking
 */
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({
      message: "Booking submitted successfully",
      data: booking
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(400).json({
      message: "Failed to submit booking"
    });
  }
};

/**
 * GET /api/bookings
 * Admin only - Get all bookings
 */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("packageId", "title destination price")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({
      message: "Failed to fetch bookings"
    });
  }
};

/**
 * PUT /api/bookings/:id/status
 * Admin only - Update booking status
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.status(200).json({
      message: "Booking status updated",
      data: booking
    });

  } catch (error) {
    console.error("Update booking error:", error);
    res.status(500).json({
      message: "Failed to update booking status"
    });
  }
};
