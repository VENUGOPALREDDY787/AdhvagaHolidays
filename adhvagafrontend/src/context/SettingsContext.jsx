import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/api";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    agencyName: "Adhvaga Holidays Inc",
    tagline: "Your Trusted Travel Partner",
    contactNumber: "+1 (234) 567-890",
    email: "info@adhvagaholidays.com",
    address: "Bangalore, India",
    facebook: "https://facebook.com/adhvagaholidays",
    instagram: "https://instagram.com/adhvagaholidays",
    twitter: "https://twitter.com/adhvagaholidays",
    youtube: "",
    language: "en",
    timezone: "Asia/Kolkata",
    currency: "INR",
    workingHoursStart: "09:00",
    workingHoursEnd: "18:00",
    holidayListEnabled: true,
    heroText: "Explore the World with Adhvaga Holidays",
    promoText: "Book Now & Get 20% Off on International Packages!",
    promoEnabled: true,
    services: {
      airTickets: true,
      visa: true,
      insurance: true,
      carRental: true,
      customPackages: true,
      corporateServices: true
    },
    showPricing: true,
    bookingConfirmation: "auto",
    paymentGateway: "razorpay",
    cancellationPolicy: "Cancellation allowed up to 48 hours before departure with full refund.",
    welcomeEmail: true,
    bookingConfirmationEmail: true,
    smsNotifications: false,
    adminAlerts: true,
    twoFactorAuth: false,
    metaTitle: "Adhvaga Holidays | Best Travel Agency",
    metaDescription: "Book domestic and international holiday packages with Adhvaga Holidays.",
    keywords: "travel, holidays, packages, tours",
    googleAnalyticsId: "",
    facebookPixelId: "",
    autoApproveReviews: false,
    showStarRatings: true
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/settings`);
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newSettings)
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data.data);
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Failed to update settings:", error);
      return { success: false };
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading, refetch: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
