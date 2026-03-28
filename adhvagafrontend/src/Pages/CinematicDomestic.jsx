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
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuA0ieb-XYWO-g3iKFqhIic_Wos1-6q2GC1U0xFB41QB4hVAijuiMBxXh-cTolRoRNdn3wZ_YHvma2KQRJLe-908Bxe_Cc3dsbTP6lhJJO5fthgR74BOU1n66U1mPzpzuGm5xu8acq7ibQK6lr1tuppJAVDCSTmD0jLSlETnPuNnJlVYF7Tmg5PFvpw6PwjurPgvr-zssmmb6Y61DykwBggo-fxP5furpUUWX7qqWQ9o5m3CrEgV91y5hsVeXf1fMU-TvEf44YYfxO6x",
//   },
//   {
//     id: "whispering-pines",
//     label: "Forest Series",
//     title: "Whispering Pines",
//     price: "$649",
//     summary: "Relaxed forest getaway with nature trails, boutique cottages, and easy-paced sightseeing.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuBOsL-dX6ZNlB7v8iSfMv2_b1cnJdBOfK14vN8Ys5qaOm0ah7nOD2wADxjxXLTiQFum99WpKxrN5xE_EO09URDyOObPQxwXVqoOzV1k5Y_6IJCsviRzsiqFJ78YqMwmrsXGa6NsT_MbfBc73GF4laacOovPhF7m1zVNXXdB5EIYxswQyrh2mGQNWctRJdyjhxlU8CwQ3nAY4bIV0j98LdzRpj_X8XxW3HiLRYZvQrd9-QQR5B43poM_USlWIHaq4-ypOXZxwwkwCj8v",
//   },
//   {
//     id: "riverbed-soul",
//     label: "Valley Series",
//     title: "Riverbed Soul",
//     price: "$725",
//     tag: "Trending",
//     summary: "Signature valley retreat featuring river-view stays, soft adventure add-ons, and local cuisine.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuBpv4Roi117tZf992_8hFGO8IsOAP7k0pQ4XLvYvtkSuQpOerort1SD93ZZDSzJkSH2ZyC1ldm45VldZ1IfvmZ0HcLNbgGPWLCACYygTKHXmGTF846qgQfHs6j0CvWc7vOSprbxLIXF8ho6NZ5W78_vYYcSk39KgODK03NCyhAYahDjgYhZmyeFUtxlxzZJc3vKkOYTwAFMj-lQ07V9qyRvTdZcjhMUldVZC2L6isEhuM6AlPnNiYj_DFhffDX4o4stjdzdIpRD3SeZ",
//   },
//   {
//     id: "azure-coast",
//     label: "Coastal Series",
//     title: "Azure Coast",
//     price: "$850",
//     tag: "Limited Deal",
//     summary: "Coastal premium escape with curated beach activities, sunset cruises, and handpicked resorts.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuDIaGanKCJZLfoSDyxSVSud2DkqE7pu-amfElO-zQYJ32XEq2EE4Vrkj9q4v58vT8cKnH_zALSzpvdafpOjV9BhjCNPCYuf7dht7VVOv_wXFm0RNwafcGYBvmexi3BTF1eurqXtV6eQdxhHwgFLNihNrAQRlYa5nj44c0IMqlRUFJ-CHB3eaZEcR0tlhA0Djbcip0ut8kDGEkLGkT9Rb4tzefmslTaiz9AuKt0EBs9XyLj_VGXeDh2gXzdMlygZgw5QaxHPPnWzernt",
//   },
//   {
//     id: "verdant-highlands",
//     label: "Highland Series",
//     title: "Verdant Highlands",
//     price: "$675",
//     summary: "Comfort-first highland package with panoramic routes, tea estates, and family-friendly plans.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuCDAh-0pM29xVO4Gqs0ZJPHdsGm9Kxqjqik7CVsTYHn08tDSkE30Vll8dQcTXt93OPESesaVf6OwQpi--BC6Mf9_GYS9x-RYbQHA6q9e0Zr60UcITZnLt3aABb4tBm-6OjNQi3HbE3x_a7ouM2G1KBX4Dgm4oUn8BOq31ZQ_rkj5namo1HkBk-N1-FvHBNW7o6Xh4wOg5Z2PlX3dblAYIhT_5KK6ylPYuvuF7fKOAfy7uR0siyX3-W9t6iQSWclYJoB_g4luscp6SbO",
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
//                 "linear-gradient(rgba(0,0,0,0.52), rgba(33,29,17,0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCybq3g7HC-X9BjVOvpApct3MXuq4RSyZLVwZyYDi6SyHD8nLi0IAZakmDnpX9V1DQlln8rg5C_2ooVlqawzv_79noMe9ul-w-UrprLlSIUimX5SQCDif9O2TNzqTFY9F_HhAj1W9S9uDbIRdlQfZOALhPFiqTg2u8tUTuF7Zr5mqm7GRG7SKkhCi8v8HfoWhTRBgPX0n46e19JCIsAOFtjgKoT7g9zJ2AO99ovdh5Aa5DSWuJPB-M_LapFWWi5F2pqaViHztDyFmif')",
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
                "linear-gradient(rgba(0,0,0,0.52), rgba(33,29,17,0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCybq3g7HC-X9BjVOvpApct3MXuq4RSyZLVwZyYDi6SyHD8nLi0IAZakmDnpX9V1DQlln8rg5C_2ooVlqawzv_79noMe9ul-w-UrprLlSIUimX5SQCDif9O2TNzqTFY9F_HhAj1W9S9uDbIRdlQfZOALhPFiqTg2u8tUTuF7Zr5mqm7GRG7SKkhCi8v8HfoWhTRBgPX0n46e19JCIsAOFtjgKoT7g9zJ2AO99ovdh5Aa5DSWuJPB-M_LapFWWi5F2pqaViHztDyFmif')",
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