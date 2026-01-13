import React from 'react';
import './BlogsPage.css';

const BLOG_POSTS = [
  {
    id: '1',
    title: '10 Hidden Gems in Dubai You Haven’t Seen Yet',
    excerpt: 'Beyond the Burj Khalifa, Dubai holds secret desert escapes and heritage neighborhoods that will steal your heart...',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    author: 'Elena Wright',
    date: 'Oct 12, 2024',
    category: 'Destinations'
  },
  {
    id: '2',
    title: 'Packing for Europe: The Ultimate Carry-On Guide',
    excerpt: 'How to fit two weeks of stylish Parisian and Alpine outfits into one tiny bag without breaking a sweat...',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800',
    author: 'Marcello Rossi',
    date: 'Nov 05, 2024',
    category: 'Travel Tips'
  },
  {
    id: '3',
    title: 'The Rise of Slow Travel: Why We Love Kerala',
    excerpt: 'In a world that moves too fast, the backwaters of Kerala offer a rhythmic, peaceful alternative to traditional sightseeing...',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
    author: 'Aarav Sharma',
    date: 'Dec 01, 2024',
    category: 'Lifestyle'
  }
];

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah & Mark',
    location: 'London, UK',
    comment: 'Adhvaga planned our honeymoon to Bali and it was absolutely magical. Every hotel was handpicked, and the Jain food arrangements were flawless.',
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    trip: 'Bali Honeymoon'
  },
  {
    id: '2',
    name: 'The Kapoor Family',
    location: 'New Delhi, India',
    comment: 'Traveling with elderly parents can be stressful, but the "Relaxed Pace" itinerary created for us in Switzerland was perfect.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    trip: 'Swiss Alps Family Tour'
  },
  {
    id: '3',
    name: 'Julian Chen',
    location: 'Singapore',
    comment: 'I requested a high-adventure solo trip to Kashmir and boy, did they deliver. Paragliding over Dal Lake was the highlight of my year.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    trip: 'Kashmir Adventure'
  }
];

const BlogsPage = () => {
  return (
    <div className="blogs-container">
      {/* Hero Section */}
      <div className="max-width-wrapper">
        <div className="hero-card">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200" 
            className="hero-bg-image" 
            alt="Background"
          />
          <div className="hero-content">
            <span className="badge-yellow">Our Journal</span>
            <h1 className="hero-title">
              TRAVEL STORIES & <br /> <span className="text-yellow">HAPPY CLIENTS</span>
            </h1>
            <p className="hero-description">
              Insights from the road and heartfelt experiences from our global family of travelers.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="max-width-wrapper" style={{ marginBottom: '8rem' }}>
        <div className="section-header">
          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 900, textTransform: 'uppercase' }}>Voices of Adhvaga</h2>
            <p style={{ color: '#78716c', marginTop: '0.5rem' }}>Real people, real adventures, real joy.</p>
          </div>
          <div className="rating-badge">
            <i className="fa-solid fa-star"></i>
            4.9/5 Average Rating from 1000+ Guests
          </div>
        </div>

        <div className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="user-profile">
                <img src={t.image} alt={t.name} className="profile-img" />
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{t.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: '#a8a29e', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.location}</p>
                </div>
              </div>
              <div style={{ color: '#facc15', marginBottom: '1rem', display: 'flex', gap: '4px' }}>
                {[...Array(t.rating)].map((_, i) => <i key={i} className="fa-solid fa-star" style={{ fontSize: '0.75rem' }}></i>)}
              </div>
              <p style={{ color: '#57534e', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.5rem' }}>"{t.comment}"</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #f5f5f4', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', color: '#a8a29e' }}>
                Trip: {t.trip}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs Section */}
      <section className="max-width-wrapper">
        <h2 style={{ fontSize: '1.875rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          The Travel Edit
          <div style={{ height: '2px', backgroundColor: '#e7e5e4', flex: 1 }}></div>
        </h2>

        <div className="blog-grid">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image-wrapper">
                <img src={post.image} alt={post.title} />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span style={{ background: 'rgba(255,255,255,0.9)', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="blog-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#a8a29e', marginBottom: '1rem' }}>
                  <span>{post.author}</span>
                  <div style={{ width: '4px', height: '4px', backgroundColor: '#d6d3d1', borderRadius: '50%' }}></div>
                  <span>{post.date}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem', transition: 'color 0.3s' }}>
                  {post.title}
                </h3>
                <p style={{ color: '#78716c', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {post.excerpt}
                </p>
                <button className="read-more-btn">
                  Read Story <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="max-width-wrapper">
        <div className="cta-banner">
          <div className="cta-text">
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'black', marginBottom: '1rem' }}>WANT TO BE OUR NEXT <br /> SUCCESS STORY?</h2>
            <p style={{ color: 'rgba(0,0,0,0.7)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your dream trip is just one custom plan away.</p>
          </div>
          <button className="cta-button">
            START PLANNING NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;