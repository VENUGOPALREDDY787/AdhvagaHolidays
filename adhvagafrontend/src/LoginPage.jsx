import React, { useState } from "react";
import "./LoginPage.css";
import Logo from "./Logo";
import { Eye, EyeOff, Lock, User, Plane, ArrowRight, Loader2 } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    const res = await fetch("http://localhost:8080/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ Save token
    localStorage.setItem("token", data.token);

    // ✅ Redirect
    onLogin();
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="login-wrapper">
      {/* Background decorations */}
      <div className="bg-pattern">
        <Plane className="plane plane-1" />
        <Plane className="plane plane-2" />
        <Plane className="plane plane-3" />
        <div className="circle-pattern"></div>
      </div>

      <div className="login-card">
        {/* LEFT PANEL */}
        <div className="login-left">
          <Logo size="lg" className="logo-white" />
          <h2>Admin Hub</h2>
          <p>
            Managing the journey for thousands of travelers. Logistics,
            bookings, and operations at your fingertips.
          </p>

          <div className="status-box">
            <div className="status-icon">
              <Plane size={18} />
            </div>
            <div>
              <span>Live Status</span>
              <strong>142 Active Trips</strong>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right">
          {/* <div className="mobile-logo">
            <Logo size="md" />
          </div> */}

          <h1>Welcome Back</h1>
          <p className="subtitle">
            Please enter your admin credentials to continue
          </p>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Admin Email</label>
              <div className="input-wrapper">
                <User size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@adhvaga.com"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Security Token</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" />
                Remember device
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="spin" />
              ) : (
                <>
                  Enter Dashboard <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="footer-text">
            © 2024 Adhvaga Holidays Inc • Admin Access Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
