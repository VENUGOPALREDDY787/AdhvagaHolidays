import React from "react";
import "./Services.css";

const SERVICES = [
  {
    id: 1,
    icon: "✈️",
    title: "Flight Bookings",
    description: "We provide domestic and international flight bookings with competitive fares and flexible options. Our team ensures smooth ticketing, seat selection, and ongoing support for changes or updates."
  },
  {
    id: 2,
    icon: "🏨",
    title: "Hotel Reservations",
    description: "Choose from a wide range of hotels worldwide, from budget to luxury stays. We ensure reliable bookings, transparent pricing, and comfort that suits your travel needs."
  },
  {
    id: 3,
    icon: "🌴",
    title: "Holiday Packages",
    description: "Our customized holiday packages are designed to match your interests, budget, and travel style. From leisure trips to family vacations, we handle every detail for a stress-free experience."
  },
  {
    id: 4,
    icon: "🛂",
    title: "Visa Assistance",
    description: "We offer professional visa guidance and documentation support for multiple destinations. Our team assists you through the process to ensure accuracy and timely submission."
  },
  {
    id: 5,
    icon: "🛡️",
    title: "Travel Insurance & Allied Services",
    description: "Protect your journey with comprehensive travel insurance and additional services. We help you choose suitable coverage for medical emergencies, trip delays, and unforeseen events."
  }
];

const Services = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-brand">Adhvaga Holidays Inc</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
