import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String
}, { _id: false });

const servicesSchema = new mongoose.Schema({
  airTickets: Boolean,
  visa: Boolean,
  insurance: Boolean,
  carRental: Boolean,
  customPackages: Boolean,
  corporateServices: Boolean
}, { _id: false });

const settingsSchema = new mongoose.Schema({
  agencyName: { type: String, default: "Adhvaga Holidays Inc" },
  tagline: String,
  contactNumber: String,
  whatsappNumber: String,
  email: String,
  address: String,

  facebook: String,
  instagram: String,
  twitter: String,
  youtube: String,

  language: String,
  timezone: String,
  currency: String,

  workingHoursStart: String,
  workingHoursEnd: String,

  holidayListEnabled: Boolean,

  heroText: String,
  promoText: String,
  promoEnabled: Boolean,

  flyersEnabled: { type: Boolean, default: true },

  services: servicesSchema,

  showPricing: Boolean,
  bookingConfirmation: String,
  paymentGateway: String,
  cancellationPolicy: String,

  welcomeEmail: Boolean,
  bookingConfirmationEmail: Boolean,
  smsNotifications: Boolean,
  adminAlerts: Boolean,
  twoFactorAuth: Boolean,

  metaTitle: String,
  metaDescription: String,
  keywords: String,

  googleAnalyticsId: String,
  facebookPixelId: String,

  autoApproveReviews: Boolean,
  showStarRatings: Boolean,

  faqItems: [faqSchema]
}, { timestamps: true });

export default mongoose.model("Settings", settingsSchema);