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
    { id: "homepage", label: "Homepage", icon: Image },
    { id: "services", label: "Services", icon: Tag },
    { id: "booking", label: "Booking", icon: CreditCard },
    { id: "email", label: "Email & Notifications", icon: Mail },
    { id: "security", label: "Security", icon: Shield },
    { id: "seo", label: "SEO", icon: BarChart },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "team", label: "Team", icon: Users }
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

          {/* 3. HOMEPAGE SETTINGS */}
          {activeTab === "homepage" && (
            <div className="settings-section">
              <h2>Homepage Settings</h2>
              
              <div className="form-group">
                <label>Hero Banner</label>
                <div className="banner-upload-zone" onClick={() => bannerInputRef.current?.click()}>
                  <Upload size={24} />
                  <p>Upload hero banner (1920x1080)</p>
                  <input ref={bannerInputRef} type="file" accept="image/*" hidden />
                </div>
              </div>

              <div className="form-group">
                <label>Hero Banner Text</label>
                <input
                  type="text"
                  value={settings.heroText}
                  onChange={(e) => handleInputChange("heroText", e.target.value)}
                />
              </div>

              <h3>Promotional Banner</h3>
              <div className="toggle-group">
                <label>Enable Promotional Banner</label>
                <input
                  type="checkbox"
                  checked={settings.promoEnabled}
                  onChange={(e) => handleInputChange("promoEnabled", e.target.checked)}
                />
              </div>

              <div className="form-group">
                <label>Promotional Text</label>
                <input
                  type="text"
                  value={settings.promoText}
                  onChange={(e) => handleInputChange("promoText", e.target.value)}
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

          {/* 5. BOOKING SETTINGS */}
          {activeTab === "booking" && (
            <div className="settings-section">
              <h2>Booking Settings</h2>
              
              <div className="form-group">
                <label>Booking Confirmation</label>
                <select
                  value={settings.bookingConfirmation}
                  onChange={(e) => handleInputChange("bookingConfirmation", e.target.value)}
                >
                  <option value="auto">Automatic</option>
                  <option value="manual">Manual Approval</option>
                </select>
              </div>

              <div className="form-group">
                <label>Payment Gateway</label>
                <select
                  value={settings.paymentGateway}
                  onChange={(e) => handleInputChange("paymentGateway", e.target.value)}
                >
                  <option value="razorpay">Razorpay</option>
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div className="form-group">
                <label>Cancellation Policy</label>
                <textarea
                  rows="4"
                  value={settings.cancellationPolicy}
                  onChange={(e) => handleInputChange("cancellationPolicy", e.target.value)}
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

          {/* 7. SECURITY SETTINGS */}
          {activeTab === "security" && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              
              <h3>Change Password</h3>
              <div className="form-group">
                <label>Current Password</label>
                <div className="password-input">
                  <input type={showPassword ? "text" : "password"} />
                  <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" />
              </div>

              <div className="toggle-group">
                <label><Shield size={16} /> Enable Two-Factor Authentication (2FA)</label>
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleInputChange("twoFactorAuth", e.target.checked)}
                />
              </div>

              <h3>Active Sessions</h3>
              <div className="sessions-list">
                <div className="session-item">
                  <div>
                    <strong>Chrome on Windows</strong>
                    <p>Last active: 2 hours ago</p>
                  </div>
                  <button className="btn-danger-small">Revoke</button>
                </div>
              </div>
            </div>
          )}

          {/* 8. SEO SETTINGS */}
          {activeTab === "seo" && (
            <div className="settings-section">
              <h2>SEO Settings</h2>
              
              <div className="form-group">
                <label>Meta Title</label>
                <input
                  type="text"
                  value={settings.metaTitle}
                  onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Meta Description</label>
                <textarea
                  rows="3"
                  value={settings.metaDescription}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={settings.keywords}
                  onChange={(e) => handleInputChange("keywords", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Google Analytics ID</label>
                <input
                  type="text"
                  placeholder="UA-XXXXXXXXX-X"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => handleInputChange("googleAnalyticsId", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Facebook Pixel ID</label>
                <input
                  type="text"
                  placeholder="XXXXXXXXXXXXXXXX"
                  value={settings.facebookPixelId}
                  onChange={(e) => handleInputChange("facebookPixelId", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* 9. REVIEWS SETTINGS */}
          {activeTab === "reviews" && (
            <div className="settings-section">
              <h2>Testimonials & Reviews</h2>
              
              <div className="toggle-group">
                <label>Auto-Approve Reviews</label>
                <input
                  type="checkbox"
                  checked={settings.autoApproveReviews}
                  onChange={(e) => handleInputChange("autoApproveReviews", e.target.checked)}
                />
              </div>

              <div className="toggle-group">
                <label>Show Star Ratings</label>
                <input
                  type="checkbox"
                  checked={settings.showStarRatings}
                  onChange={(e) => handleInputChange("showStarRatings", e.target.checked)}
                />
              </div>

              <button className="btn-primary">Manage Reviews</button>
            </div>
          )}

          {/* 10. TEAM MANAGEMENT */}
          {activeTab === "team" && (
            <div className="settings-section">
              <h2>Team Management</h2>
              
              <button className="btn-primary mb-3">
                <Users size={18} />
                Add Staff Member
              </button>

              <div className="team-list">
                <div className="team-member">
                  <div className="member-info">
                    <strong>John Doe</strong>
                    <p>Admin • Last active: 1 hour ago</p>
                  </div>
                  <div className="member-actions">
                    <button className="btn-secondary-small">Edit</button>
                    <button className="btn-danger-small">Remove</button>
                  </div>
                </div>
                <div className="team-member">
                  <div className="member-info">
                    <strong>Jane Smith</strong>
                    <p>Manager • Last active: 3 hours ago</p>
                  </div>
                  <div className="member-actions">
                    <button className="btn-secondary-small">Edit</button>
                    <button className="btn-danger-small">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
