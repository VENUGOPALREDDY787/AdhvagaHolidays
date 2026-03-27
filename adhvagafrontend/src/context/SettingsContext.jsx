import React, { createContext, useContext, useState, useEffect, useRef } from "react";
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
    contactNumber: "+91 96204 21494",
    whatsappNumber: "+91 96204 21494",
    email: "adhvagaholidaysinc@gmail.com",
    address: "08/A, 1ST CROSS, 24TH MAIN, J P NAGAR 2ND PHASE, BANGALORE",
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
    showStarRatings: true,
    faqItems: [
      {
        question: "How early should I book my trip?",
        answer: "For best flight and hotel options, we recommend booking 4 to 8 weeks in advance for domestic trips and 8 to 12 weeks for international routes."
      },
      {
        question: "Can you customize packages based on my budget?",
        answer: "Yes. We can tailor destinations, hotel categories, and activity inclusions to match your travel style and budget range."
      },
      {
        question: "Do you assist with visa documentation?",
        answer: "Absolutely. Our team helps with document checklists, appointment guidance, and application support for multiple destinations."
      },
      {
        question: "What payment options are available?",
        answer: "We support bank transfer and standard digital payment methods. Final payment details are shared clearly during booking confirmation."
      },
      {
        question: "Can I request changes after booking?",
        answer: "Yes, modification requests are possible based on airline, hotel, and supplier policies. We will suggest the best available alternatives."
      },
      {
        question: "Is travel insurance included by default?",
        answer: "Insurance depends on the selected package. If not included, we can add a suitable plan covering medical and trip interruption needs."
      },
      {
        question: "Do you provide support during the trip?",
        answer: "Yes, we offer on-trip assistance for urgent travel issues, coordination, and support requests while you are traveling."
      },
      {
        question: "How do cancellations and refunds work?",
        answer: "Cancellation and refund terms vary by destination and supplier. We share all policies before confirmation so you have full clarity."
      }
    ]
  });

  const [loading, setLoading] = useState(true);
  const hasFetchedSettings = useRef(false);

  useEffect(() => {
    if (hasFetchedSettings.current) return;
    hasFetchedSettings.current = true;
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/settings`);
      if (res.ok) {
        const data = await res.json();
        // Ensure whatsappNumber exists
        if (!data.whatsappNumber) {
          data.whatsappNumber = data.contactNumber || "+91 96204 21494";
        }
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.warn("Failed to fetch settings. Verify backend is running and VITE_API_URL is correct.");
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
