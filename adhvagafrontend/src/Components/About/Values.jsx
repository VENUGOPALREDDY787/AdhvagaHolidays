import React from "react";

import "./Values.css";
const VALUES = [
  {
    title: "Passion for Exploration",
    description:
      "We believe that travel is not just about seeing places, but experiencing them with all your senses.",
    icon: <i class="fa-regular fa-compass"></i>
  },
  {
    title: "Sustainability",
    description:
      "Our commitment to the planet ensures that the beauty we share today remains for the generations of tomorrow.",
    icon: <i class="fa-solid fa-globe"></i>
  },
  {
    title: "Customer First",
    description:
      "Your journey is uniquely yours. We curate every detail to match your individual spirit of adventure.",
    icon: <i class="fa-regular fa-heart"></i>
  },
  {
    title: "Integrity & Trust",
    description:
      "With years of expertise, we provide honest guidance and secure bookings for total peace of mind.",
    icon: <i class="fa-regular fa-square-check"></i>
  }
];
const Values = () => {
  return (
    <section className="values-section">
      <div className="values-container">
        <div className="values-header">
          <h2 className="values-title">Our Values</h2>
          <p className="values-subtitle">
            The compass that guides every journey we curate. We don't just
            follow paths; we respect the ground we walk on.
          </p>
        </div>

        <div className="values-grid">
          {VALUES.map((value, idx) => (
            <div key={idx} className="value-card">
              <div className="value-icon">
                {value.icon}
              </div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
