import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "./config/api";
import SEOHead from "./Components/SEO/SEOHead";
import {
  generatePackageMetadata,
  generateBreadcrumbSchema,
  generateTourPackageSchema,
} from "./utils/seoHelpers";
import { useSettings } from "./context/SettingsContext";
import WhatsAppModal from "./Components/Support/WhatsAppModal";
import "./PackageDetails.css";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();

  const [pkg, setPkg] = useState(null);
  const [expandedDay, setExpandedDay] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/packages/${id}`);
        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setPkg(data);
      } catch (err) {
        console.error(err);
        setPkg(null);
      }
    };

    if (id) fetchPackage();
  }, [id]);

  /* ================= LOADING ================= */
  if (!pkg) {
    return <div className="pd-shell">Loading...</div>;
  }

  const cleanToken = (input) => {
    if (input == null) return "";
    return String(input)
      .trim()
      .replace(/^[\[\]\{\}\"']+/, "")
      .replace(/[\[\]\{\}\"']+$/, "")
      .replace(/\\"/g, '"')
      .trim();
  };

  const normalizeDisplayValue = (value, fallback = "") => {
    if (Array.isArray(value)) {
      const cleaned = value
        .flatMap((item) =>
          typeof item === "string"
            ? item
                .split(",")
                .map((part) => cleanToken(part))
                .filter(Boolean)
            : [cleanToken(item)]
        )
        .filter(Boolean);
      return cleaned.length ? cleaned.join(", ") : fallback;
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return fallback;

      if (
        (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
        (trimmed.startsWith("{") && trimmed.endsWith("}"))
      ) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            return normalizeDisplayValue(parsed, fallback);
          }
          if (parsed && typeof parsed === "object") {
            const objectValues = Object.values(parsed)
              .map((v) => String(v ?? "").trim())
              .filter(Boolean);
            return objectValues.length ? objectValues.join(", ") : fallback;
          }
        } catch {
          // Keep original string when it is not valid JSON.
        }
      }

      return cleanToken(trimmed) || fallback;
    }

    if (value == null) return fallback;
    return cleanToken(value) || fallback;
  };

  const normalizeList = (value, fallback = []) => {
    if (Array.isArray(value)) {
      const list = value
        .flatMap((item) => {
          if (typeof item === "string") {
            return item
              .split(",")
              .map((part) => cleanToken(part))
              .filter(Boolean);
          }

          if (item == null) return [];
          return [cleanToken(item)].filter(Boolean);
        })
        .filter(Boolean);
      return list.length ? list : fallback;
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return fallback;

      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (Array.isArray(parsed)) {
            return normalizeList(parsed, fallback);
          }
        } catch {
          // Keep plain string parsing below.
        }
      }

      const splitList = trimmed
        .split(",")
        .map((part) => cleanToken(part))
        .filter(Boolean);
      const cleanedSingle = cleanToken(trimmed);
      return splitList.length ? splitList : cleanedSingle ? [cleanedSingle] : fallback;
    }

    if (value == null) return fallback;
    return [cleanToken(value)].filter(Boolean);
  };

  const normalizedDestination = normalizeDisplayValue(
    pkg.destination || pkg.location,
    "Destination TBD"
  );
  const normalizedCategory = normalizeDisplayValue(pkg.category, "General");
  const normalizedType = normalizeDisplayValue(pkg.type, "Standard");
  const normalizedDescription = normalizeDisplayValue(
    pkg.description,
    "Package details will be shared on request."
  );
  const normalizedTag = normalizeDisplayValue(pkg.tag, "Featured");
  const normalizedTitle = normalizeDisplayValue(pkg.title, "Travel Package");

  /* ================= SAFE DATA ================= */
  const highlights = normalizeList(pkg.highlights,
    [
      "Smooth travel experience",
      "Curated destinations",
      "Comfortable stays",
    ]
  );

  const includes = normalizeList(pkg.includes,
    ["Hotel stay", "Transport", "Basic support"]
  );

  const excludes = normalizeList(pkg.excludes,
    ["Personal expenses", "Insurance"]
  );

  const itinerarySource = Array.isArray(pkg.itinerary)
    ? pkg.itinerary
    : typeof pkg.itinerary === "string"
      ? (() => {
          try {
            const parsed = JSON.parse(pkg.itinerary);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })()
      : [];

  const itinerary =
    itinerarySource.length > 0
      ? itinerarySource
          .map((day, index) => ({
            day: Number(day?.day) || index + 1,
            title: normalizeDisplayValue(day?.title, `Day ${index + 1}`),
            description: normalizeDisplayValue(day?.description, "Details coming soon"),
          }))
          .sort((a, b) => a.day - b.day)
    : [
        { day: 1, title: "Arrival", description: "Check-in and relax" },
      ];

  const formatPrice = (price) => {
    const numericPrice = Number(price);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) return "On Request";
    return `₹${numericPrice.toLocaleString("en-IN")}`;
  };

  const durationLabel = pkg.duration || "Flexible";

  /* ================= SEO ================= */
  const metadata = generatePackageMetadata(pkg);
  const isDomesticPackage = normalizedType.toLowerCase() === "domestic";

  const breadcrumbs = [
    { name: "Home", url: "/home" },
    {
      name: isDomesticPackage ? "Domestic" : "International",
      url: isDomesticPackage ? "/domestic" : "/international",
    },
    { name: pkg.title, url: `/packages/${pkg._id}` },
  ];

  const tourSchema = generateTourPackageSchema({
    name: pkg.title,
    description: pkg.description,
    image: pkg.image,
    price: pkg.price,
  });

  /* ================= UI ================= */
  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        url={`/packages/${pkg._id}`}
        image={metadata.image}
        structuredData={[
          generateBreadcrumbSchema(breadcrumbs),
          tourSchema,
        ]}
      />

      <div className="pd-shell">
        <header className="pd-top-actions">
          <button className="pd-back" onClick={() => navigate(-1)}>
            Back to Packages
          </button>
        </header>

        {/* HERO */}
        <section
          className="pd-hero"
          style={{ backgroundImage: `url(${pkg.image})` }}
        >
          <div className="pd-hero-overlay" />
          <div className="pd-hero-content">
            <div className="pd-tags">
              <span className="pd-tag pd-tag-primary">
                {normalizedTag}
              </span>
              <span className="pd-tag">
                {normalizedType || normalizedCategory || "Tour"}
              </span>
            </div>

            <h1>
              {normalizedTitle.toUpperCase()} <span>{normalizedDestination.toUpperCase()}</span>
            </h1>

            <div className="pd-hero-meta">
              <p>{normalizedDestination}</p>
              {pkg.rating && <p>{pkg.rating} Rating</p>}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="pd-stats-strip">
          <article>
            <span>Duration</span>
            <strong>{durationLabel}</strong>
          </article>
          <article>
            <span>Destination</span>
            <strong>{normalizedDestination}</strong>
          </article>
          <article>
            <span>Category</span>
            <strong>{normalizedCategory}</strong>
          </article>
          <article>
            <span>Type</span>
            <strong>{normalizedType}</strong>
          </article>
        </section>

        {/* OVERVIEW */}
        <section className="pd-overview">
          <p className="pd-script">A Cinematic Journey</p>
          <h2>Where The Story Unfolds</h2>
          <p>{normalizedDescription}</p>
        </section>

        {/* HIGHLIGHTS */}
        <section className="pd-highlights">
          <h3>Highlights</h3>
          <div className="pd-highlight-grid">
            {highlights.map((item, i) => (
              <article key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ITINERARY */}
        <section className="pd-itinerary-block">
          <h3>Daily Journey</h3>
          <div className="pd-itinerary-list">
            {itinerary.map((day) => (
              <article key={day.day}>
                <span>Day {day.day}</span>
                <h4>{day.title}</h4>
                <p>{day.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* INCLUDES / EXCLUDES */}
        <section className="pd-include-exclude">
          <article>
            <h3>Includes</h3>
            <ul>
              {includes.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </article>

          <article>
            <h3>Excludes</h3>
            <ul>
              {excludes.map((e, idx) => (
                <li key={idx}>{e}</li>
              ))}
            </ul>
          </article>
        </section>

        {/* PRICE */}
        <section className="pd-pricing" aria-label="Package pricing">
          <p className="pd-pricing-label">Starting From</p>
          <div className="pd-pricing-amount-wrap">
            <strong className="pd-pricing-amount">{formatPrice(pkg.price)}</strong>
            <span className="pd-pricing-note">
              {pkg.price ? "Per Person" : "Talk to us for the best quote"}
            </span>
          </div>
        </section>

        {/* WHATSAPP CTA */}
        <section className="pd-booking-section" style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem", color: "var(--text-color, #EAEAEA)" }}>
            Call or WhatsApp us for further info & booking details!
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="pd-primary-btn"
            style={{ display: "inline-block", textDecoration: "none", cursor: "pointer" }}
          >
            Contact on WhatsApp
          </button>
        </section>
      </div>

      <WhatsAppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default PackageDetails;