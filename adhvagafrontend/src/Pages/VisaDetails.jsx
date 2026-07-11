import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../config/api";
import SEOHead from "../Components/SEO/SEOHead";
import {
  generateBreadcrumbSchema,
} from "../utils/seoHelpers";
import WhatsAppModal from "../Components/Support/WhatsAppModal";
import { useSettings } from "../context/SettingsContext";
import "./VisaPage.css";

const VisaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Removed unused settings

  const [visa, setVisa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/visas/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setVisa(data);
      } catch (e) {
        console.error(e);
        setVisa(null);
      }
    };
    if (id) fetchVisa();
  }, [id]);

  if (!visa) return <div className="visa-shell">Loading...</div>;

  const breadcrumbs = [
    { name: "Home", url: "/home" },
    { name: "Visas", url: "/visa" },
    { name: visa.country, url: `/visa/${visa._id}` },
  ];

  const isAdmin = !!localStorage.getItem("token");

  return (
    <>
      <SEOHead
        title={`${visa.country} • Visa`}
        description={visa.visaType || "Visa details"}
        url={`/visa/${visa._id}`}
        structuredData={[generateBreadcrumbSchema(breadcrumbs)]}
      />

      <div className="pd-shell visa-details-shell">
        <header className="pd-top-actions visa-top-actions">
          <button className="pd-back" onClick={() => navigate(-1)}>
            Back to Visas
          </button>
          {isAdmin && (
            <Link className="pd-edit-btn" to={`/admin?panel=visas&edit=${visa._id}`}>
              Edit (Admin)
            </Link>
          )}
        </header>

        <section
          className="pd-hero visa-hero"
          style={{ backgroundImage: `url(${visa.image})` }}
        >
          <div className="pd-hero-overlay" />
          <div className="pd-hero-content">
            <div className="pd-tags">
              <span className="pd-tag pd-tag-primary">{visa.visaType}</span>
            </div>

            <h1>
              {String(visa.country || "").toUpperCase()}
            </h1>

            <div className="pd-hero-meta">
              <p>{visa.processingTime}</p>
            </div>
          </div>
        </section>

        <section className="pd-stats-strip visa-stats">
          <article>
            <span>Processing</span>
            <strong>{visa.processingTime}</strong>
          </article>
          <article>
            <span>Entries</span>
            <strong>{visa.entries}</strong>
          </article>
          <article>
            <span>Validity</span>
            <strong>{visa.validity}</strong>
          </article>
          {visa.price && (
            <article>
              <span>Price</span>
              <strong>₹{visa.price}</strong>
            </article>
          )}
          <article>
            <span>Status</span>
            <strong>{visa.isActive ? "Active" : "Inactive"}</strong>
          </article>
        </section>

        <section className="pd-overview visa-overview">
          <p className="pd-script">Visa Overview</p>
          <h2>All the details you need</h2>
          <p style={{ whiteSpace: "pre-wrap", color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
            {visa.description || "Details will be provided on request."}
          </p>
        </section>

        {visa.documentsRequired && visa.documentsRequired.length > 0 && (
          <section className="pd-overview visa-documents" style={{ marginTop: "2rem" }}>
            <p className="pd-script">Checklist</p>
            <h2>Required Documents</h2>
            <ul style={{ listStyleType: "none", padding: 0, display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
              {visa.documentsRequired.map((doc, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "15px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(210, 180, 140, 0.1)", borderRadius: "8px", color: "rgba(255, 255, 255, 0.9)" }}>
                  <span className="material-symbols-outlined" style={{ color: "#d2b48c" }}>check_circle</span>
                  {doc}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="pd-booking-section" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
            Contact our team for application help and processing support.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="pd-primary-btn"
          >
            Contact on WhatsApp
          </button>
        </section>
      </div>

      <WhatsAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default VisaDetails;
