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
  { id: "services-hero", label: "Hero" },
  { id: "services-grid", label: "Services" },
  { id: "services-process", label: "Process" },
  { id: "services-cta", label: "CTA" },
];

const services = [
  {
    title: "Car Rentals",
    description:
      "Luxury and utility fleet options for airport transfers, inter-city routes, and scenic circuits.",
  },
  {
    title: "Visa Assistance",
    description:
      "Documentation checklists, form support, and submission guidance for smoother approvals.",
  },
  {
    title: "Passport Support",
    description:
      "Concierge support for new passports, renewals, corrections, and urgent appointment guidance.",
  },
  {
    title: "Custom Tours",
    description:
      "Trip design from scratch based on pace, budget, interests, and experience preferences.",
  },
];

const process = [
  "Discovery call to understand destination style and constraints",
  "Shortlist with route logic, stay quality, and activity pacing",
  "Booking and compliance support including visas and insurance",
  "Live assistance during travel with proactive issue handling",
];

export default function CinematicServices() {
  useCinematicEffects();

  return (
    <div className="cinematic-page">
      <div className="cine-shell">
        <CinematicCursor />
        <CinematicHeader activeKey="services" />
        <CinematicSideDots dots={dots} />
        <CinematicRightTab label="Services" />

        <section id="services-hero" className="cine-hero">
          <div
            className="cine-hero-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(20,16,10,0.45), rgba(20,16,10,0.84)), url('/aida-images/aida_013.jpg')",
            }}
          />
          <div className="cine-overlay" />

          <div className="cine-hero-copy" data-reveal>
            <h1 className="cine-title-main">Services</h1>
            <p className="cine-subtext">
              End-to-end travel operations by one team, so your experience stays smooth before,
              during, and after every trip.
            </p>
          </div>
        </section>

        <section id="services-grid" className="cine-section cine-section-dark">
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">Core Offerings</p>
            <h2 className="cine-heading">Seamless Journey Support</h2>

            <div className="cine-grid-4">
              {services.map((service) => (
                <article key={service.title} className="cine-glass" data-reveal>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services-process" className="cine-section cine-section-light">
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">How We Work</p>
            <h2 className="cine-heading">A Clear 4-Step Flow</h2>

            <div className="cine-grid-4">
              {process.map((step) => (
                <article key={step} className="cine-pill" data-reveal>
                  {step}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services-cta" className="cine-cta">
          <div className="cine-container" data-reveal>
            <h2>Need A Tailored Service Stack?</h2>
            <p>
              Tell us what you need, and we will combine flight, visa, transport, stays,
              and local logistics into one streamlined plan.
            </p>
            <div className="cine-cta-actions">
              <Link className="cine-btn" to="/Support">
                Contact Concierge
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
