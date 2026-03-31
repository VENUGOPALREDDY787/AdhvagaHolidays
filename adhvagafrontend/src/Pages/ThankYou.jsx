import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SEOHead from "../Components/SEO/SEOHead";
import { generateBreadcrumbSchema } from "../utils/seoHelpers";
import "./ThankYou.css";

function ThankYou() {
  const navigate = useNavigate();

  const breadcrumbs = [
    { name: "Home", url: "/home" },
    { name: "Thank You", url: "/thank-you" },
  ];

  return (
    <>
      <SEOHead
        title="Booking Confirmed | Midnight Obsidian"
        description="Your request has been received. Our travel experts are already on it. Expect a personalized call within 24 hours to craft every detail of your journey."
        url="/thank-you"
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
      />

      <div className="ty-page">
        {/* Background Canvas */}
        <div className="ty-bg-canvas">
          <img 
            alt="Majestic dark mountain peaks under a moody twilight sky with low hanging clouds and cinematic atmosphere" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9mRHw_MUth18njgYcHxBxyt-WTe7jzshvvhG0Rkwk2nkTh2Aq124NWLaJGJaj04HoCItrid7FAqimuZQdGrx7Li44DHG_6otPqQ7QdJ1T_CWpru_TpaowKAW5CnGVqUtpWJgohOd1UnYUZD1bD4laHZa50EGSZ3_1qfFZOnkw8h9-9f6-Wa_VBV6DCbhKyGiYY8C4cKGLJZXdhK-EfUS5Jb2WJLsDY021XvVeAUj4TzE3YEwyalD4Gm9OKEexZDmpbq0c71AsaeqG"
          />
          <div className="ty-bg-overlay"></div>
        </div>

        {/* Page Top Header */}
        <header className="ty-header">
          <Link to="/home" className="ty-brand font-display">
            Midnight Obsidian
          </Link>
          <div className="ty-header-actions">
            <span className="material-symbols-outlined" onClick={() => navigate("/home")}>menu</span>
            <span className="material-symbols-outlined" onClick={() => navigate("/Support")}>person</span>
          </div>
        </header>

        {/* Main Modal Overlay */}
        <div className="ty-modal-wrapper">
          <motion.div 
            className="ty-modal-card"
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Corner Accents */}
            <div className="ty-corner-tl"></div>
            <div className="ty-corner-br"></div>

            {/* Success Indicator */}
            <motion.div 
              className="ty-success-indicator"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
            >
              <div className="ty-check-circle">
                <span className="material-symbols-outlined ty-check-icon">
                  check_circle
                </span>
              </div>
              <div className="ty-sparkle">
                <span className="material-symbols-outlined">
                  auto_awesome
                </span>
              </div>
            </motion.div>

            {/* Header Section */}
            <motion.div 
              className="ty-header-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <p className="ty-subtitle font-display">Expedition Confirmed</p>
              <h1 className="ty-title font-display">
                You're All Set.<br />Adventure Awaits.
              </h1>
              <div className="ty-signature font-signature">
                A world of obsidian peaks...
              </div>
            </motion.div>

            {/* Status Badge */}
            <motion.div 
              className="ty-status-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <span className="material-symbols-outlined ty-status-badge-icon">verified</span>
              <span className="ty-status-badge-text">
                Response Guaranteed · 24/7 Support
              </span>
            </motion.div>

            {/* Subtext & Package Info */}
            <motion.div 
              className="ty-subtext-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <p className="ty-quote">
                "Our dedicated travel experts are already on it. Expect a personalized call within 24 hours to craft every detail of your journey."
              </p>
              <div className="ty-gold-rule"></div>
              <div className="ty-itinerary-box">
                <p className="ty-itinerary-label">Current Itinerary</p>
                <p className="ty-itinerary-val">
                  Golden Rajasthan Escape — 7 Days
                </p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div 
              className="ty-actions-wrapper"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <Link className="ty-btn-primary font-display" to="/Domestic">
                Explore More Packages
              </Link>
              <Link className="ty-link-back" to="/Home">
                <span className="material-symbols-outlined ty-link-back-icon">west</span>
                <span className="ty-link-back-text">Back to Home</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Simulation for Mobile */}
        <footer className="ty-mobile-nav">
          <Link to="/Domestic" className="ty-nav-item">
            <span className="material-symbols-outlined grayscale font-light">explore</span>
            <span className="ty-nav-text">Explore</span>
          </Link>
          <div className="ty-nav-item active">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            <span className="ty-nav-text">Book Now</span>
          </div>
          <Link to="/Saved" className="ty-nav-item">
            <span className="material-symbols-outlined grayscale">bookmark</span>
            <span className="ty-nav-text">Saved</span>
          </Link>
          <Link to="/Support" className="ty-nav-item">
            <span className="material-symbols-outlined grayscale">person</span>
            <span className="ty-nav-text">Account</span>
          </Link>
        </footer>
      </div>
    </>
  );
}

export default ThankYou;
