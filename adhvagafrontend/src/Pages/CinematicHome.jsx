import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useCinematicEffects from "./useCinematicEffects";
import { BASE_URL } from "../config/api";
import {
  CinematicCursor,
  CinematicHeader,
  CinematicRightTab,
  CinematicSideDots,
} from "./CinematicLayout";
import { useSettings } from "../context/SettingsContext";
import "./CinematicExperience.css";

const dots = [
  { id: "home", label: "Home" },
  { id: "destinations", label: "Destinations" },
  { id: "packages", label: "Packages" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const destinationCards = [
  {
    label: "High Altitude",
    title: "Swiss Alps Traverse",
    image:
      "/aida-images/aida_047.jpg",
  },
  {
    label: "Deep Green",
    title: "Explore the Philippines",
    image:
      "/aida-images/element-1356981739-1784860686998.jpg",
  },
  {
    label: "Arid Sands",
    title: "Beauty of Maldives",
    image:
      "/aida-images/cosmos_1623436937.jpeg",
  },
];

const galleryImages = [
  "/aida-images/aida_007.jpg",
  "/aida-images/aida_005.jpg",
  "/aida-images/aida_038.jpg",
  "/aida-images/aida_020.jpg",
  "/aida-images/aida_040.jpg",
  "/aida-images/aida_043.jpg",
  "/aida-images/aida_031.jpg",
  "/aida-images/aida_018.jpg",
];

export default function CinematicHome() {
  const { settings } = useSettings();
  useCinematicEffects();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    // basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill all fields ❌");
      setLoading(false);
      return;
    }

    try {
      
      const res = await fetch(`${BASE_URL}/api/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        
        navigate("/thank-you");
      } else {
        setError(data.message || "Failed to send ❌");
      }
    } catch (err) {
      console.error("ERROR:", err);
      setError("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="cinematic-page">
      <div className="cine-shell">
        <CinematicCursor />
        <CinematicHeader activeKey="home" />
        <CinematicSideDots dots={dots} />
        <CinematicRightTab label="Explore" />

        <section id="home" className="cine-hero">
          <div
            className="cine-hero-bg"
            style={{
              backgroundImage:
                "url('/aida-images/download (4).jpg')",
            }}
          />
          <div className="cine-overlay" />

          <div className="cine-hero-copy cine-home-scroll-copy cine-home-intro-block">
            <h1 className="cine-title-main cine-home-signature-1 cine-home-hero-title">
              Adhvaga Holidays
            </h1>
            <p className="cine-title-script cine-home-signature-2 cine-home-hero-script">
              The Art of the Journey.
            </p>
            <p className="cine-subtext">
              Hand-crafted cinematic itineraries through heritage landscapes,
              hidden wilderness, and dramatic coastlines with premium logistics
              from takeoff to return.
            </p>
            <div className="cine-cta-actions">
              <Link className="cine-btn" to="/explore-globe">
                Explore World
              </Link>
              <Link className="cine-btn cine-btn-outline" to="/india-globe">
                Explore India
              </Link>
            </div>
          </div>

        </section>

        <section
          id="destinations"
          className="cine-section cine-section-dark cine-home-destinations"
        >
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">The Selection</p>
            <h2 className="cine-heading">Epic Landscapes</h2>

            <div className="cine-home-filters">
              <button type="button" className="active">
                All Terrain
              </button>
              <button type="button">Mountains</button>
              <button type="button">Jungle</button>
              <button type="button">Desert</button>
            </div>

            <div className="cine-grid-3">
              {destinationCards.map((card) => (
                <article
                  key={card.title}
                  className="cine-card cine-home-destination-card"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="cine-parallax-img"
                    data-parallax="true"
                  />
                  <div className="cine-card-copy">
                    <p>{card.label}</p>
                    <h3>{card.title}</h3>
                    <Link to="/International" className="cine-home-inline-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="packages"
          className="cine-section cine-section-light cine-home-packages"
        >
          <div
            className="cine-home-fixed-stage cine-home-packages-stage"
            data-scroll-section="true"
          >
            <div
              className="cine-home-fixed-bg"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.62)), url('/aida-images/aida_044.jpg')",
              }}
            />
            <div
              className="cine-home-fixed-copy cine-home-stage-copy"
              data-scroll-rise="true"
              data-rise-anchor="center"
              data-rise-mode="symmetric"
              data-rise-distance="34"
              data-rise-opacity-mode="symmetric"
              data-rise-opacity-start="0.92"
              data-rise-opacity-end="1"
            >
              <h2 className="cine-home-signature-1">Exclusive Deals</h2>
              <p className="cine-home-signature-2">Chosen For You</p>
            </div>
          </div>

          <div className="cine-container" data-reveal>
            <div className="cine-split">
              <img
                src="/aida-images/kerala.jpeg"
                alt="Kerala Backwaters"
              />

              <div>
                <p className="cine-heading-eyebrow">Backwater Retreat</p>
                <h3
                  className="cine-heading"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
                >
                  Kerala Backwaters
                </h3>
                <p>
                  Drift through Alleppey and Kumarakom on a handpicked houseboat
                  journey with premium stays, private transfers, and local
                  experiences woven into every stop.
                </p>
                <div className="cine-feature-list">
                  <span>4 Days Journey</span>
                  <span>Private Houseboat</span>
                  <span>Village Walks</span>
                  <span>Full Board</span>
                </div>
                <div className="cine-price">
                  <strong>₹18,500</strong>
                  <a href="#contact" className="cine-btn" style={{ textDecoration: 'none' }}>
                    Book Now
                  </a>
                </div>
              </div>
            </div>

            <div className="cine-split cine-split-reverse">
              <img
                src="/aida-images/raja.jpeg"
                alt="Rajasthan Royal Trail"
              />

              <div>
                <p className="cine-heading-eyebrow">Royal Heritage Escape</p>
                <h3
                  className="cine-heading"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
                >
                  Rajasthan Royal Trail
                </h3>
                <p>
                  Explore Jaipur, Jodhpur, and Udaipur with heritage stays,
                  curated sightseeing, and seamless comfort across India&apos;s
                  most iconic desert cities.
                </p>
                <div className="cine-feature-list">
                  <span>7 Days Circuit</span>
                  <span>Heritage Havelis</span>
                  <span>City Tours</span>
                  <span>Camel Safari</span>
                </div>
                <div className="cine-price">
                  <strong>₹24,900</strong>
                  <a href="#contact" className="cine-btn" style={{ textDecoration: 'none' }}>
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="cine-section cine-section-dark cine-home-about"
        >
          <div
            className="cine-home-fixed-stage cine-home-about-stage"
            data-scroll-section="true"
          >
            <div
              className="cine-home-fixed-bg"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url('/aida-images/aida_003.jpg')",
              }}
            />
            <div
              className="cine-home-fixed-copy cine-home-stage-copy"
              data-scroll-rise="true"
              data-rise-distance="105"
              data-rise-opacity-start="0.8"
              data-rise-opacity-end="1"
            >
              <h2 className="cine-home-signature-1 cine-home-muted">
                Our Legacy
              </h2>
            </div>
          </div>

          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">Our Legacy</p>
            <h2 className="cine-heading">A Legacy of Exploration</h2>
            <p
              className="cine-subtext"
              style={{
                marginInline: 0,
                maxWidth: "860px",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Founded in 2012, {settings.agencyName || "Advaga Holidays"} evolved from a small trekking
              collective into a full-scope travel design studio specializing in
              story-driven itineraries and high-touch support.
            </p>

            <div className="cine-grid-4">
              <div className="cine-glass" data-reveal>
                <h3>14+</h3>
                <p>Years of Heritage</p>
              </div>
              <div className="cine-glass" data-reveal>
                <h3>500k</h3>
                <p>Miles Explored</p>
              </div>
             
              <div className="cine-glass" data-reveal>
                <h3>100%</h3>
                <p>Satisfaction Focus</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="gallery"
          className="cine-section cine-section-dark cine-home-gallery"
        >
          <div
            className="cine-home-fixed-stage cine-home-gallery-stage"
            data-scroll-section="true"
          >
            <div
              className="cine-home-fixed-bg"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.56)), url('/aida-images/aida_008.jpg')",
              }}
            />
            <div
              className="cine-home-fixed-copy cine-home-stage-copy"
              data-scroll-rise="true"
              data-rise-distance="110"
              data-rise-opacity-start="0.82"
              data-rise-opacity-end="1"
            >
              <h2 className="cine-home-signature-1 cine-home-white">Moments</h2>
              <p className="cine-home-signature-2">Frozen In Time</p>
            </div>
          </div>

          <div className="cine-container" data-reveal>
            <div className="cine-home-gallery-grid">
              {galleryImages.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`Travel moment ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="cine-section cine-section-dark cine-home-testimonials"
        >
          <div
            className="cine-home-testimonials-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.72)), url('/aida-images/aida_017.jpg')",
            }}
          />
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">Shared Journeys</p>
            <h2 className="cine-heading">Words From Travelers</h2>

            <div className="cine-home-testimonial-grid">
              <article className="cine-glass">
                <p className="cine-quote">
                  "Impeccably organised, tastefully crafted and executed in perfection. Thank you Adhvaga holidays for being our partner in making our Georgia trip even more memorable. You made our vacation very relaxed and fun filled one. Will surely recommend one and all to try Adhvaga as your trip planner"
                </p>
                <strong>Rethi Rajeevan</strong>
                <span>Georgia trip</span>
              </article>

              <article className="cine-glass cine-home-testimonial-featured">
                <p className="cine-quote">
                  "I recently booked Singapore travel from Advaga Holiday Inc. Right from booking my tickets to getting visa and seamless travel the team was extremely helpful and made my journey a memorable one. Special thanks to Nandish he is a go to person for any last minute changes too very accommodating and customer centric approach. Thank you team for making my trip memorable"
                </p>
                <strong>Trishna H</strong>
                <span>Trishna H</span>
              </article>

              <article className="cine-glass">
                <p className="cine-quote">
                  "Thank you Mr. Nandhisha
Adhvaga organised the Maha Kumbh trip for us. It was flawless starting from the travel to the accommodation.
We are very thankful for the arrangements and wholeheartedly recommend Adhvaga.."
                </p>
                <strong>Narayanan Subramanian</strong>
                <span>Maha Kumbh trip</span>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="cine-home-contact">
          <div
            className="cine-home-contact-visual cine-home-contact-stage"
            data-scroll-section="true"
          >
            <div
              className="cine-home-fixed-bg"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/aida-images/aida_024.jpg')",
              }}
            />
            <div
              className="cine-home-fixed-copy cine-home-stage-copy"
              data-scroll-rise="true"
              data-rise-distance="90"
              data-rise-opacity-start="0.84"
              data-rise-opacity-end="1"
            >
              <h2 className="cine-home-signature-1">Let's Go</h2>
              <p className="cine-home-signature-2">Together</p>
            </div>
          </div>

          <div className="cine-home-contact-form" data-reveal>
            <h2>Start Your Journey</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Service
                </option>
                <option value="AIR TICKETS">Air Tickets</option>
                <option value="VISA ASSISTANCE">Visa Assistance</option>
                <option value="TRAVEL ASSISTANCE">Travel Assistance</option>
                <option value="CORPORATE SERVICES">Corporate Services</option>
                <option value="COUSTOM SERVICES">Custom Services</option>
                <option value="CAR RENTAL">Car Rental</option>
              </select>

              <textarea
                rows="4"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              {/* SUCCESS / ERROR (no UI break) */}
              {success && <p style={{ color: "lightgreen" }}>{success}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}

              <button type="submit" className="cine-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </section>

        <section className="cine-home-footer" aria-label="Home footer">
          <div className="cine-container">
            <h3 style={{ textTransform: 'uppercase' }}>{settings.agencyName || "ADVAGADHOLIDAYS.INC"}</h3>
            <p>
              {settings.tagline || "Pioneering cinematic travel and luxury expeditions since 1994. Explore breathtaking landscapes with confidence."}
            </p>
            <div className="cine-home-footer-links">
              <a href="#home">Home</a>
              <a href="#destinations">Destinations</a>
              <Link to="/Services">Services</Link>
              <Link to="/Support">Contact</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
