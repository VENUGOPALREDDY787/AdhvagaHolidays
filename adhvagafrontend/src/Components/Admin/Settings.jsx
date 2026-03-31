import React, { useState, useRef, useEffect } from "react";
import { 
  Upload, Save, Eye, EyeOff, Globe, DollarSign, Clock, 
  Mail, Lock, Shield, Search, Image, Settings as SettingsIcon,
  Bell, Users, Star, Facebook, Instagram, Twitter, Youtube,
  CreditCard, FileText, Tag, BarChart
} from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { BASE_URL } from "../../config/api";
import "./Settings.css";

const Settings = () => {
  const { settings: globalSettings, updateSettings: updateGlobalSettings } = useSettings();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [settings, setSettings] = useState(globalSettings);

  useEffect(() => {
    setSettings(globalSettings);
  }, [globalSettings]);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service) => {
    setSettings(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service]
      }
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setSettings((prev) => {
      const currentFaqs = Array.isArray(prev.faqItems) ? [...prev.faqItems] : [];
      currentFaqs[index] = {
        question: currentFaqs[index]?.question || "",
        answer: currentFaqs[index]?.answer || "",
        [field]: value,
      };

      return {
        ...prev,
        faqItems: currentFaqs,
      };
    });
  };

  const addFaqItem = () => {
    setSettings((prev) => {
      const currentFaqs = Array.isArray(prev.faqItems) ? [...prev.faqItems] : [];
      if (currentFaqs.length >= 10) {
        return prev;
      }

      return {
        ...prev,
        faqItems: [...currentFaqs, { question: "", answer: "" }],
      };
    });
  };

  const removeFaqItem = (index) => {
    setSettings((prev) => {
      const currentFaqs = Array.isArray(prev.faqItems) ? [...prev.faqItems] : [];
      currentFaqs.splice(index, 1);

      return {
        ...prev,
        faqItems: currentFaqs,
      };
    });
  };

  const handleSave = async () => {
    const result = await updateGlobalSettings(settings);
    if (result.success) {
      alert("Settings saved successfully!");
    } else {
      alert("Failed to save settings. Please try again.");
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: Users },
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "services", label: "Services", icon: Tag },
    { id: "email", label: "Email & Notifications", icon: Mail }
  ];

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <button className="save-settings-btn" onClick={handleSave}>
          <Save size={18} />
          Save All Changes
        </button>
      </div>

      <div className="settings-layout">
        {/* Sidebar Tabs */}
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="settings-content">
          {/* 1. PROFILE SETTINGS */}
          {activeTab === "profile" && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              
              <div className="form-group">
                <label>Agency Name</label>
                <input
                  type="text"
                  value={settings.agencyName}
                  onChange={(e) => handleInputChange("agencyName", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Agency Logo</label>
                <div className="logo-upload-zone" onClick={() => logoInputRef.current?.click()}>
                  <Upload size={24} />
                  <p>Click to upload logo</p>
                  <input ref={logoInputRef} type="file" accept="image/*" hidden />
                </div>
              </div>

              <div className="form-group">
                <label>Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => handleInputChange("tagline", e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    value={settings.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  rows="3"
                  value={settings.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <h3>Social Media Links</h3>
              <div className="form-group">
                <label><Facebook size={16} /> Facebook</label>
                <input
                  type="url"
                  value={settings.facebook}
                  onChange={(e) => handleInputChange("facebook", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><Instagram size={16} /> Instagram</label>
                <input
                  type="url"
                  value={settings.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><Twitter size={16} /> Twitter</label>
                <input
                  type="url"
                  value={settings.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><Youtube size={16} /> YouTube</label>
                <input
                  type="url"
                  value={settings.youtube}
                  onChange={(e) => handleInputChange("youtube", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* 2. GENERAL SETTINGS */}
          {activeTab === "general" && (
            <div className="settings-section">
              <h2>General Settings</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label><Globe size={16} /> Website Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleInputChange("language", e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div className="form-group">
                  <label><Clock size={16} /> Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange("timezone", e.target.value)}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label><DollarSign size={16} /> Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <h3>Working Hours</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Opening Time</label>
                  <input
                    type="time"
                    value={settings.workingHoursStart}
                    onChange={(e) => handleInputChange("workingHoursStart", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Closing Time</label>
                  <input
                    type="time"
                    value={settings.workingHoursEnd}
                    onChange={(e) => handleInputChange("workingHoursEnd", e.target.value)}
                  />
                </div>
              </div>

              <div className="toggle-group">
                <label>Display Holiday List</label>
                <input
                  type="checkbox"
                  checked={settings.holidayListEnabled}
                  onChange={(e) => handleInputChange("holidayListEnabled", e.target.checked)}
                />
              </div>
            </div>
          )}

          {/* 4. SERVICES MANAGEMENT */}
          {activeTab === "services" && (
            <div className="settings-section">
              <h2>Services Management</h2>
              
              <div className="services-grid">
                <div className="service-toggle">
                  <label>Air Tickets</label>
                  <input
                    type="checkbox"
                    checked={settings.services.airTickets}
                    onChange={() => handleServiceToggle("airTickets")}
                  />
                </div>
                <div className="service-toggle">
                  <label>Visa Assistance</label>
                  <input
                    type="checkbox"
                    checked={settings.services.visa}
                    onChange={() => handleServiceToggle("visa")}
                  />
                </div>
                <div className="service-toggle">
                  <label>Travel Insurance</label>
                  <input
                    type="checkbox"
                    checked={settings.services.insurance}
                    onChange={() => handleServiceToggle("insurance")}
                  />
                </div>
                <div className="service-toggle">
                  <label>Car Rental</label>
                  <input
                    type="checkbox"
                    checked={settings.services.carRental}
                    onChange={() => handleServiceToggle("carRental")}
                  />
                </div>
                <div className="service-toggle">
                  <label>Custom Packages</label>
                  <input
                    type="checkbox"
                    checked={settings.services.customPackages}
                    onChange={() => handleServiceToggle("customPackages")}
                  />
                </div>
                <div className="service-toggle">
                  <label>Corporate Services</label>
                  <input
                    type="checkbox"
                    checked={settings.services.corporateServices}
                    onChange={() => handleServiceToggle("corporateServices")}
                  />
                </div>
              </div>

              <div className="toggle-group">
                <label>Show Service Pricing</label>
                <input
                  type="checkbox"
                  checked={settings.showPricing}
                  onChange={(e) => handleInputChange("showPricing", e.target.checked)}
                />
              </div>
            </div>
          )}

          {/* 6. EMAIL & NOTIFICATIONS */}
          {activeTab === "email" && (
            <div className="settings-section">
              <h2>Email & Notification Settings</h2>
              
              <div className="toggle-group">
                <label><Mail size={16} /> Welcome Email</label>
                <input
                  type="checkbox"
                  checked={settings.welcomeEmail}
                  onChange={(e) => handleInputChange("welcomeEmail", e.target.checked)}
                />
              </div>

              <div className="toggle-group">
                <label><Mail size={16} /> Booking Confirmation Email</label>
                <input
                  type="checkbox"
                  checked={settings.bookingConfirmationEmail}
                  onChange={(e) => handleInputChange("bookingConfirmationEmail", e.target.checked)}
                />
              </div>

              <div className="toggle-group">
                <label><Bell size={16} /> SMS Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleInputChange("smsNotifications", e.target.checked)}
                />
              </div>

              <div className="toggle-group">
                <label><Bell size={16} /> Admin Alert Notifications</label>
                <input
                  type="checkbox"
                  checked={settings.adminAlerts}
                  onChange={(e) => handleInputChange("adminAlerts", e.target.checked)}
                />
              </div>
            </div>
          )}



          {activeTab === "services" && (
            <div className="settings-section faq-admin-section">
              <h3>Support Page FAQs</h3>
              <p className="faq-admin-helper">Manage the questions displayed on the Support page (up to 10).</p>

              <div className="faq-admin-list">
                {(Array.isArray(settings.faqItems) ? settings.faqItems : []).map((item, index) => (
                  <div key={`faq-${index}`} className="faq-admin-item">
                    <div className="faq-admin-item-header">
                      <strong>FAQ {index + 1}</strong>
                      <button
                        type="button"
                        className="btn-danger-small"
                        onClick={() => removeFaqItem(index)}
                        disabled={(settings.faqItems || []).length <= 1}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="form-group">
                      <label>Question</label>
                      <input
                        type="text"
                        value={item?.question || ""}
                        onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                        placeholder="Enter FAQ question"
                      />
                    </div>

                    <div className="form-group">
                      <label>Answer</label>
                      <textarea
                        rows="3"
                        value={item?.answer || ""}
                        onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                        placeholder="Enter FAQ answer"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={addFaqItem}
                disabled={(settings.faqItems || []).length >= 10}
              >
                Add FAQ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
