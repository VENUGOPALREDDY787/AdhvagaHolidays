import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  { id: "intl-destinations", label: "Destinations" },
  { id: "intl-live", label: "All Packages" },
  { id: "intl-newsletter", label: "Newsletter" },
];

const destinationCards = [
  {
    id: "swiss-alps",
    area: "Europe",
    title: "The Swiss Alps",
    price: "$4,299+",
    tag: "Best Seller",
    summary: "Luxury alpine rail + stay itinerary with panoramic routes, private transfers, and guided city days.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Ku7hoU01lfiBBWcMX1yKXqamj-qcI-mkwJiq7FBfrjyN09zflHjoiO8fR_qbfPifCI0fjSo3vLnayDwL8vjtGAThmiwD_xVvFU9aVxqyKzt-T_B4cyKYY6G6cA7KKnTXqWxxmeM073_PU8qi1RD3ugXb7PTcQYftU2XxHIBGyTbpE6AQti5fiMc_fUer9k_7cPZmPNmUWK3IgtDm149yjqjo1dtbMpG1fmE-lOtbU-hA37oPcCgJeij5zzy-ktbSevSYnNvWJtvh",
  },
  {
    id: "patagonia",
    area: "South America",
    title: "Patagonia",
    price: "$3,850+",
    summary: "Adventure-focused wilderness route with glacier viewpoints, premium camps, and expert escorts.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsvrxrf7yAKeb3z1hYq1Z03mnHy-K9VzfHzatKNb_JRctX4u8xqBswJZB0FIur7_UUAh0yQt4GDcYosX_f24UXS_MtsNWIz1gZ50yknNuooKA97ZtCAsQ5wrXqVpFKOC9lTulA4GTYZot6rFR-HGo5AGnfLD3W-7XKCHlbthx-e9hC_iSTJ2MocZj5gQoM-TJtaat47Dz2Bh-Fj10NczRSOyCSoh4U0_Dv2KzsxDjvDi0zWXYuI4QS52zlrysaOUszIIBavqwr9Lx6",
  },
  {
    id: "himalayas",
    area: "Asia",
    title: "Himalayas",
    price: "$5,100+",
    tag: "Trending",
    summary: "High-altitude experiential tour featuring curated lodges, spiritual landmarks, and scenic drives.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBLaXTdmKI9rp18Q79r-BDRYimye1Ks3MInz9oHKzyqWhUtGD15HaTVNWqdjYUwisgvHDyrFODGRKONNS1jz_7y5JbY8eHkmIzkogu5iIAswQLcnJ5ILBXJ0O5JmtXP7ALmjcH9vE2AT8LCgvaxv2e94kvnCED0fEdcmmZp-mJRV_Mz-Zvr66kUg3DiZcAg2OtNuI-3PaI8rNLdYmkc38ojEeJVq7r1Tgp8xTMs6Y90zR9LizqtGdNVd4oUyUUxK230gUqzWyF-_bD",
  },
  {
    id: "inca-trail",
    area: "South America",
    title: "Inca Trail",
    price: "$3,200+",
    summary: "Classic heritage trek experience blended with comfort stays, guided history walks, and local cuisine.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBa2SXYWUhz5EV0nDoGx2HxKdVryPeb7LXeD3bXmnLk_mRdBeDPt4U7c3N3LBufqPoLvODctQYS96JCvl04XeNjIG5zG8RKt9_I5iX29QbsuOzdqPDhSqzKuIWkPU4E_jM-xsNhT9XYG1nhiZO_6keVf-SCS-rWbrG8dcnALYK-X0fT8sD6lnmeaqbadK7CWatZ5bOtPGV069FLTNuo-RXH4VO0BdRqwg7SMUTRVk2SodYIrHyES9KifzwSkh3CG6DxujlLZ_LTC2sv",
  },
  {
    id: "dolomites",
    area: "Europe",
    title: "The Dolomites",
    price: "$4,500+",
    tag: "Limited Deal",
    summary: "Premium mountain retreat with signature scenic loops, curated stays, and private-guided add-ons.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Ku7hoU01lfiBBWcMX1yKXqamj-qcI-mkwJiq7FBfrjyN09zflHjoiO8fR_qbfPifCI0fjSo3vLnayDwL8vjtGAThmiwD_xVvFU9aVxqyKzt-T_B4cyKYY6G6cA7KKnTXqWxxmeM073_PU8qi1RD3ugXb7PTcQYftU2XxHIBGyTbpE6AQti5fiMc_fUer9k_7cPZmPNmUWK3IgtDm149yjqjo1dtbMpG1fmE-lOtbU-hA37oPcCgJeij5zzy-ktbSevSYnNvWJtvh",
  },
  {
    id: "andes-ridge",
    area: "Americas",
    title: "Andes Ridge",
    price: "$3,900+",
    summary: "Balanced culture-and-nature program with handpicked stays, immersive activities, and easy logistics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsvrxrf7yAKeb3z1hYq1Z03mnHy-K9VzfHzatKNb_JRctX4u8xqBswJZB0FIur7_UUAh0yQt4GDcYosX_f24UXS_MtsNWIz1gZ50yknNuooKA97ZtCAsQ5wrXqVpFKOC9lTulA4GTYZot6rFR-HGo5AGnfLD3W-7XKCHlbthx-e9hC_iSTJ2MocZj5gQoM-TJtaat47Dz2Bh-Fj10NczRSOyCSoh4U0_Dv2KzsxDjvDi0zWXYuI4QS52zlrysaOUszIIBavqwr9Lx6",
  },
];

export default function CinematicInternational() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const featuredFilters = useMemo(
    () => ["All", ...new Set(destinationCards.filter((card) => card.tag).map((card) => card.tag))],
    []
  );

  const visibleCards = useMemo(() => {
    if (activeFilter === "All") return destinationCards;
    return destinationCards.filter((card) => card.tag === activeFilter);
  }, [activeFilter]);

  useCinematicEffects();

  const openFeaturedDetails = () => {
    navigate("/packages/reference");
  };

  return (
    <div className="cinematic-page">
      <div className="cine-shell">
        <CinematicCursor />
        <CinematicHeader activeKey="international" />
        <CinematicSideDots dots={dots} />
        <CinematicRightTab label="Global" />

        <section id="intl-hero" className="cine-hero">
          <div
            className="cine-hero-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(20,16,10,0.45), rgba(20,16,10,0.88)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBa2SXYWUhz5EV0nDoGx2HxKdVryPeb7LXeD3bXmnLk_mRdBeDPt4U7c3N3LBufqPoLvODctQYS96JCvl04XeNjIG5zG8RKt9_I5iX29QbsuOzdqPDhSqzKuIWkPU4E_jM-xsNhT9XYG1nhiZO_6keVf-SCS-rWbrG8dcnALYK-X0fT8sD6lnmeaqbadK7CWatZ5bOtPGV069FLTNuo-RXH4VO0BdRqwg7SMUTRVk2SodYIrHyES9KifzwSkh3CG6DxujlLZ_LTC2sv')",
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

        <section id="intl-destinations" className="cine-section cine-section-dark">
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">World Without Borders</p>
            <h2 className="cine-heading">International Destinations</h2>

            <div className="cine-card-filters" role="tablist" aria-label="International featured filters">
              {featuredFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`cine-card-filter-btn ${activeFilter === filter ? "active" : ""}`}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="cine-grid-3">
              {visibleCards.map((card) => (
                <article
                  key={`${card.area}-${card.title}`}
                  className="cine-card cine-card-with-box"
                >
                  <div className="cine-card-image-wrap">
                    {card.tag ? <span className="cine-feature-tag cine-feature-tag-image">{card.tag}</span> : null}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="cine-parallax-img"
                      data-parallax="true"
                    />
                  </div>

                  <div className="cine-attached-box">
                    <p>{card.area}</p>
                    <h3>{card.title}</h3>
                    <p className="cine-attached-desc">{card.summary}</p>
                    <div className="cine-price">
                      <strong>{card.price}</strong>
                    </div>
                    <div className="cine-attached-actions">
                      <button
                        type="button"
                        className="cine-glass-btn"
                        onClick={openFeaturedDetails}
                      >
                        Explore
                      </button>
                      <a
                        href={`https://wa.me/919620421494?text=${encodeURIComponent(`Hi, I want to know more about ${card.title}.`)}`}
                        className="cine-glass-btn cine-glass-btn-accent"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        More
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="intl-live" className="cine-section cine-section-light">
          <LiveInternationalPackages />
        </section>

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
