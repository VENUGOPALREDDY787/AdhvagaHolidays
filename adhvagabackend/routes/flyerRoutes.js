import express from "express";
import {
  getFlyers,
  createFlyer,
  updateFlyer,
  deleteFlyer,
} from "../controllers/flyerController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = express.Router();

// GET /api/flyers
router.get("/", getFlyers);

// Protected Admin Routes
router.post("/", jwtAuth, createFlyer);
router.put("/:id", jwtAuth, updateFlyer);
router.delete("/:id", jwtAuth, deleteFlyer);

export default router;
