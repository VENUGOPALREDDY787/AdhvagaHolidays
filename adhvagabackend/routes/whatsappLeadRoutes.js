import express from "express";
import {
  createLead,
  getLeads,
  getLeadStats,
  updateLead,
  deleteLead,
} from "../controllers/whatsappLeadController.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const router = express.Router();

router.route("/").post(createLead).get(jwtAuth, getLeads);
router.route("/stats").get(jwtAuth, getLeadStats);
router.route("/:id").put(jwtAuth, updateLead).delete(jwtAuth, deleteLead);

export default router;
