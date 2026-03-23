import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";
const router = express.Router();

// POST /api/admin/login
router.post("/login", adminLogin);
router.get("/verify-admin", jwtAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
