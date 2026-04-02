import useCinematicEffects from "./useCinematicEffects";
import { useNavigate } from "react-router-dom";
import "./StitchServicesExperience.css";

const dotItems = [
  { href: "#services-hero", title: "Welcome" },
  { href: "#services-air-tickets", title: "Air Tickets" },
  { href: "#services-visa", title: "Visa Assistance" },
  { href: "#services-insurance", title: "Travel Insurance" },
  { href: "#services-corporate", title: "Corporate Services" },
  { href: "#services-customs", title: "Customs Services" },
  { href: "#services-car-rentals", title: "Car Rentals" },
  { href: "#services-domestic", title: "Domestic Holidays" },
  { href: "#services-international", title: "International Holidays" },
];

const sectionBackgrounds = {
  hero: "/aida-images/aida_041.jpg",
  airTickets: "/aida-images/aida_045.jpg",
  visa: "/aida-images/aida_012.jpg",
  insurance: "/aida-images/aida_009.jpg",
  corporate: "/aida-images/aida_035.jpg",
  customs: "/aida-images/aida_027.jpg",
  carRentals: "/aida-images/aida_033.jpg",
  domestic: "/aida-images/aida_014.jpg",
  international: "/aida-images/aida_011.jpg",
};

const internationalCards = [
  {
    region: "Europe",
    image:
      "/aida-images/aida_023.jpg",
  },
  {
    region: "Tropics",
    image:
      "/aida-images/aida_036.jpg",
  },
  {
    region: "Metropolis",
    image:
      "/aida-images/aida_037.jpg",
  },
  {
    region: "Wilderness",
    image:
      "/aida-images/aida_029.jpg",
  },
];

