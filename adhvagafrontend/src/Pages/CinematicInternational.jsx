import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LiveInternationalPackages from "../Components/Packages/InternationalPackages";
import useCinematicEffects from "./useCinematicEffects";
import {
  CinematicCursor,
  CinematicHeader,
  CinematicRightTab,
  CinematicSideDots,
} from "./CinematicLayout";
import "./CinematicExperience.css";

const dots = [
  { id: "intl-hero", label: "Hero" },
  { id: "intl-destinations", label: "Destinations" }, // KEEP
  { id: "intl-live", label: "All Packages" },
  { id: "intl-newsletter", label: "Newsletter" },
];

export default function CinematicInternational() {
  const navigate = useNavigate();

  useCinematicEffects();

  return (
    <div className="cinematic-page">
      <div className="cine-shell">
        <CinematicCursor />
        <CinematicHeader activeKey="international" />
        <CinematicSideDots dots={dots} />
        <CinematicRightTab label="Global" />

        {/* HERO */}
        <section id="intl-hero" className="cine-hero">
          <div
            className="cine-hero-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(20,16,10,0.45), rgba(20,16,10,0.88)), url('/aida-images/aida_019.jpg')",
            }}
          />
          <div className="cine-overlay" />

          <div className="cine-hero-copy" data-reveal>
            <h1 className="cine-title-main">Global</h1>
            <p className="cine-subtext">
              Borderless luxury travel with immersive city, coast, mountain, and heritage itineraries
              across hand-picked destinations worldwide.
            </p>
            <div className="cine-cta-actions">
              <button className="cine-btn" type="button">
                Explore Tours
              </button>
            </div>
          </div>
        </section>

        {/* DESTINATIONS (UI KEPT, DATA REMOVED) */}
        <section id="intl-destinations" className="cine-section cine-section-dark">
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">World Without Borders</p>
            <h2 className="cine-heading">International Destinations</h2>

            {/* EMPTY FILTER BAR (keeps spacing same) */}
            <div className="cine-card-filters" />

            {/* EMPTY GRID (keeps card layout spacing same) */}
            <div className="cine-grid-3">
              {/* invisible placeholders to preserve layout */}
              <div style={{ visibility: "hidden" }}>placeholder</div>
              <div style={{ visibility: "hidden" }}>placeholder</div>
              <div style={{ visibility: "hidden" }}>placeholder</div>
            </div>
          </div>
        </section>

        {/* LIVE DATA */}
        <section id="intl-live" className="cine-section cine-section-light">
          <LiveInternationalPackages />
        </section>

        {/* NEWSLETTER */}
        <section id="intl-newsletter" className="cine-cta">
          <div className="cine-container" data-reveal>
            <h2>Your Passport To Premium Travel</h2>
            <p>
              Join our global release list for early access to seasonal deals, luxury itineraries,
              and private curation calls with our destination specialists.
            </p>
            <div className="cine-cta-actions">
              <Link className="cine-btn" to="/Support">
                Subscribe For Updates
              </Link>
              <Link className="cine-btn cine-btn-outline" to="/Domestic">
                Explore Domestic
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
