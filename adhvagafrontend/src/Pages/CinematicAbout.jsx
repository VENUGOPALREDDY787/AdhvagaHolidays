import { Link } from "react-router-dom";
import useCinematicEffects from "./useCinematicEffects";
import {
  CinematicCursor,
  CinematicHeader,
  CinematicRightTab,
  CinematicSideDots,
} from "./CinematicLayout";
import "./CinematicExperience.css";

const dots = [
  { id: "about-hero", label: "Hero" },
  { id: "story", label: "About" },
  { id: "values", label: "Mission" },
  { id: "stats", label: "Services" },
  { id: "cta", label: "CTA" },
];

export default function CinematicAbout() {
  useCinematicEffects();

  return (
    <div className="cinematic-page">
      <div className="cine-shell">
        <CinematicCursor />
        <CinematicHeader activeKey="about" />
        <CinematicSideDots dots={dots} />
        <CinematicRightTab label="Legacy" />

        <section id="about-hero" className="cine-hero">
          <div
            className="cine-hero-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(33, 29, 17, 0.4), rgba(33, 29, 17, 0.76)), url('/aida-images/aida_042.jpg')",
            }}
          />
          <div className="cine-overlay" />

          <div className="cine-hero-copy" data-reveal>
            <h1 className="cine-title-main">About Us</h1>
            <p className="cine-title-script">Adhvaga Holidays</p>
            <p className="cine-subtext">
              At Adhvaga Holidays, we believe travel should be seamless, reliable, and memorable.
              We are dedicated to delivering end-to-end travel solutions for individuals,
              families, and corporate clients.
            </p>
          </div>
        </section>

        <section id="story" className="cine-section cine-section-light">
          <div className="cine-container cine-split" data-reveal>
            <img
              src="/aida-images/aida_028.jpg"
              alt="Advaga travel team"
            />

            <div>
              <p className="cine-heading-eyebrow">Who We Are</p>
              <h2 className="cine-heading" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
                Reliable Travel, Personalized Service
              </h2>
              <p>
                With a strong focus on transparency, customer satisfaction, and personalized
                service, we specialize in flight bookings, hotel reservations, holiday packages,
                visa assistance, and allied travel services.
              </p>
              <p>
                Our experienced team works closely with trusted global partners to ensure smooth
                planning and dependable execution at every stage of your journey.
              </p>
              <div className="cine-cta-actions" style={{ justifyContent: "flex-start" }}>
                <button type="button" className="cine-btn">
                  Travel With Confidence
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="values" className="cine-section cine-section-dark">
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">Mission & Vision</p>
            <h2 className="cine-heading">The Direction We Follow</h2>

            <div className="cine-grid-3">
              <article className="cine-glass" data-reveal>
                <h3>Our Mission</h3>
                <p>
                  To provide reliable, transparent, and personalized travel solutions that create
                  meaningful and stress-free experiences for every customer.
                </p>
              </article>
              <article className="cine-glass" data-reveal>
                <h3>Our Vision</h3>
                <p>
                  To become a trusted and recognized travel brand known for integrity, innovation,
                  and excellence in customer satisfaction.
                </p>
              </article>
              <article className="cine-glass" data-reveal>
                <h3>Our Promise</h3>
                <p>
                  We tailor services for leisure holidays, business travel, family vacations, and
                  international tours with dependable end-to-end support.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="stats" className="cine-section cine-section-light">
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">Our Services</p>
            <h2 className="cine-heading">Complete Travel Support</h2>
            <div className="cine-grid-4">
              <article className="cine-pill">Flight Bookings</article>
              <article className="cine-pill">Hotel Reservations</article>
              <article className="cine-pill">Holiday Packages</article>
              <article className="cine-pill">Visa Assistance</article>
            </div>
            <p className="cine-subtext" style={{ marginTop: "1.2rem", color: "rgba(23,19,12,0.72)", maxWidth: "920px" }}>
              We also support travel insurance and allied services to help protect your journey
              from unexpected disruptions while keeping your experience smooth and organized.
            </p>
          </div>
        </section>

        <section id="cta" className="cine-cta">
          <div className="cine-container" data-reveal>
            <h2>Travel With Adhvaga Holidays</h2>
            <p>
              Integrity, professionalism, and customer trust are at the heart of everything we do.
              Plan your next journey with confidence.
            </p>
            <div className="cine-cta-actions">
              <Link className="cine-btn" to="/Support">
                Start Planning
              </Link>
              <Link className="cine-btn cine-btn-outline" to="/Home">
                Back To Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
