import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LiveDomesticPackages from "../Components/Packages/DomesticPackages";
import useCinematicEffects from "./useCinematicEffects";
import {
  CinematicCursor,
  CinematicHeader,
  CinematicRightTab,
  CinematicSideDots,
} from "./CinematicLayout";
import "./CinematicExperience.css";

const dots = [
  { id: "domestic-hero", label: "Hero" },
  { id: "domestic-featured", label: "Featured" }, // keep this
  { id: "domestic-live", label: "All Packages" },
  { id: "domestic-cta", label: "CTA" },
];

export default function CinematicDomestic() {
  const navigate = useNavigate();

  useCinematicEffects();

  return (
    <div className="cinematic-page">
      <div className="cine-shell">
        <CinematicCursor />
        <CinematicHeader activeKey="domestic" />
        <CinematicSideDots dots={dots} />
        <CinematicRightTab label="Domestic" />

        {/* HERO */}
        <section id="domestic-hero" className="cine-hero">
          <div
            className="cine-hero-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.52), rgba(33,29,17,0.9)), url('/aida-images/aida_032.jpg')",
            }}
          />
          <div className="cine-overlay" />

          <div className="cine-hero-copy" data-reveal>
            <h1 className="cine-title-main">Domestic</h1>
            <p className="cine-subtext">
              Homegrown journeys with cinematic landscapes across mountains, forests, coasts,
              and cultural corridors. Designed for comfort, value, and seamless logistics.
            </p>
          </div>
        </section>

        {/* FEATURED (UI KEPT, DATA REMOVED) */}
        <section id="domestic-featured" className="cine-section cine-section-dark">
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">Featured Domestic Escapes</p>
            <h2 className="cine-heading">Top Curation</h2>
          </div>
        </section>

        {/* LIVE DATA */}
        <section id="domestic-live" className="cine-section cine-section-light">
          <LiveDomesticPackages />
        </section>

        {/* CTA */}
        <section id="domestic-cta" className="cine-cta">
          <div className="cine-container" data-reveal>
            <h2>Plan Your India Circuit</h2>
            <p>
              Build a route across India with travel styles that match your pace, from quick weekend
              escapes to month-long thematic journeys.
            </p>
            <div className="cine-cta-actions">
              <Link className="cine-btn" to="/Support">
                Talk To A Planner
              </Link>
              <Link className="cine-btn cine-btn-outline" to="/International">
                View International
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}