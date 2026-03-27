import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "./config/api";
import SEOHead from "./Components/SEO/SEOHead";
import { generatePackageMetadata, generateBreadcrumbSchema, generateTourPackageSchema } from "./utils/seoHelpers";
import AccessGateFlow from "./Components/includes/AccessGateFlow";
import "./PackageDetails.css";

const REFERENCE_ID = "reference";

const getPackageApiCandidates = (queryString = "") => {
  const rawCandidates = [
    BASE_URL ? `${BASE_URL}/api/packages${queryString}` : "",
    `/api/packages${queryString}`,
    `http://localhost:8080/api/packages${queryString}`,
    `http://localhost:5000/api/packages${queryString}`,
  ].filter(Boolean);

  return Array.from(new Set(rawCandidates));
};

const fetchWithFallback = async (queryString = "") => {
  const endpoints = getPackageApiCandidates(queryString);
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        lastError = new Error(`Package API returned status ${response.status}`);
        continue;
      }

      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to load package data");
};

const REFERENCE_PACKAGE = {
  _id: REFERENCE_ID,
  title: "Signature Reference Tour",
  destination: "Curated Multi-Destination Route",
  location: "Domestic & International",
  description:
    "This is a shared reference details page used for all Explore buttons. Later, each card can be mapped to its own dedicated travel plan while keeping this same cinematic structure.",
  price: 49999,
  duration: "6D / 5N",
  durationDays: 6,
  durationNights: 5,
  rating: 4.8,
  tag: "Reference",
  category: "International",
  type: "International",
  image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  travelSeason: "All Season",
  minGuests: 2,
  maxGuests: 10,
  highlights: [
    "Scenic stays with curated local experiences",
    "Flexible day-wise itinerary and concierge support",
    "Balanced plan across comfort, culture, and adventure",
  ],
  itinerary: [
    { day: 1, title: "Arrival & Orientation", description: "Arrival transfer, check-in, and route briefing with your tour planner." },
    { day: 2, title: "City & Culture", description: "Guided exploration with curated local experiences and premium dining options." },
    { day: 3, title: "Nature Circuit", description: "Scenic day excursion with optional adventure activities and sunset viewpoints." },
  ],
  includes: [
    "Hotel accommodation",
    "Daily breakfast",
    "Airport and local transfers",
  ],
  excludes: [
    "Personal expenses",
    "Travel insurance",
    "Flights not mentioned in inclusions",
  ],
  hotelCategoryPricing: [
    { category: "A", pricePerPerson: 49999, description: "Premium" },
    { category: "B", pricePerPerson: 59999, description: "Luxury" },
  ],
  hotelDetails: [
    { city: "City Hub", hotelName: "Reference Grand", category: "A", roomType: "Deluxe", nights: 2 },
    { city: "Scenic Point", hotelName: "Vista Retreat", category: "B", roomType: "Suite", nights: 3 },
  ],
  cancellationPolicy: ["Free cancellation up to 10 days before departure."],
  bookingPolicy: ["50% advance to confirm booking."],
  importantNotes: ["This page is currently used as the default Explore reference."],
};

const FALLBACK_HIGHLIGHTS = [
  "Handpicked stays and smooth local transfers",
  "Balanced itinerary with culture, leisure, and scenic moments",
  "Travel support from planning to return",
];

const FALLBACK_ITINERARY = [
  {
    day: 1,
    title: "Arrival & Check-in",
    description: "Welcome transfer, check-in, and a short orientation for the upcoming route.",
  },
  {
    day: 2,
    title: "City / Nature Exploration",
    description: "A curated day with signature points, local food options, and guided experiences.",
  },
  {
    day: 3,
    title: "Leisure & Departure",
    description: "Free time for personal exploration followed by assisted checkout and departure.",
  },
];

const FALLBACK_HOTEL_PRICING = [
  { category: "A", pricePerPerson: 39999, description: "Comfort" },
  { category: "B", pricePerPerson: 49999, description: "Premium" },
  { category: "C", pricePerPerson: 64999, description: "Luxury" },
];

const FALLBACK_HOTEL_DETAILS = [
  { city: "Primary City", hotelName: "Standard Collection Hotel", category: "A", roomType: "Deluxe", nights: 2 },
  { city: "Scenic Hub", hotelName: "Panorama Stay", category: "B", roomType: "Premium", nights: 2 },
];

