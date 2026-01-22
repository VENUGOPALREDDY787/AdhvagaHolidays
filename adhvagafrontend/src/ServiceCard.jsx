import React from "react";
import "./ServiceCard.css";

const ServiceCard = ({ service, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`service-card ${
        isEven ? "row-normal" : "row-reverse"
      }`}
    >
      {/* Image Section */}
      <div className="image-wrapper">
        <div className="image-container">
          <img
            src={service.image}
            alt={service.title}
            className="service-image"
          />
          <div className="image-overlay"></div>

          <div className="image-badge">
            <i className={`fa-solid ${service.icon}`}></i>
            <span>{service.title}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-wrapper">
        <div className="icon-box">
          <i className={`fa-solid ${service.icon}`}></i>
        </div>

        <h2 className="service-title">{service.title}</h2>

        <p className="service-description">{service.description}</p>

        <ul className="features-list">
          {service.features.map((feature, idx) => (
            <li key={idx}>
              <span className="check-icon">
                <i className="fa-solid fa-check"></i>
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="button-group">
          <button className="btn-primary">
            Enquire Now
            <i className="fa-solid fa-arrow-right"></i>
          </button>

          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
