import React from "react";
import "./Team.css";

export const TEAM = [
  {
    id: "1",
    name: "Arjun Sharma",
    role: "Founder & CEO",
    bio: "A veteran globetrotter who has visited 85 countries and counting. Arjun's vision is to make every holiday a story worth telling.",
    imageUrl: "https://picsum.photos/seed/arjun/400/400",
  },
  {
    id: "2",
    name: "Elena Rodriguez",
    role: "Chief Experience Officer",
    bio: "Elena specializes in luxury curation and cultural immersion, ensuring every traveler feels like a local.",
    imageUrl: "https://picsum.photos/seed/elena/400/400",
  },
  {
    id: "3",
    name: "David Chen",
    role: "Head of Logistics",
    bio: "The master behind the scenes. David ensures that every plane, train, and automobile is perfectly synchronized.",
    imageUrl: "https://picsum.photos/seed/david/400/400",
  },
  {
    id: "4",
    name: "Sarah Jenkins",
    role: "Sustainability Director",
    bio: "Sarah leads our carbon-neutral initiatives and community-led tourism programs worldwide.",
    imageUrl: "https://picsum.photos/seed/sarah/400/400",
  },
];

const Team = () => {
  return (
    <section className="team-section">
      {/* Background Text */}
      <div className="team-bg-text">
        <span>THE TEAM</span>
      </div>

      <div className="team-container">
        {/* Header */}
        <div className="team-header">
          <div className="team-title">
            <div className="team-label">
              <div className="yellow-bar"></div>
              <span>THE ARCHITECTS OF ADVENTURE</span>
            </div>

            <h2>
              Meet <br /> Our <span>Crew</span>
            </h2>
          </div>

          <p className="team-quote">
            "Individually unique, collectively unstoppable. We are the dreamers who turn maps into memories."
          </p>
        </div>

        {/* Grid */}
        <div className="team-grid">
          {TEAM.map((member, idx) => (
            <div
              key={member.id}
              className={`team-card ${idx % 2 !== 0 ? "offset" : ""}`}
            >
              <div className="image-box">
                <img src={member.imageUrl} alt={member.name} />

                {/* Social Icons */}
                <div className="social-icons">
                  <a href="#">
                    {/* LinkedIn */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>

                  <a href="#">
                    {/* Twitter */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12.03 8v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </a>

                  <a href="#">
                    {/* Mail */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 6 12 13 2 6" />
                    </svg>
                  </a>
                </div>

                {/* Name Overlay */}
                <div className="name-overlay">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="bio">
                <p>{member.bio}</p>
              </div>
            </div>
          ))}

          {/* CTA Card */}
          
        </div>
      </div>
    </section>
  );
};

export default Team;
