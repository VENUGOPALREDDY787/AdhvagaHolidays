import React, { useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose }) => {
  const [accountType, setAccountType] = useState("personal");
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="login-overlay">
    <div className="login-modal animate-in">
      {/* Close Button */}
      <button className="close-btn" onClick={onClose} aria-label="Close modal">
        ✕
      </button>

      {/* Left Pane */}
      <div className="left-pane">
        <div className="image-wrapper">
          <div className="image-glow"></div>
          <img
            src="https://picsum.photos/seed/travel/400/400"
            alt="Travel"
          />
        </div>

        <div className="features">
          <div className="feature">
            <span>🏷️</span>
            <p>Unlock Exclusive Deals on your first booking</p>
          </div>

          <div className="feature">
            <span>💯</span>
            <p>
              Zero Convenience Fee with <strong>Adhvaga</strong>
            </p>
          </div>

          <div className="feature">
            <span>📅</span>
            <p>Easily View, Modify, or Cancel Bookings</p>
          </div>
        </div>

        <p className="more-text">and more..</p>
      </div>

      {/* Right Pane */}
      <div className="right-pane">
        {/* Toggle */}
        <div className="toggle">
          <button
            className={accountType === "personal" ? "active" : ""}
            onClick={() => setAccountType("personal")}
          >
            Personal Account
          </button>
          <button
            className={accountType === "sme" ? "active" : ""}
            onClick={() => setAccountType("sme")}
          >
            SME Account
          </button>
        </div>

        <h2>Login or Create an Account</h2>
        <p className="subtitle">Email Id / Mobile Number</p>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Email Id / Mobile Number"
          className="input"
        />

        <button className="login-btn">Login</button>

        <p className="terms">
          By proceeding, you agree with our{" "}
          <a href="#">Terms of Service</a>, <a href="#">Privacy Policy</a> &{" "}
          <a href="#">Master User Agreement</a>.
        </p>

        <div className="divider">
          <span>Or</span>
        </div>

        <button className="google-btn">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
            alt="Google"
          />
          Sign in with Google
        </button>
      </div>
    </div>
    </div>
  );
};

export default LoginModal;
