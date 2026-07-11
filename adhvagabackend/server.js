import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import connectDB from "./config/database.js";  

import packageRoutes from "./routes/packageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import whatsappLeadRoutes from "./routes/whatsappLeadRoutes.js";
import visaCountryRoutes from "./routes/visaCountryRoutes.js";

dotenv.config();

const app = express();

// ✅ Security Headers
app.use(helmet());

// ✅ CORS (safe for production)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// ✅ Database connection with safety
connectDB()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/admin", adminRoutes);
app.use("/api/packages", packageRoutes);  
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/whatsapp-leads", whatsappLeadRoutes);
app.use("/api/visas", visaCountryRoutes);

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// ✅ PORT fix (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});