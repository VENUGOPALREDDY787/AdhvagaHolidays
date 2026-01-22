import ServiceCard from "./ServiceCard";
 
import "./Services.css";

const SERVICES_DATA =[
  {
    id: 'air-tickets',
    title: 'Air Tickets',
    description: 'Seamless flight bookings with the best fares globally. From economy comfort to first-class luxury, we navigate the skies for you.',
    icon: 'fa-plane-departure',
    features: ['Instant Ticketing', 'Multi-city Itineraries', 'Group Bookings', '24/7 Schedule Updates'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c05c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'visa-assistance',
    title: 'Visa Assistance',
    description: 'Expert guidance through complex visa procedures. We ensure your documentation is flawless for a higher success rate.',
    icon: 'fa-passport',
    features: ['Document Review', 'Appointment Scheduling', 'Interview Coaching', 'E-Visa Processing'],
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'travel-insurance',
    title: 'Travel Insurance',
    description: 'Travel with peace of mind. Our comprehensive insurance plans cover medical emergencies, trip cancellations, and more.',
    icon: 'fa-shield-halved',
    features: ['Global Coverage', 'Instant Claims Support', 'Theft Protection', 'Medical Evacuation'],
    image: 'https://images.unsplash.com/photo-1454165833767-027ff33027ef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'car-rentals',
    title: 'Car Rentals',
    description: 'Premium vehicles at your destination. Choose from self-drive luxury cars or chauffeured executive services.',
    icon: 'fa-car',
    features: ['Global Fleet Access', 'Airport Pickups', 'Unlimited Mileage Options', 'Insurance Included'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'corporate-services',
    title: 'Corporate Services',
    description: 'Dedicated travel management for businesses. Optimize your corporate travel budget with our specialized B2B solutions.',
    icon: 'fa-briefcase',
    features: ['Dedicated Account Manager', 'Expense Reporting', 'Corporate Discounts', 'MICE Arrangements'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'custom-services',
    title: 'Custom Services',
    description: 'Your dream holiday, tailored to perfection. We design bespoke itineraries that reflect your unique travel style.',
    icon: 'fa-wand-magic-sparkles',
    features: ['Private Tours', 'Boutique Stays', 'Unique Experiences', 'Full Personalization'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
  }
]
const Services = () => {
  return (
    <div className="services-root">
      

      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-bg">
          <i className="fa-solid fa-plane services-plane-icon"></i>
        </div>

        <div className="services-container services-hero-content">
          <span className="services-badge">Explore Our Expertise</span>

          <h1 className="services-hero-title">
            PREMIUM TRAVEL <br />
            <span>SOLUTIONS.</span>
          </h1>

          <p className="services-hero-text">
            At Adhvaga Holidays Inc, we don't just book trips; we craft
            experiences. From seamless logistics to bespoke itineraries, your
            global journey begins here.
          </p>

          <div className="services-hero-buttons">
            <a href="#services" className="services-btn-dark">
              View All Services
            </a>
            <a href="#contact" className="services-btn-light">
              Get a Free Quote
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="services-container services-stats">
          <div className="services-stats-box">
            <div>
              <h3>15k+</h3>
              <p>Tickets Issued</p>
            </div>
            <div>
              <h3>98%</h3>
              <p>Visa Success</p>
            </div>
            <div>
              <h3>500+</h3>
              <p>Corporate Partners</p>
            </div>
            <div>
              <h3>24/7</h3>
              <p>Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-list">
        <div className="services-container">
          <div className="services-heading">
            <h2>Our Core Services</h2>
            <div className="services-divider"></div>
            <p>
              Adhvaga Holidays Inc offers a full spectrum of travel management
              services designed for both leisure seekers and business
              professionals.
            </p>
          </div>

          {SERVICES_DATA.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="services-contact">
        <div className="services-container services-contact-box">
          <div className="services-contact-left">
            <h3>Ready to Fly?</h3>
            <p>
              Let's discuss your travel needs. Our experts are ready to assist
              you.
            </p>
          </div>

          <div className="services-contact-right">
            <form>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Email Address" />
              <select>
                <option>Air Ticket Booking</option>
                <option>Visa Assistance</option>
                <option>Travel Insurance</option>
                <option>Corporate Travel</option>
                <option>Custom Tour</option>
              </select>
              <textarea placeholder="Tell us more about your travel plans..." />
              <button type="submit">Send Inquiry</button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
