import mongoose from "mongoose";

/* Sub-schema for itinerary (NEW – optional) */
const itinerarySchema = new mongoose.Schema(
  {
    day: Number,
    title: String,
    description: String,
  },
  { _id: false }
);

const PackageSchema = new mongoose.Schema({
  /* ===== EXISTING FIELDS (UNCHANGED) ===== */

  title: {
    type: String
  },

  location: {
    type: String
  },

  destination: {
    type: String,
    required: true
  },
  tag:{
    type:String,
  },

  description: {
    type: String,
  },

  price: { 
    type: Number
  },

  duration: {
    type: String,
  },

  rating: {
    type: Number,
    default: 0
  },

  category: {
    type: String,
    enum: [
      "Relaxation",
      "Cultural",
      "Adventure",
      "Luxury",
      "Family",
      "Transport"
    ],
    required: true
  },
  type:{
    type: String,
  },

  image: {
    type: String,
  },

  availableSeats: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  /* ===== NEW FIELDS (SAFE ADDITIONS) ===== */

  packageId: {
    type: String,
    unique: true,
    sparse: true // allows old documents without this field
  },

  itinerary: {
    type: [itinerarySchema],
    default: []
  },

  highlights: {
    type: [String],
    default: []
  },

  includes: {
    type: [String],
    default: []
  },

  excludes: {
    type: [String],
    default: []
  }
});

const Package = mongoose.model("Package", PackageSchema);
export default Package;
