import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";  
import packageRoutes from "./routes/packageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); 
app.use("/api/admin", adminRoutes);
app.use("/api/packages", packageRoutes);  
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
