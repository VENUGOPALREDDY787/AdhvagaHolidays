import React from 'react';
import './AboutSection.css'; // Importing the CSS file

const features = [
  {
    icon: '🌍',
    title: 'Bespoke Itineraries',
    description: 'Every journey is custom-crafted to your unique tastes, ensuring no two trips are ever the same.'
  },
  {
    icon: '✨',
    title: 'Exclusive Access',
    description: "From private gallery viewings to hidden local gems, we open doors that others can't."
  },
  {
    icon: '🛡️',
    title: 'Seamless Support',
    description: 'Our 24/7 concierge team handles every detail, so you can focus on the magic of travel.'
  },
  {
    icon: '💎',
    title: 'Luxury Redefined',
    description: 'We prioritize authenticity and comfort, bringing you the finest experiences on Earth.'
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        
          
       

          {/* Content Side */}
          <div className="row p-5">
            <span className="label-story">The Adhvaga Story</span>
            <h2 className="heading-main">
              We don't just plan trips. We design <span className="highlight-text">legacies</span>.
            </h2>
            <p className="description-text">
              At Adhvaga Holidays, we believe travel is the ultimate form of self-discovery. Founded in Singapore, our mission has always been to bridge the gap between ordinary tourism and extraordinary exploration.
            </p>
            
            <div className="features-grid">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-desc">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

        
      </div>
    </section>
  );
};

export default AboutSection;