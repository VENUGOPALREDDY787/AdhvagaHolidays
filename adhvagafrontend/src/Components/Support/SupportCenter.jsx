import React from 'react';
import './SupportCenter.css';

const SupportCenter = () => {
  return (
    <section className="support-hero">
      {/* Abstract plane trail patterns */}
      <div className="abstract-background">
        <svg className="trail-svg" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="150" fill="none" stroke="black" strokeWidth="2" strokeDasharray="8 8" />
          <path d="M50,200 Q200,50 350,200" fill="none" stroke="black" strokeWidth="2" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="container">
        <div className="content-wrapper">
          <span className="badge">
            Support Center
          </span>
          <h1 className="hero-title">
            We're here to guide your <span className="underline-text">journey</span>.
          </h1>
          <p className="hero-description">
            From booking your dream escape to handling the unexpected details, our concierge team is always by your side.
          </p>
          
          <div className="contact-grid">
            <div className="contact-card">
              <div className="card-icon">📞</div>
              <div className="card-title">24/7 Hotline</div>
              <div className="card-detail">1-800-ADHVAGA</div>
            </div>
            
            <div className="contact-card">
              <div className="card-icon">✉️</div>
              <div className="card-title">Priority Email</div>
              <div className="card-detail">concierge@adhvaga.com</div>
            </div>
            
            <div className="contact-card">
              <div className="card-icon">📍</div>
              <div className="card-title">Main Office</div>
              <div className="card-detail">Singapore / London</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportCenter;