import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Globe,
  Shield,
  Clock,
  Star,
  MapPin,
  Users,
  Map,
} from "lucide-react";
import "./HomePage.css";

/* ================= IMAGE WITH FALLBACK (INLINE) ================= */

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

function ImageWithFallback({ src, alt, className, style, ...rest }) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${
          className || ""
        }`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={ERROR_IMG_SRC}
            alt="Error loading image"
            data-original-url={src}
          />
        </div>
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

/* ================= HOME PAGE ================= */

export default function HomePage() {
  const features = [
    {
      icon: Plane,
      title: "Flight Booking",
      description:
        "Book flights to destinations worldwide with competitive prices and flexible schedules",
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description:
        "Comprehensive coverage for peace of mind during your travels",
    },
    {
      icon: Globe,
      title: "Visa Assistance",
      description: "Expert help with visa applications for all countries",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service for all your travel needs",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text:
        "Adhvaga made my dream vacation to Europe seamless. Their visa assistance saved me so much time!",
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      rating: 5,
      text:
        "Best travel agency I've worked with. Professional service and great prices on flights.",
    },
    {
      name: "Emma Williams",
      location: "London, UK",
      rating: 5,
      text:
        "The travel insurance they provided gave me complete peace of mind during my trip to Asia.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "120+", label: "Destinations" },
    { number: "15+", label: "Years Experience" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <PageTransition>
      <div className="adhvaga-home">
        {/* HERO */}
        <section className="hero">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1606225278453-eba097f60fc3"
            alt="Travel destination"
            className="hero-bg"
          />
          <div className="hero-overlay" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>
              Your Journey <br />
              <span>Starts Here</span>
            </h1>

            <p>
              Experience the world with confidence. From local gems to
              international wonders, we handle everything for your perfect
              getaway.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary">
                <Globe /> Explore World
              </button>
              <button className="btn-outline">
                <Map /> Explore India
              </button>
            </div>
          </motion.div>
        </section>

        {/* STATS */}
        <section className="stats">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </section>

        {/* FEATURES */}
        <section className="features">
          <h2>
            Why Choose <span>Adhvaga</span>
          </h2>
          <p>
            We provide comprehensive travel solutions tailored to your unique
            needs.
          </p>

          <div className="feature-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">
                  <f.icon />
                </div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials">
          <h2>What Our Clients Say</h2>

          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} />
                  ))}
                </div>

                <p>"{t.text}"</p>

                <div className="author">
                  <Users />
                  <div>
                    <strong>{t.name}</strong>
                    <span>
                      <MapPin /> {t.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>
            Ready to Start Your <br /> Next Great Adventure?
          </h2>
          <p>
            Let us handle the details while you make the memories.
          </p>

          <div className="cta-buttons">
            <button className="btn-dark">Get Started Now</button>
            <button className="btn-light">View Packages</button>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
