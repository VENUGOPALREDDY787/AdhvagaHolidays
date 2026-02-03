import express from "express";
import { getSettings, updateSettings, uploadLogo, uploadHeroBanner } from "../controllers/settingsController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// Public route - get settings
router.get("/", getSettings);

// Admin routes - require authentication
router.put("/", jwtAuth, updateSettings);
router.post("/logo", jwtAuth, upload.single("logo"), uploadLogo);
router.post("/banner", jwtAuth, upload.single("banner"), uploadHeroBanner);

export default router;
