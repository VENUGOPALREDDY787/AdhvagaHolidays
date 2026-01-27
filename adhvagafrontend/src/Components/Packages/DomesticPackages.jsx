import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DomesticPackages.css"; // reuse SAME CSS
import { BASE_URL } from "../../config/api";

const DomesticPackages = () => {
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Luxury",
    "Adventure",
    "Cultural",
    "Relaxation",
    "Family",
  ];

  // 🔹 FETCH PACKAGES
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/packages`);
        if (!res.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await res.json();

        // ✅ ONLY DOMESTIC PACKAGES
        const domesticOnly = data.filter(
          (pkg) => pkg.type === "Domestic", // 👈 change if needed
          // OR pkg.country === "India"
          // OR pkg.region === "Domestic"
        );

        setPackages(domesticOnly);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages =
    filter === "All" ? packages : packages.filter((p) => p.category === filter);

  return (
    <section id="domestic-packages" className="packages-page packages-section">
      <div className="container mb-5">
        <div className="header-flex mt-5">
          {/* <div className="header-text">
            <span className="sub-heading">Explore India</span>
            <h2 className="main-heading">Domestic Packages</h2>
            <p className="description">
              Discover breathtaking destinations across India with expertly
              crafted travel experiences.
            </p>
          </div> */}

          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 Loading */}
        {loading && (
          <div className="empty-state">
            <p>Loading domestic packages...</p>
          </div>
        )}

        {/* 🔹 Error */}
        {error && (
          <div className="empty-state">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="packages-grid">
            {filteredPackages.map((pkg) => (
              <div key={pkg._id} className="package-card">
                <div className="image-container">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="package-image"
                  />
                  <div className="image-overlay"></div>

                  {pkg.tag && <span className="package-tag">{pkg.tag}</span>}

                  <div className="hover-details">
                    <span className="rating">
                      <svg
                        className="star-icon"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
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
                      <svg
                        className="icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {pkg.duration?.split("/")[0]}
                    </span>
                  </div>

                  <h3 className="package-title">{pkg.title}</h3>

                  <p className="destination-text">
                    <svg
                      className="icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {pkg.destination}
                  </p>

                  <div className="card-footer">
                    <div className="price-box">
                      <span className="starting-label">Starting from</span>
                      <span className="price-amount">₹{pkg.price}</span>
                    </div>
                    <button
                      className="book-button"
                      onClick={() => navigate(`/packages/${pkg._id}`)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredPackages.length === 0 && (
          <div className="empty-state">
            <p>No domestic packages available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DomesticPackages;
