import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
  // Profile
  agencyName: { type: String, default: "Adhvaga Holidays Inc" },
  tagline: { type: String, default: "Your Trusted Travel Partner" },
  logo: { type: String },
  contactNumber: { type: String, default: "+1 (234) 567-890" },
  email: { type: String, default: "info@adhvagaholidays.com" },
  address: { type: String, default: "Bangalore, India" },
  facebook: { type: String, default: "https://facebook.com/adhvagaholidays" },
  instagram: { type: String, default: "https://instagram.com/adhvagaholidays" },
  twitter: { type: String, default: "https://twitter.com/adhvagaholidays" },
  youtube: { type: String },

  // General
  language: { type: String, default: "en" },
  timezone: { type: String, default: "Asia/Kolkata" },
  currency: { type: String, default: "INR" },
  workingHoursStart: { type: String, default: "09:00" },
  workingHoursEnd: { type: String, default: "18:00" },
  holidayListEnabled: { type: Boolean, default: true },

  // Homepage
  heroText: { type: String, default: "Explore the World with Adhvaga Holidays" },
  heroBanner: { type: String },
  promoText: { type: String, default: "Book Now & Get 20% Off on International Packages!" },
  promoEnabled: { type: Boolean, default: true },

  // Services
  services: {
    airTickets: { type: Boolean, default: true },
    visa: { type: Boolean, default: true },
    insurance: { type: Boolean, default: true },
    carRental: { type: Boolean, default: true },
    customPackages: { type: Boolean, default: true },
    corporateServices: { type: Boolean, default: true }
  },
  showPricing: { type: Boolean, default: true },

  // Booking
  bookingConfirmation: { type: String, default: "auto" },
  paymentGateway: { type: String, default: "razorpay" },
  cancellationPolicy: { type: String, default: "Cancellation allowed up to 48 hours before departure with full refund." },

  // Email & Notifications
  welcomeEmail: { type: Boolean, default: true },
  bookingConfirmationEmail: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: false },
  adminAlerts: { type: Boolean, default: true },

  // Security
  twoFactorAuth: { type: Boolean, default: false },

  // SEO
  metaTitle: { type: String, default: "Adhvaga Holidays | Best Travel Agency" },
  metaDescription: { type: String, default: "Book domestic and international holiday packages with Adhvaga Holidays." },
  keywords: { type: String, default: "travel, holidays, packages, tours" },
  googleAnalyticsId: { type: String },
  facebookPixelId: { type: String },

  // Reviews
  autoApproveReviews: { type: Boolean, default: false },
  showStarRatings: { type: Boolean, default: true },

  updatedAt: { type: Date, default: Date.now }
});

const Settings = mongoose.model("Settings", SettingsSchema);
export default Settings;
