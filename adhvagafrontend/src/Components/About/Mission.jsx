import React from "react";
import "./Mission.css";

const Mission = () => {
  return (
    <section className="mission-section">
      <div className="mission-container">
        <div className="mission-card">
          <div className="mission-header">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-brand">Adhvaga Holidays</p>
          </div>
          <p className="mission-text">
            Our mission is to provide reliable, transparent, and personalized travel solutions 
            that create meaningful and stress-free experiences for our customers. We strive to 
            deliver exceptional service through professional expertise, trusted partnerships, 
            and a customer-first approach.
          </p>
        </div>

        <div className="vision-card">
          <div className="vision-header">
            <h2 className="vision-title">Our Vision</h2>
            <p className="vision-brand">Adhvaga Holidays</p>
          </div>
          <p className="vision-text">
            Our vision is to become a trusted and recognized travel brand, known for integrity, 
            innovation, and excellence in travel services. We aim to set new standards in customer 
            satisfaction while making travel accessible, seamless, and memorable for travelers 
            across India and beyond.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Mission;
