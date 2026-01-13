import { Router } from "express";
import {
  createPackage,
  getAllPackages,
  deletePackage,
  getPackageById,
  updatePackage
} from "../controllers/packageController.js";
import { upload } from "../config/multer.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = Router();
router.get("/", getAllPackages);
router.get("/:id", getPackageById);

// 🔐 Admin only
router.post("/", jwtAuth, upload.single("image"), createPackage);
router.put("/:id", jwtAuth, upload.single("image"), updatePackage);
router.delete("/:id", jwtAuth, deletePackage);


export default router;
