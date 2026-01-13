import React from "react";
import "./Milestones.css";

const MILESTONES = [
  {
    year: "2015",
    title: "The Vision",
    description:
      "Adhvaga Holidays Inc was born from a single backpack and a dream to map the unseen corners of the world.",
  },
  {
    year: "2018",
    title: "1,000 Journeys",
    description:
      "Successfully facilitated over 1,000 bespoke international tours across five continents.",
  },
  {
    year: "2020",
    title: "Digital Leap",
    description:
      "Launched our innovative smart-booking platform, making dream vacations accessible with a click.",
  },
  {
    year: "2023",
    title: "Global Partner",
    description:
      "Recognized as a leading sustainable travel partner by the International Travel Alliance.",
  },
];

const Milestones = () => {
  return (
    <section className="milestones-section">
      <div className="milestones-container">

        {/* Header */}
        <div className="milestones-header">
          <div className="header-left">
            <div className="header-label">
              <div className="yellow-bar"></div>
              <span>A LEGACY OF EXCELLENCE</span>
            </div>

            <h2 className="milestones-title">
              Key <span>Milestones</span>
            </h2>
          </div>

          <p className="milestones-quote">
            "Celebrating the moments that defined our evolution in the travel world."
          </p>
        </div>

        {/* Cards */}
        <div className="milestones-grid">
          {MILESTONES.map((item, idx) => (
            <div key={idx} className="milestone-card">

              {/* Watermark */}
              <div className="watermark">
                {item.year.slice(-2)}
              </div>

              <div>
                {/* Award Icon (SVG) */}
                <div className="icon-box">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="6"></circle>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                  </svg>
                </div>

                <span className="year">{item.year}</span>

                <h3 className="card-title">{item.title}</h3>

                <p className="card-desc">{item.description}</p>
              </div>

              <div className="card-footer">
                Chapter {idx + 1}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Milestones;
