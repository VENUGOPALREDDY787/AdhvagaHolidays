import { Router } from "express";
import {
  createVisaCountry,
  deleteVisaCountry,
  getAllVisaCountries,
  getVisaCountryById,
  updateVisaCountry,
} from "../controllers/visaCountryController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = Router();

router.get("/", getAllVisaCountries);
router.get("/:id", getVisaCountryById);

router.post("/", jwtAuth, createVisaCountry);
router.put("/:id", jwtAuth, updateVisaCountry);
router.delete("/:id", jwtAuth, deleteVisaCountry);

export default router;
