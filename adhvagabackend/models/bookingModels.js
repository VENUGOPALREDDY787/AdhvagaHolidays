import mongoose from "mongoose";
import Package from "./packagesModels.js";
const BookingSchema = new mongoose.Schema({
  customerName: {
    type:String
  },
  email: {
    type:String
},
  phone: {
    type:String
  },
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: Package
 },
  travelDate:{ 
    type:Date
  },
  persons: {
    type:Number
  },
  message: {
    type:String
  },
  status: {
    type: String,
    default: "pending" // pending, confirmed, cancelled
  },
  createdAt: { 
    type: Date, 
    default: Date.now }
});
const Booking=mongoose.model("Booking", BookingSchema);
export default Booking;