const FALLBACK_INCLUDES = [
  "Hotel accommodation",
  "Daily breakfast",
  "Local transfers as per itinerary",
];

const FALLBACK_EXCLUDES = [
  "Personal expenses",
  "Travel insurance",
  "Optional activities not listed",
];

const FALLBACK_CANCELLATION_POLICY = [
  "Cancellation terms vary by date and booking slab.",
];

const FALLBACK_BOOKING_POLICY = [
  "Advance payment is required to confirm the reservation.",
];

const FALLBACK_IMPORTANT_NOTES = [
  "Final itinerary may be adjusted based on local operating conditions.",
];

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(REFERENCE_PACKAGE);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guests: 1,
  });
  const [expandedDay, setExpandedDay] = useState(1);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAccessGate, setShowAccessGate] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  /* ================= FETCH PACKAGE ================= */
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        if (id === REFERENCE_ID) {
          setPkg(REFERENCE_PACKAGE);
          return;
        }

        const data = await fetchWithFallback(`/${id}`);
        setPkg(data || REFERENCE_PACKAGE);
      } catch {
        // Keep rendering the reference design instead of showing loading/error UI.
        setPkg(REFERENCE_PACKAGE);
      }
    };

    fetchPackage();
  }, [id]);

  useEffect(() => {
    if (!pkg?.itinerary?.length) {
      setExpandedDay(1);
      return;
    }

    const sortedDays = [...pkg.itinerary]
      .map((item) => Number(item?.day))
      .filter((day) => Number.isFinite(day) && day > 0)
      .sort((a, b) => a - b);

    setExpandedDay(sortedDays[0] || 1);
  }, [pkg]);

  // Generate SEO metadata when package is loaded
  const packageMetadata = pkg ? generatePackageMetadata(pkg) : null;
  const breadcrumbs = pkg ? [
    { name: "Home", url: "/home" },
    { name: pkg.category === "domestic" ? "Domestic" : "International", url: pkg.category === "domestic" ? "/domestic" : "/international" },
    { name: pkg.title, url: `/packages/${pkg._id}` }
  ] : [];

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    setPendingAction("book");
    setShowAccessGate(true);
  };

  const handleTalkToExpert = () => {
    setPendingAction("contact");
    setShowAccessGate(true);
  };

  const handleAccessGateComplete = () => {
    setShowAccessGate(false);

    if (pendingAction === "book") {
      setIsSubmitted(true);
    } else if (pendingAction === "contact") {
      navigate("/Support");
    }

    setPendingAction(null);
  };

  /* ================= SUCCESS STATE ================= */
  if (isSubmitted) {
    return (
      <>
        <SEOHead
          title={`Booking Confirmed - ${pkg.title} | Adhvaga Holidays`}
          description={`Your booking request for ${pkg.title} has been received.`}
          url={`/packages/${id}`}
        />
        <div className="pd-shell pd-success">
          <div className="pd-success-icon" aria-hidden="true">✓</div>
          <h2>Booking Requested!</h2>
          <p>
            Thanks <strong>{formData.name}</strong>, we've received your request
            for the <strong>{pkg.title}</strong> package. Our travel experts at
            Adhvaga Holidays will contact you within 24 hours.
          </p>
          <button type="button" onClick={() => navigate(-1)}>
            Back to Explorer
          </button>
        </div>
      </>
    );
  }

  const formatPrice = (value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return "On Request";
    }
    return `Rs ${parsed.toLocaleString("en-IN")}`;
  };

  const durationLabel =
    pkg.duration ||
    (pkg.durationDays || pkg.durationNights
      ? `${pkg.durationDays || 0}D / ${pkg.durationNights || 0}N`
      : "Flexible Duration");

  const guestLabel =
    pkg.minGuests || pkg.maxGuests
      ? `${pkg.minGuests || 1} - ${pkg.maxGuests || 10} Guests`
      : "Custom Group Size";

  const validityFrom = pkg.validityStart
    ? new Date(pkg.validityStart).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "Open";

  const validityTo = pkg.validityEnd
    ? new Date(pkg.validityEnd).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "Open";

  const sortedItinerary = Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0
    ? [...pkg.itinerary].sort((a, b) => Number(a?.day || 0) - Number(b?.day || 0))
    : FALLBACK_ITINERARY;

  const highlights = Array.isArray(pkg.highlights) && pkg.highlights.length > 0 ? pkg.highlights : FALLBACK_HIGHLIGHTS;
  const includes = Array.isArray(pkg.includes) && pkg.includes.length > 0 ? pkg.includes : FALLBACK_INCLUDES;
  const excludes = Array.isArray(pkg.excludes) && pkg.excludes.length > 0 ? pkg.excludes : FALLBACK_EXCLUDES;
  const hotelPricing =
    Array.isArray(pkg.hotelCategoryPricing) && pkg.hotelCategoryPricing.length > 0
      ? pkg.hotelCategoryPricing
      : FALLBACK_HOTEL_PRICING;
  const hotelDetails =
    Array.isArray(pkg.hotelDetails) && pkg.hotelDetails.length > 0
      ? pkg.hotelDetails
      : FALLBACK_HOTEL_DETAILS;
  const cancellationPolicy =
    Array.isArray(pkg.cancellationPolicy) && pkg.cancellationPolicy.length > 0
      ? pkg.cancellationPolicy
      : FALLBACK_CANCELLATION_POLICY;
  const bookingPolicy =
    Array.isArray(pkg.bookingPolicy) && pkg.bookingPolicy.length > 0
      ? pkg.bookingPolicy
      : FALLBACK_BOOKING_POLICY;
  const importantNotes =
    Array.isArray(pkg.importantNotes) && pkg.importantNotes.length > 0
      ? pkg.importantNotes
      : FALLBACK_IMPORTANT_NOTES;

  // Generate structured data for the package
  const tourSchema = generateTourPackageSchema({
    name: pkg.title,
    description: pkg.description || `${pkg.title} - ${pkg.duration} trip to ${pkg.destination}`,
    image: pkg.image,
    price: pkg.price
  });

  const scrollToBooking = () => {
    const target = document.getElementById("pd-booking-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToEnquiry = () => {
    const target = document.getElementById("pd-enquiry-block");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ================= MAIN UI ================= */
  return (
    <>
      <SEOHead
        title={packageMetadata.title}
        description={packageMetadata.description}
        keywords={packageMetadata.keywords}
        url={`/packages/${pkg._id}`}
        image={packageMetadata.image}
        structuredData={[generateBreadcrumbSchema(breadcrumbs), tourSchema]}
      />
      <div className="pd-shell">
        <header className="pd-top-actions">
          <button className="pd-back" type="button" onClick={() => navigate(-1)}>
            Back to Packages
          </button>
        </header>

        <section className="pd-hero" style={{ backgroundImage: `url(${pkg.image})` }}>
          <div className="pd-hero-overlay" />
          <div className="pd-hero-content">
            <div className="pd-tags">
              <span className="pd-tag pd-tag-primary">{pkg.tag || "Featured"}</span>
              <span className="pd-tag">{pkg.type || pkg.category || "Tour"}</span>
            </div>
            <h1>
              {String(pkg.title || "Tour Plan").toUpperCase()} <span>{String(pkg.destination || "").toUpperCase()}</span>
            </h1>
            <div className="pd-hero-meta">
              <p>{pkg.destination || pkg.location || "Curated Destination"}</p>
              {pkg.rating ? <p>{Number(pkg.rating).toFixed(1)} Rating</p> : null}
            </div>
          </div>
        </section>

        <section className="pd-stats-strip" id="pd-enquiry-block">
          <article>
            <span>Duration</span>
            <strong>{durationLabel}</strong>
          </article>
          <article>
            <span>Destination</span>
            <strong>{pkg.destination || "Custom Destination"}</strong>
          </article>
          <article>
            <span>Group Size</span>
            <strong>{guestLabel}</strong>
          </article>
          <article>
            <span>Season</span>
            <strong>{pkg.travelSeason || "All Season"}</strong>
          </article>
          <article>
            <span>Category</span>
            <strong>{pkg.type || pkg.category || "Signature"}</strong>
          </article>
        </section>

        <section className="pd-overview">
          <p className="pd-script">A Cinematic Journey</p>
          <h2>Where The Story Unfolds</h2>
          <p>
            {pkg.description ||
              `${pkg.title || "This tour"} is a fully guided plan crafted for smooth travel, immersive local experiences, and memorable stays across ${pkg.destination || "your destination"}.`}
          </p>
        </section>

        <section className="pd-highlights">
          <h3>Expedition Highlights</h3>
          <div className="pd-highlight-grid">
            {highlights.map((item, index) => (
              <article key={`${item}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pd-itinerary-block">
          <h3>Daily Journey</h3>
          <div className="pd-itinerary-list">
            {sortedItinerary.map((day) => {
              const dayNumber = Number(day?.day) || 0;
              const isExpanded = dayNumber === expandedDay;

              return (
                <article key={`day-${dayNumber}-${day?.title || "item"}`} className={isExpanded ? "expanded" : "collapsed"}>
                  <button
                    type="button"
                    className="pd-itinerary-toggle"
                    onClick={() => setExpandedDay(dayNumber)}
                  >
                    <span>Day {String(dayNumber).padStart(2, "0")}</span>
                    <h4>{day?.title || "Experience"}</h4>
                  </button>
                  {isExpanded ? <p>{day?.description || "Detailed plan shared during confirmation."}</p> : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="pd-pricing-tiers">
          <h3>Expedition Tiers</h3>
          <div className="pd-tier-grid">
            {hotelPricing.map((tier, idx) => (
              <article key={`${tier.category}-${idx}`} className={idx === 1 ? "active" : ""}>
                <span className="pd-tier-label">Category {tier.category}</span>
                <h4>{tier.description || "Curated Stay"}</h4>
                <strong>{formatPrice(tier.pricePerPerson)}<small>/pp</small></strong>
              </article>
            ))}
          </div>
        </section>

        <section className="pd-include-exclude">
          <article>
            <h3>Inclusions</h3>
            <ul>
              {includes.map((item, idx) => (
                <li key={`inc-${idx}`}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <h3>Exclusions</h3>
            <ul>
              {excludes.map((item, idx) => (
                <li key={`exc-${idx}`}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="pd-hotel-details-block">
          <h3>City-wise Hotel Details</h3>
          <div className="pd-hotel-grid">
            {hotelDetails.map((hotel, idx) => (
              <article key={`${hotel.city || "city"}-${idx}`}>
                <p className="pd-hotel-city">{hotel.city || "City"}</p>
                <h4>{hotel.hotelName || "Hotel"}</h4>
                <div>
                  <span>Category {hotel.category || "A"}</span>
                  {hotel.roomType ? <span>{hotel.roomType}</span> : null}
                  {hotel.nights ? <span>{hotel.nights} Night(s)</span> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pd-policies-validity">
          <article>
            <h3>Policies</h3>

            <div className="pd-important-note">
              <h4>Important Notes</h4>
              <ul>
                {importantNotes.map((item, idx) => (
                  <li key={`note-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pd-policy-box">
              <h4>Cancellation Policy</h4>
              <ul>
                {cancellationPolicy.map((item, idx) => (
                  <li key={`cancel-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pd-policy-box">
              <h4>Booking Policy</h4>
              <ul>
                {bookingPolicy.map((item, idx) => (
                  <li key={`book-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="pd-validity-box">
            <span>Pricing Validity</span>
            <div>
              <p>
                <small>From</small>
                <strong>{validityFrom}</strong>
              </p>
              <p>
                <small>Until</small>
                <strong>{validityTo}</strong>
              </p>
            </div>
          </article>
        </section>

        <section className="pd-booking-section" id="pd-booking-form">
          <h3>Ready To Pack Your Bags?</h3>
          <p>Your tour planner can finalize this route with your preferred dates and group style.</p>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <div className="pd-form-row">
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
              <strong>{formatPrice(pkg.price * formData.guests)}</strong>
            </div>

            <div className="pd-form-actions">
              <button type="submit" className="pd-primary-btn">Book Now</button>
              <button type="button" className="pd-secondary-btn" onClick={handleTalkToExpert}>Talk To An Expert</button>
            </div>
          </form>
        </section>
      </div>

      <div className="pd-sticky-booking" role="region" aria-label="Quick booking bar">
        <div className="pd-sticky-meta">
          <p>
            <small>From</small>
            <strong>{formatPrice(pkg.price)}<span>/PP</span></strong>
          </p>
          <p>{durationLabel}</p>
          <p>{guestLabel}</p>
        </div>
        <div className="pd-sticky-actions">
          <button type="button" onClick={scrollToEnquiry}>Enquire</button>
          <button type="button" className="pd-primary-btn" onClick={scrollToBooking}>Book Now</button>
        </div>
      </div>

      {showAccessGate && <AccessGateFlow onComplete={handleAccessGateComplete} />}
    </>
  );
};

export default PackageDetails;
