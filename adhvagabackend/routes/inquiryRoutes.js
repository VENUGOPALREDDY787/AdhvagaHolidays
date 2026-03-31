import express from "express";
import { createInquiry, getAllInquiries,deleteInquiry } from "../controllers/inquiryController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = express.Router();

// 🌍 Public
router.post("/", createInquiry);

// 🔐 Admin only
router.get("/",  getAllInquiries);
router.delete("/:id", jwtAuth, deleteInquiry);

export default router;
