import React from "react";
import "./UiloraMusicCard.css";

export const UiloraMusicCard = ({
  title = "Frontend Radio",
  subtitle = "DAILY MIX",
  tracks = "12 Tracks",
  image = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
  className = "",
}) => {
  return (
    <article className={`uilora-music-card ${className}`.trim()}>
      <div className="uilora-card-top">
        <span className="uilora-card-subtitle">{subtitle}</span>
        <span className="uilora-card-tracks">{tracks}</span>
        <h2 className="uilora-card-title">{title}</h2>
      </div>

      <div className="uilora-card-image-wrap">
        <img src={image} alt={title} className="uilora-card-image" loading="lazy" />
        <div className="uilora-card-image-overlay" />
      </div>
    </article>
  );
};

export default UiloraMusicCard;
