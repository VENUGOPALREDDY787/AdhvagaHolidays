import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../Components/SEO/SEOHead";
import {
  SERVICE_METADATA,
  generateBreadcrumbSchema,
  generateServiceSchema,
} from "../utils/seoHelpers";
import { BASE_URL } from "../config/api";
import UiloraMusicCard from "../Components/UIComponents/Cards/UiloraMusicCard";
import "./VisaPage.css";

function VisaPage() {
  const [visaCountries, setVisaCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const metadata = SERVICE_METADATA.visa;
  const breadcrumbs = [
    { name: "Home", url: "/home" },
    { name: "Visas", url: "/visa" },
  ];
  const serviceSchema = generateServiceSchema({
    name: "Visa Assistance",
    description:
      "End-to-end visa assistance for international travel including documentation and application guidance.",
  });

  useEffect(() => {
    const fetchVisaCountries = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${BASE_URL}/api/visas`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load visa countries");
        }

        setVisaCountries(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load visa countries");
        setVisaCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVisaCountries();
  }, []);

  const cards = useMemo(
    () =>
      visaCountries.map((item) => ({
        id: item._id,
        title: item.country,
        subtitle: item.visaType || "VISA ASSISTANCE",
        tracks: `${item.processingTime || "7-10 Working Days"} • ${item.entries || "Single Entry"}`,
        image: item.image,
      })),
    [visaCountries]
  );

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/visa"
        structuredData={[generateBreadcrumbSchema(breadcrumbs), serviceSchema]}
      />

      <main className="visa-page" role="main" aria-label="Visa assistance information">
        <section className="visa-hero">
          <div className="visa-hero-overlay" />
          <div className="visa-hero-content">
            <p className="visa-kicker">International Travel Desk</p>
            <h1>Visa Assistance That Keeps Your Journey Smooth</h1>
            <p>
              From checklist to final submission, our team helps you handle visa paperwork
              with clarity, speed, and confidence.
            </p>
            <div className="visa-hero-actions">
              <Link to="/Support" state={{ serviceName: "VISA ASSISTANCE" }}>
                Start Visa Process
              </Link>
              <Link to="/International" className="visa-outline-btn">
                Explore International Tours
              </Link>
            </div>
          </div>
        </section>

        <section className="visa-content container">
          <header className="visa-content-header">
            <h2>Countries We Support</h2>
          </header>

          {loading && <div className="visa-status">Loading visa countries...</div>}
          {!loading && error && <div className="visa-status error">{error}</div>}
          {!loading && !error && cards.length === 0 && (
            <div className="visa-status">No countries are active right now. Please check back soon.</div>
          )}

          {!loading && !error && cards.length > 0 && (
            <div className="visa-card-grid">
              {cards.map((card) => (
                <div key={card.id} className="visa-card-item">
                  <Link to={`/visa/${card.id}`}>
                    <UiloraMusicCard
                      title={card.title}
                      subtitle={card.subtitle}
                      tracks={card.tracks}
                      image={card.image}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default VisaPage;
