import React, { useState } from 'react';
export const TOUR_PACKAGES= [
  {
    id: '1',
    title: 'Santorini Sunset Escape',
    destination: 'Santorini, Greece',
    price: 1250,
    duration: '5 Days / 4 Nights',
    rating: 4.9,
    category: 'Relaxation',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    tag: 'Best Seller'
  },
  {
    id: '2',
    title: 'Tokyo Neon Nights',
    destination: 'Tokyo, Japan',
    price: 1890,
    duration: '7 Days / 6 Nights',
    rating: 4.8,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    tag: 'New'
  },
  {
    id: '3',
    title: 'Serengeti Wildlife Safari',
    destination: 'Tanzania',
    price: 2400,
    duration: '10 Days / 9 Nights',
    rating: 5.0,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Swiss Alps Luxury Retreat',
    destination: 'Zermatt, Switzerland',
    price: 3100,
    duration: '6 Days / 5 Nights',
    rating: 4.9,
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    title: 'Bali Zen & Wellness',
    destination: 'Ubud, Indonesia',
    price: 850,
    duration: '5 Days / 4 Nights',
    rating: 4.7,
    category: 'Relaxation',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    title: 'Amalfi Coast Discovery',
    destination: 'Positano, Italy',
    price: 1550,
    duration: '7 Days / 6 Nights',
    rating: 4.9,
    category: 'Relaxation',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
    tag: 'Popular'
  },
  {
    id: '7',
    title: 'Machu Picchu Trail',
    destination: 'Cusco, Peru',
    price: 1680,
    duration: '8 Days / 7 Nights',
    rating: 4.8,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    title: 'Icelandic Northern Lights',
    destination: 'Reykjavik, Iceland',
    price: 2100,
    duration: '6 Days / 5 Nights',
    rating: 4.7,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '9',
    title: 'Dubai Desert Gold',
    destination: 'Dubai, UAE',
    price: 1400,
    duration: '5 Days / 4 Nights',
    rating: 4.6,
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '10',
    title: 'Great Barrier Reef Dive',
    destination: 'Queensland, Australia',
    price: 1950,
    duration: '7 Days / 6 Nights',
    rating: 4.9,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '11',
    title: 'Parisian Art & Culture',
    destination: 'Paris, France',
    price: 1320,
    duration: '4 Days / 3 Nights',
    rating: 4.8,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '12',
    title: 'Kyoto Ancient Temples',
    destination: 'Kyoto, Japan',
    price: 1580,
    duration: '6 Days / 5 Nights',
    rating: 4.9,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '13',
    title: 'Canadian Rockies Expedition',
    destination: 'Banff, Canada',
    price: 2600,
    duration: '12 Days / 11 Nights',
    rating: 5.0,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800',
    tag: 'Long Stay'
  },
  {
    id: '14',
    title: 'Marrakech Souks & Sands',
    destination: 'Marrakech, Morocco',
    price: 980,
    duration: '6 Days / 5 Nights',
    rating: 4.7,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '15',
    title: 'Cape Town Heights',
    destination: 'South Africa',
    price: 1450,
    duration: '8 Days / 7 Nights',
    rating: 4.8,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '16',
    title: 'New York City Highlights',
    destination: 'New York, USA',
    price: 1600,
    duration: '5 Days / 4 Nights',
    rating: 4.5,
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '17',
    title: 'Pyramids & Nile Cruise',
    destination: 'Cairo, Egypt',
    price: 1150,
    duration: '7 Days / 6 Nights',
    rating: 4.7,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '18',
    title: 'Venetian Romance',
    destination: 'Venice, Italy',
    price: 1280,
    duration: '4 Days / 3 Nights',
    rating: 4.6,
    category: 'Relaxation',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '19',
    title: 'Rio Carnival Experience',
    destination: 'Rio, Brazil',
    price: 1900,
    duration: '7 Days / 6 Nights',
    rating: 4.9,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=800',
    tag: 'Limited'
  },
  {
    id: '20',
    title: 'Phuket Island Adventure',
    destination: 'Phuket, Thailand',
    price: 750,
    duration: '6 Days / 5 Nights',
    rating: 4.6,
    category: 'Family',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed7be2eb5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '21',
    title: 'Maldives Overwater Bliss',
    destination: 'Maldives',
    price: 3500,
    duration: '5 Days / 4 Nights',
    rating: 5.0,
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    tag: 'Elite'
  },
  {
    id: '22',
    title: 'Patagonia Glaciers Tour',
    destination: 'Chile/Argentina',
    price: 2800,
    duration: '14 Days / 13 Nights',
    rating: 4.9,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&q=80&w=800'
  }
];

import './PackagesSection.css'; // Make sure to create this file

const PackagesSection = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Luxury', 'Adventure', 'Cultural', 'Relaxation', 'Family'];

  const filteredPackages = filter === 'All' 
    ? TOUR_PACKAGES 
    : TOUR_PACKAGES.filter(p => p.category === filter);

  return (
    <section id="packages" className="packages-section">
      <div className="container">
        <div className="header-flex">
          <div className="header-text">
            <span className="sub-heading">Our Curated Collection</span>
            <h2 className="main-heading">World-Class Tour Packages</h2>
            <p className="description">Hand-picked destinations and itineraries designed for the discerning traveler.</p>
          </div>
          
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="packages-grid">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="image-container">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="package-image"
                />
                <div className="image-overlay"></div>
                
                {pkg.tag && (
                  <span className="package-tag">{pkg.tag}</span>
                )}
                
                <div className="hover-details">
                  <span className="rating">
                    <svg className="star-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {pkg.rating}
                  </span>
                  <span className="view-details-pill">View Details</span>
                </div>
              </div>

              <div className="card-content">
                <div className="content-meta">
                  <span className="category-label">{pkg.category}</span>
                  <span className="duration-label">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {pkg.duration.split('/')[0]}
                  </span>
                </div>
                
                <h3 className="package-title">{pkg.title}</h3>
                <p className="destination-text">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {pkg.destination}
                </p>

                <div className="card-footer">
                  <div className="price-box">
                    <span className="starting-label">Starting from</span>
                    <span className="price-amount">${pkg.price}</span>
                  </div>
                  <button className="book-button">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPackages.length === 0 && (
          <div className="empty-state">
            <p>No packages found in this category yet. Stay tuned!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesSection;