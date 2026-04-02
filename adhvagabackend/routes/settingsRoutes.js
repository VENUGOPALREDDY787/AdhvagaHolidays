import { Router } from "express";
import {
  getSettings,
  updateSettings
} from "../controllers/settingsController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = Router();


router.get("/", getSettings);

5
router.put("/", jwtAuth, updateSettings);

export default router;