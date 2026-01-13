import React from "react";
import "./Story.css";

const Story = () => {
  return (
    <section className="story-section">
      {/* Background Pattern */}
      <div className="story-bg-pattern"></div>

      <div className="story-container">
        <div className="story-content">
          <div className="story-badge">The Genesis</div>

          <h2 className="story-heading">
            Our <span className="story-highlight">Story</span>
          </h2>

          <div className="story-text">
            <p>
              Adhvaga, derived from the Sanskrit word for{" "}
              <span className="story-emphasis">"traveler,"</span> began as a small
              passion project in a tiny studio apartment. Our founder, Arjun
              Sharma, realized that while the travel industry was booming, the
              soul of travel was getting lost in automated bookings and
              cookie-cutter itineraries.
            </p>

            <p>
              In 2015, Adhvaga Holidays Inc was established with a singular
              mission: to restore the magic of discovery. We spent our first
              three years wandering through the backstreets of Kyoto, the
              highlands of Peru, and the deserts of Rajasthan to build
              relationships with local communities that no other agency could
              reach.
            </p>
          </div>

          <div className="story-stats">
            <div className="stat-item">
              <span className="stat-number">10+</span>
              <span className="stat-label">Years Exp.</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Destinations</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Happy Souls</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
