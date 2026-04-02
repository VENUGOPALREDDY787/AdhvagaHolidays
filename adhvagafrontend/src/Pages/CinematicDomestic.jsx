// import { useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import LiveDomesticPackages from "../Components/Packages/DomesticPackages";
// import useCinematicEffects from "./useCinematicEffects";
// import {
//   CinematicCursor,
//   CinematicHeader,
//   CinematicRightTab,
//   CinematicSideDots,
// } from "./CinematicLayout";
// import "./CinematicExperience.css";

// const dots = [
//   { id: "domestic-hero", label: "Hero" },
//   { id: "domestic-featured", label: "Featured" },
//   { id: "domestic-live", label: "All Packages" },
//   { id: "domestic-cta", label: "CTA" },
// ];

// const cards = [
//   {
//     id: "himalayan-escape",
//     label: "Mountain Series",
//     title: "Himalayan Escape",
//     price: "$899",
//     tag: "Best Seller",
//     summary: "7D/6N mountain circuit with scenic stays, guided local experiences, and smooth transfers.",
//     image:
//       "/aida-images/aida_001.jpg",
//   },
//   {
//     id: "whispering-pines",
//     label: "Forest Series",
//     title: "Whispering Pines",
//     price: "$649",
//     summary: "Relaxed forest getaway with nature trails, boutique cottages, and easy-paced sightseeing.",
//     image:
//       "/aida-images/aida_016.jpg",
//   },
//   {
//     id: "riverbed-soul",
//     label: "Valley Series",
//     title: "Riverbed Soul",
//     price: "$725",
//     tag: "Trending",
//     summary: "Signature valley retreat featuring river-view stays, soft adventure add-ons, and local cuisine.",
//     image:
//       "/aida-images/aida_021.jpg",
//   },
//   {
//     id: "azure-coast",
//     label: "Coastal Series",
//     title: "Azure Coast",
//     price: "$850",
//     tag: "Limited Deal",
//     summary: "Coastal premium escape with curated beach activities, sunset cruises, and handpicked resorts.",
//     image:
//       "/aida-images/aida_034.jpg",
//   },
//   {
//     id: "verdant-highlands",
//     label: "Highland Series",
//     title: "Verdant Highlands",
//     price: "$675",
//     summary: "Comfort-first highland package with panoramic routes, tea estates, and family-friendly plans.",
//     image:
//       "/aida-images/aida_026.jpg",
//   },
// ];

// export default function CinematicDomestic() {
//   const navigate = useNavigate();
//   const [activeFilter, setActiveFilter] = useState("All");

//   const featuredFilters = useMemo(
//     () => ["All", ...new Set(cards.filter((card) => card.tag).map((card) => card.tag))],
//     []
//   );

//   const visibleCards = useMemo(() => {
//     if (activeFilter === "All") return cards;
//     return cards.filter((card) => card.tag === activeFilter);
//   }, [activeFilter]);

//   useCinematicEffects();

//   const openFeaturedDetails = () => {
//     navigate("/packages/reference");
//   };

//   return (
//     <div className="cinematic-page">
//       <div className="cine-shell">
//         <CinematicCursor />
//         <CinematicHeader activeKey="domestic" />
//         <CinematicSideDots dots={dots} />
//         <CinematicRightTab label="Domestic" />

//         <section id="domestic-hero" className="cine-hero">
//           <div
//             className="cine-hero-bg"
//             style={{
//               backgroundImage:
//                 "linear-gradient(rgba(0,0,0,0.52), rgba(33,29,17,0.9)), url('/aida-images/aida_032.jpg')",
//             }}
//           />
//           <div className="cine-overlay" />

//           <div className="cine-hero-copy" data-reveal>
//             <h1 className="cine-title-main">Domestic</h1>
//             <p className="cine-subtext">
//               Homegrown journeys with cinematic landscapes across mountains, forests, coasts,
//               and cultural corridors. Designed for comfort, value, and seamless logistics.
//             </p>
//           </div>
//         </section>

//         <section id="domestic-featured" className="cine-section cine-section-dark">
//           <div className="cine-container" data-reveal>
//             <p className="cine-heading-eyebrow">Featured Domestic Escapes</p>
//             <h2 className="cine-heading">Top Curation</h2>

//             <div className="cine-card-filters" role="tablist" aria-label="Domestic featured filters">
//               {featuredFilters.map((filter) => (
//                 <button
//                   key={filter}
//                   type="button"
//                   className={`cine-card-filter-btn ${activeFilter === filter ? "active" : ""}`}
//                   aria-pressed={activeFilter === filter}
//                   onClick={() => setActiveFilter(filter)}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>

//             <div className="cine-grid-3">
//               {visibleCards.map((card) => (
//                 <article
//                   key={card.title}
//                   className="cine-card cine-card-with-box"
//                 >
//                   <div className="cine-card-image-wrap">
//                     {card.tag ? <span className="cine-feature-tag cine-feature-tag-image">{card.tag}</span> : null}
//                     <img
//                       src={card.image}
//                       alt={card.title}
//                       className="cine-parallax-img"
//                       data-parallax="true"
//                     />
//                   </div>

//                   <div className="cine-attached-box">
//                     <p>{card.label}</p>
//                     <h3>{card.title}</h3>
//                     <p className="cine-attached-desc">{card.summary}</p>
//                     <div className="cine-price">
//                       <strong>{card.price}</strong>
//                     </div>
//                     <div className="cine-attached-actions">
//                       <button
//                         type="button"
//                         className="cine-glass-btn"
//                         onClick={openFeaturedDetails}
//                       >
//                         Explore
//                       </button>
//                       <a
//                         href={`https://wa.me/919620421494?text=${encodeURIComponent(`Hi, I want to know more about ${card.title}.`)}`}
//                         className="cine-glass-btn cine-glass-btn-accent"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         More
//                       </a>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section id="domestic-live" className="cine-section cine-section-light">
//           <LiveDomesticPackages />
//         </section>

//         <section id="domestic-cta" className="cine-cta">
//           <div className="cine-container" data-reveal>
//             <h2>Plan Your India Circuit</h2>
//             <p>
//               Build a route across India with travel styles that match your pace, from quick weekend
//               escapes to month-long thematic journeys.
//             </p>
//             <div className="cine-cta-actions">
//               <Link className="cine-btn" to="/Support">
//                 Talk To A Planner
//               </Link>
//               <Link className="cine-btn cine-btn-outline" to="/International">
//                 View International
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }












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