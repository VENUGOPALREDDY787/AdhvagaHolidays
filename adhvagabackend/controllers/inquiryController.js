import Inquiry from "../models/inquiryModels.js";

// Public - create inquiry
export const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({
      message: "Inquiry submitted successfully",
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to submit inquiry" });
  }
};

// Admin only - get all inquiries
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
};
