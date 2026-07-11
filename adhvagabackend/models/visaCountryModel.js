import mongoose from "mongoose";

const visaCountrySchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    visaType: {
      type: String,
      default: "Tourist Visa",
      trim: true,
    },
    processingTime: {
      type: String,
      default: "7-10 Working Days",
      trim: true,
    },
    entries: {
      type: String,
      default: "Single Entry",
      trim: true,
    },
    validity: {
      type: String,
      default: "90 Days",
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },
    documentsRequired: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const VisaCountry = mongoose.model("VisaCountry", visaCountrySchema);

export default VisaCountry;
