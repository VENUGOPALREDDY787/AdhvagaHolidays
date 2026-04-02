import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateDestinationAlt } from "../../utils/seoHelpers";
import { BASE_URL } from "../../config/api";

const PackagesSection = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const openPackageDetails = (pkg) => {
    navigate(`/packages/${pkg._id}`);
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/packages?type=International`
        );

        if (!response.ok) throw new Error("Failed");

        const data = await response.json();

        // ✅ extra safety filter (in case backend fails)
        const internationalOnly = data.filter(
          (pkg) => pkg.type === "International"
        );

        setPackages(internationalOnly);
      } catch (err) {
        setError("PACKAGE_FEED_UNAVAILABLE");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // ✅ CATEGORY FILTER (UNCHANGED UI)
  const categories = useMemo(() => {
    const set = new Set();
    packages.forEach((pkg) => {
      if (pkg.category) set.add(pkg.category);
    });
    return ["All", ...Array.from(set)];
  }, [packages]);

  // ✅ FILTERED PACKAGES
  const filteredPackages = useMemo(() => {
    if (filter === "All") return packages;

    return packages.filter(
      (pkg) =>
        pkg.category?.toLowerCase() === filter.toLowerCase()
    );
  }, [packages, filter]);

  // ✅ MEMOIZED CHECK
  const hasLivePackages = useMemo(() => {
    return !loading && !error && filteredPackages.length > 0;
  }, [loading, error, filteredPackages]);

  return (
    <section id="packages" className="cine-live-packages">
      <div className="cine-container" data-reveal>

        {hasLivePackages && (
          <div className="cine-home-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={filter === cat ? "active" : ""}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {hasLivePackages && (
          <div className="cine-live-card-grid">
            {filteredPackages.map((pkg) => (
              <article
                key={pkg._id}
                className="cine-live-card"
                onClick={() => openPackageDetails(pkg)}
              >
                <img
                  src={pkg.image}
                  loading="lazy" // ✅ PERFORMANCE BOOST
                  alt={generateDestinationAlt(pkg.destination || pkg.title)}
                  className="cine-live-card-image"
                />

                <div className="cine-live-card-body">
                  <div className="cine-live-card-top">
                    <span className="cine-live-card-tag">
                      {pkg.category || "Package"}
                    </span>
                    {pkg.rating && (
                      <span className="cine-live-card-rating">
                        {pkg.rating}★
                      </span>
                    )}
                  </div>

                  <h3>{pkg.title}</h3>
                  <p className="cine-live-card-route">
                    {pkg.destination || "Location"}
                  </p>

                  <div className="cine-live-card-info">
                    <span>{pkg.duration || "Flexible"}</span>
                    <span>{pkg.travelSeason || "All Season"}</span>
                  </div>

                  <div className="cine-live-card-footer">
                    <strong>₹{pkg.price}</strong>
                    <button className="cine-explore-btn">
                      Explore
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default PackagesSection;