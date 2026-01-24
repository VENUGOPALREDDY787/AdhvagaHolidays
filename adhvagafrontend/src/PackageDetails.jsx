import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "./config/api";
import "./PackageDetails.css";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guests: 1,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ================= FETCH PACKAGE ================= */
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/packages/${id}`);
        if (!res.ok) throw new Error("Package not found");
        const data = await res.json();
        setPkg(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  /* ================= LOADING / ERROR ================= */
  if (loading) {
    return <div className="pd-success">Loading package...</div>;
  }

  if (error || !pkg) {
    return (
      <div className="pd-success">
        <p>{error || "Package not found"}</p>
        <button onClick={() => navigate("/Packages")}>
          Back to Packages
        </button>
      </div>
    );
  }

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  /* ================= SUCCESS STATE ================= */
  if (isSubmitted) {
    return (
      <div className="pd-success">
        <div className="pd-success-icon">✓</div>
        <h2>Booking Requested!</h2>
        <p>
          Thanks <strong>{formData.name}</strong>, we've received your request
          for the <strong>{pkg.title}</strong> package. Our travel experts at
          Adhvaga Holidays will contact you within 24 hours.
        </p>
        <button onClick={() => navigate("/Packages")}>
          Back to Explorer
        </button>
      </div>
    );
  }

  /* ================= MAIN UI (UNCHANGED) ================= */
  return (
    <div className="pd-wrapper">
      {/* LEFT COLUMN */}
      <div className="pd-left">
        <button className="pd-back" onClick={() => navigate(-1)}>
          ← Back to Packages
        </button>

        <h1 className="pd-title">{pkg.title}</h1>

        <div className="pd-meta">
          <span className="pd-price">Avg. Cost: ₹{pkg.price}</span>
          <span className="pd-pill">⏱ {pkg.duration}</span>
          <span className="pd-pill">📍 {pkg.destination}</span>
        </div>

        <img src={pkg.image} alt={pkg.title} className="pd-hero" />

        <section>
          <h2>Experience Overview</h2>
          <p>{pkg.destination}</p>
        </section>

        <section>
          <h2>Highlights</h2>
          <div className="pd-grid">
            {pkg.highlights.map((h, i) => (
              <div key={i} className="pd-highlight">✔ {h}</div>
            ))}
          </div>
        </section>

        <section>
          <h2>The Journey</h2>
          <div className="pd-itinerary">
            {pkg.itinerary.map((day) => (
              <div key={day.day} className="pd-day">
                <span>Day {day.day}</span>
                <h4>{day.title}</h4>
                <p>{day.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="pd-two-col">
          <div>
            <h3>Inclusions</h3>
            <ul>
              {pkg.includes.map((i, idx) => (
                <li key={idx}>🟢 {i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Exclusions</h3>
            <ul>
              {pkg.excludes.map((i, idx) => (
                <li key={idx}>🔴 {i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="pd-right">
        <div className="pd-sticky">
        <div className="pd-booking">
          <h3>Book This Trip</h3>
          <p>Personalized travel planning with Adhvaga.</p>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <div className="pd-form-row">
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <input
                type="number"
                min="1"
                value={formData.guests}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    guests: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="pd-total">
              <span>Total Price Approx.</span>
              <strong>₹{pkg.price * formData.guests}</strong>
            </div>

            <button type="submit">Confirm Booking →</button>
          </form>
        </div>

        <div className="pd-help">
          <div>
            <small>Need Help?</small>
            <strong>24/7 Concierge</strong>
          </div>
          <button>📞</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