export default function StitchServicesExperience() {
  const navigate = useNavigate();

  useCinematicEffects();

  const handleServiceBooking = (serviceName) => {
    navigate("/Support", {
      state: {
        fromServiceBooking: true,
        serviceName,
      },
    });
  };

  return (
    <div className="cinematic-page svc-page">
      <div className="svc-dot-nav" aria-label="Section navigation">
        {dotItems.map((item, index) => (
          <a
            key={item.href}
            className={`cine-dot ${index === 0 ? "active" : ""}`}
            href={item.href}
            title={item.title}
            aria-label={item.title}
          />
        ))}
      </div>

      <div className="svc-left-tab" aria-hidden="true">
        <span>EXPLORE</span>
      </div>

      <main>
        <section id="services-hero" className="svc-section svc-hero">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.hero}')` }} />
          <div className="svc-overlay svc-overlay-hero" />
          <div className="svc-container svc-center" data-reveal>
            <div className="svc-eyebrow-wrap">
              <div className="svc-line" />
              <span className="svc-eyebrow">Our Services</span>
            </div>
            <div className="svc-title-wrap">
              <h1 className="svc-title">SERVICES</h1>
              <span className="svc-script">Curated Excellence</span>
            </div>
            <p className="svc-hero-subtext">Bespoke Journeys for the Bold Explorer</p>
          </div>
          <a className="svc-scroll-indicator" href="#services-air-tickets" aria-label="Scroll to next section">
            <span>Scroll to Discover</span>
            <span className="svc-scroll-arrow" aria-hidden="true">↓</span>
          </a>
        </section>

        <section id="services-air-tickets" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.airTickets}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <span className="svc-script svc-script-left">Fly Anywhere, Anytime</span>
            <h2 className="svc-heading">Air Tickets</h2>
            <div className="svc-grid-two">
              <div>
                <p className="svc-text">
                  Your journey begins the moment you book. We unlock premium
                  cabins, rare routes, and seamless departures - tailored
                  entirely to you.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Air Tickets")}>Book This Service</button>
              </div>
              <div className="svc-metric-grid svc-metric-grid-left">
                <div>
                  <h4>Global Reach</h4>
                  <p>180+ Connected Hubs</p>
                </div>
                <div>
                  <h4>First Class</h4>
                  <p>Elite In-flight Experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services-visa" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.visa}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block svc-right" data-reveal>
            <span className="svc-script svc-script-right">Effortless Entry</span>
            <h2 className="svc-heading">Visa Assistance</h2>
            <div className="svc-grid-two">
              <div className="svc-metric-grid svc-metric-grid-right">
                <div>
                  <h4>Fast Track</h4>
                  <p>Priority Government Filings</p>
                </div>
                <div>
                  <h4>Concierge</h4>
                  <p>Dedicated Case Managers</p>
                </div>
              </div>
              <div>
                <p className="svc-text">
                  Borders shouldn't slow you down. Our visa experts handle every
                  document, approval, and detail - for seamless entry into 150+
                  countries.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Visa Assistance")}>Book This Service</button>
              </div>
            </div>
          </div>
        </section>

        <section id="services-insurance" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.insurance}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <span className="svc-script svc-script-left">Travel Without Worry</span>
            <h2 className="svc-heading">Insurance</h2>
            <div className="svc-grid-two">
              <div>
                <p className="svc-text">
                  Real protection for real adventures. From medical emergencies
                  abroad to luxury item coverage - we've got every scenario
                  handled.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Travel Insurance")}>Book This Service</button>
              </div>
              <div className="svc-glass-panel">
                <div className="svc-panel-row">
                  <span>Coverage</span>
                  <strong>$2M+ Premium Protection</strong>
                </div>
                <div className="svc-panel-row">
                  <span>Global Support</span>
                  <strong>24/7 Emergency Hotline</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services-corporate" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.corporate}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-center" data-reveal>
            <span className="svc-script svc-script-center">Built for Business</span>
            <h2 className="svc-heading">Corporate</h2>
            <div className="svc-card-grid">
              <article className="svc-card">
                <span className="material-symbols-outlined">analytics</span>
                <h3>Policy Optimization</h3>
                <p>Smarter travel spend with data-backed logistics.</p>
              </article>
              <article className="svc-card">
                <span className="material-symbols-outlined">group</span>
                <h3>MICE Events</h3>
                <p>World-class conferences and incentive journeys.</p>
              </article>
              <article className="svc-card">
                <span className="material-symbols-outlined">receipt_long</span>
                <h3>Expense Mgmt</h3>
                <p>Unified billing across your global enterprise.</p>
              </article>
            </div>
            <button type="button" className="svc-btn svc-btn-center" onClick={() => handleServiceBooking("Corporate Services")}>Book This Service</button>
          </div>
        </section>

        <section id="services-customs" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.customs}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <div className="svc-grid-two svc-grid-two-wide">
              <div>
                <span className="svc-script svc-script-left">Clear. Fast. Compliant.</span>
                <h2 className="svc-heading svc-heading-customs">Customs</h2>
                <p className="svc-text">
                  From fine art to personal treasures - we navigate every
                  import and export law so your valuables move without friction.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Customs Services")}>Book This Service</button>
              </div>
              <div className="svc-feature-stack">
                <article>
                  <h4>White-Glove Handling</h4>
                  <p>Luxury assets treated with precision care.</p>
                </article>
                <article>
                  <h4>Duty Optimization</h4>
                  <p>Smart tariff and tax management.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="services-car-rentals" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.carRentals}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <span className="svc-script svc-script-left">Your Road, Your Rules</span>
            <h2 className="svc-heading">Car Rentals</h2>
            <div className="svc-rental-panel">
              <div>
                <h4>Luxury Fleet</h4>
                <p>
                  Bentley. Rolls-Royce. Supercar. Every city, every occasion -
                  your perfect ride is already waiting.
                </p>
                <ul>
                  <li>+ Chauffeur Options</li>
                  <li>+ Armored Transport</li>
                  <li>+ Airport Concierge</li>
                </ul>
              </div>
              <div className="svc-rental-cta">
                <p>Drive the Extraordinary</p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Car Rentals")}>Book This Service</button>
              </div>
            </div>
          </div>
        </section>

        <section id="services-domestic" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.domestic}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <span className="svc-script svc-script-left svc-script-domestic">Discover India</span>
            <h2 className="svc-heading">Domestic</h2>
            <div className="svc-grid-two svc-grid-two-wide">
              <div>
                <p className="svc-text">
                  From Rajasthan's golden palaces to Kerala's silent backwaters
                  - we reveal the India most travelers never find.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Domestic Holidays")}>Book This Service</button>
              </div>
              <div className="svc-image-stack">
                <article>
                  <img
                    src="/aida-images/aida_006.jpg"
                    alt="Heritage Trails"
                  />
                  <span>Heritage Trails</span>
                </article>
                <article>
                  <img
                    src="/aida-images/aida_030.jpg"
                    alt="Nature Retreats"
                  />
                  <span>Nature Retreats</span>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="services-international" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.international}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-center" data-reveal>
            <span className="svc-script svc-script-center">The World Awaits</span>
            <h2 className="svc-heading">International</h2>
            <p className="svc-text" style={{ margin: "0 auto 2.4rem", textAlign: "center" }}>
              Every continent, curated. Premium stays, local experts, and
              seamless global flights - so all you carry is wonder.
            </p>
            <div className="svc-intl-grid">
              {internationalCards.map((card) => (
                <article key={card.region}>
                  <img src={card.image} alt={card.region} />
                  <span>{card.region}</span>
                </article>
              ))}
            </div>
            <button type="button" className="svc-btn svc-btn-center" onClick={() => handleServiceBooking("International Holidays")}>Book This Service</button>
          </div>
        </section>
      </main>
    </div>
  );
}
