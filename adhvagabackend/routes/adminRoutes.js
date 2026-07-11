import express from "express";
import rateLimit from "express-rate-limit";
import { adminLogin } from "../controllers/adminController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";
const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { message: "Too many login attempts, please try again after 15 minutes" },
});

// POST /api/admin/login
router.post("/login", loginLimiter, adminLogin);
router.get("/verify-admin", jwtAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
