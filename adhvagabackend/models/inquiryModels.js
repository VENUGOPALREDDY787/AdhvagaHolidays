import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true
  },

  phone: {
    type: String,
    required: true
  },

  subject: {
    type: String,
    default: "General Inquiry"
  },

  message: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Inquiry=mongoose.model("Inquiry", inquirySchema);
export default Inquiry;