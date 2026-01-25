
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plane, FileText, Shield, Car, Check, ArrowRight } from "lucide-react";
import "./ServicesPage.css";

/* ================= PAGE TRANSITION (INLINE) ================= */
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/* ================= IMAGE WITH FALLBACK (INLINE) ================= */
const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4K";

function ImageWithFallback({ src, alt, className, style, ...rest }) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    return (
      <div className={`img-fallback ${className || ""}`} style={style}>
        <img src={ERROR_IMG_SRC} alt="Error loading" data-original-url={src} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setDidError(true)}
      {...rest}
    />
  );
}

/* ================= MAIN PAGE ================= */
export default function ServicesPage() {
  const services = [
    {
      icon: Plane,
      title: 'Air Tickets',
      description: 'Book flights to over 120 destinations worldwide with competitive pricing and flexible schedules.',
      image: 'https://images.unsplash.com/photo-1715526244826-fe8006a5b077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHRyYXZlbCUyMHNreXxlbnwxfHx8fDE3NjkzMjEzNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        'Competitive pricing on domestic and international flights',
        'Real-time flight availability and instant booking',
        'Flexible date changes and cancellations',
        'Access to exclusive airline deals and promotions',
        'Multi-city and round-trip booking options',
        'Assistance with seat selection and special requests',
      ],
      benefits: [
        'Save up to 30% on flight bookings',
        '24/7 booking support',
        'Loyalty rewards program',
        'Price match guarantee',
      ],
    },
    {
      icon: FileText,
      title: 'Visa Assistance',
      description: 'Expert guidance through the visa application process for all countries with high approval rates.',
      image: 'https://images.unsplash.com/photo-1758928807847-ed94f9ed3cad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzcG9ydCUyMHZpc2ElMjBkb2N1bWVudHN8ZW58MXx8fHwxNzY5MjY3MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        'Complete documentation support and review',
        'Application form filling assistance',
        'Embassy appointment scheduling',
        'Interview preparation and coaching',
        'Document translation services',
        'Express processing options available',
      ],
      benefits: [
        '95% approval success rate',
        'End-to-end assistance',
        'Quick turnaround time',
        'Money-back guarantee on rejections',
      ],
    },
    {
      icon: Shield,
      title: 'Travel Insurance',
      description: 'Comprehensive travel insurance coverage to protect you and your loved ones during your journey.',
      image: 'https://images.unsplash.com/photo-1650821414031-cf7291ce938c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBpbnN1cmFuY2UlMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc2OTMyMTQyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        'Medical emergency coverage up to $500,000',
        'Trip cancellation and interruption protection',
        'Lost baggage and personal belongings coverage',
        'Emergency evacuation and repatriation',
        'COVID-19 coverage included',
        '24/7 emergency assistance hotline',
      ],
      benefits: [
        'Affordable premium rates',
        'Instant policy issuance',
        'Global coverage',
        'Easy claims process',
      ],
    },
    {
      icon: Car,
      title: 'Car Rentals',
      description: 'Rent vehicles from economy to luxury at competitive rates with flexible pickup and drop-off options.',
      image: 'https://images.unsplash.com/photo-1760976396211-5546ce83a400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBsdXh1cnl8ZW58MXx8fHwxNzY5MjgzNTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        'Wide selection of vehicles from economy to luxury',
        'Flexible pickup and drop-off locations',
        'No hidden fees or charges',
        'Comprehensive insurance coverage included',
        'GPS navigation and child seats available',
        'Long-term rental discounts',
      ],
      benefits: [
        'Best price guarantee',
        'Free cancellation up to 24 hours',
        'Unlimited mileage options',
        'Premium customer service',
      ],
    },
  ];

  return (
    <PageTransition>
      <div className="services-page">
        <section className="services-hero">
          <h1>Our Services</h1>
          <p>Everything you need for a perfect journey</p>
        </section>

        <section className="services-list">
          {services.map((service, index) => (
            <div className={`service-row ${index % 2 ? "reverse" : ""}`} key={index}>
              <div className="service-image">
                <ImageWithFallback src={service.image} alt={service.title} />
                <div className="service-icon">
                  <service.icon />
                </div>
              </div>

              <div className="service-content">
                <h2>{service.title}</h2>
                <p>{service.description}</p>

                <ul className="features">
                  {service.features.map((f, i) => (
                    <li key={i}>
                      <Check /> {f}
                    </li>
                  ))}
                </ul>

                <div className="benefits">
                  {service.benefits.map((b, i) => (
                    <span key={i}>{b}</span>
                  ))}
                </div>

                <button className="primary-btn">
                  Get Started <ArrowRight />
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </PageTransition>
  );
}