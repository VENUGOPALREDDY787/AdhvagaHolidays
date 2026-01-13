import express from "express";
import { createInquiry, getAllInquiries } from "../controllers/inquiryController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = express.Router();

// 🌍 Public
router.post("/", createInquiry);

// 🔐 Admin only
router.get("/", jwtAuth, getAllInquiries);

export default router;
