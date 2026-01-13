import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: "url('https://picsum.photos/id/10/1920/1080')",
        }}
      >
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Beyond <span className="brand-text-yellow">Borders</span>
        </h1>
        <p className="hero-subtitle">
          Crafting extraordinary journeys for the modern nomad since 2015.
        </p>
      </div>

      {/* Scroll Down Icon (SVG) */}
      <div className="hero-scroll">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
