import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateDestinationAlt } from "../../utils/seoHelpers";
import { BASE_URL } from "../../config/api";

const formatInrPrice = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return value ? `Rs ${value}` : "On Request";
  return `Rs ${parsed.toLocaleString("en-IN")}`;
};

const compactText = (value, fallback, limit = 110) => {
  const text = (value || "").trim();
  if (!text) return fallback;
  if (text.length <= limit) return text;
  return `${text.slice(0, limit).trimEnd()}...`;
};

const getDurationLabel = (pkg) => {
  if (pkg.duration) return pkg.duration;
  if (pkg.durationDays || pkg.durationNights) {
    return `${pkg.durationNights || 0}N / ${pkg.durationDays || 0}D`;
  }
  return "Flexible Duration";
};

const getGuestLabel = (pkg) => {
  const min = Number(pkg.minGuests);
  const max = Number(pkg.maxGuests);
  if (min > 0 && max > 0) return `${min}-${max} Guests`;
  return "Custom Group Size";
};

const getCategoryTag = (pkg) => {
  return pkg.category || "Signature Route";
};

const DomesticPackages = () => {
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ FIXED (ONLY CHANGE)
  const openPackageDetails = (pkg) => {
    navigate(`/packages/${pkg._id}`);
  };

  // ✅ ONLY ONE CLEAN API CALL
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/packages`);
        if (!res.ok) throw new Error();

        const data = await res.json();
        setPackages(data);
      } catch {
        setError("PACKAGE_FEED_UNAVAILABLE");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // ✅ SIMPLE CATEGORY FILTER (UI SAME)
  const categories = useMemo(() => {
    const set = new Set();
    packages.forEach((pkg) => {
      if (pkg.category) set.add(pkg.category);
    });
    return ["All", ...Array.from(set)];
  }, [packages]);

  const filteredPackages = useMemo(() => {
    if (filter === "All") return packages;
    return packages.filter(
      (pkg) =>
        pkg.category &&
        pkg.category.toLowerCase() === filter.toLowerCase()
    );
  }, [packages, filter]);

  const hasLivePackages = !loading && !error && filteredPackages.length > 0;

  return (
    <section id="domestic-packages" className="cine-live-packages">
      <div className="cine-container" data-reveal>

        {/* FILTER UI (UNCHANGED) */}
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

        {/* CARDS (UNCHANGED UI) */}
        {hasLivePackages && (
          <div className="cine-live-card-grid">
            {filteredPackages.map((pkg) => (
              <article
                key={pkg._id}
                className="cine-live-card"
                onClick={() => openPackageDetails(pkg)} // ✅ SAME UI, WORKING NAV
              >
                <img
                  src={pkg.image}
                  alt={generateDestinationAlt(
                    pkg.destination || pkg.title,
                    "domestic holiday package"
                  )}
                  className="cine-live-card-image"
                />

                <div className="cine-live-card-body">
                  <div className="cine-live-card-top">
                    <span className="cine-live-card-tag">
                      {getCategoryTag(pkg)}
                    </span>
                    {pkg.rating && (
                      <span className="cine-live-card-rating">
                        {Number(pkg.rating).toFixed(1)}★
                      </span>
                    )}
                  </div>

                  <h3>{pkg.title || "Untitled Package"}</h3>
                  <p className="cine-live-card-route">
                    {pkg.destination || pkg.location || "Domestic Journey"}
                  </p>

                  <p className="cine-live-card-description">
                    {compactText(
                      pkg.description,
                      "Tailor-made route with curated stays and local experiences."
                    )}
                  </p>

                  <div className="cine-live-card-info">
                    <span>{getDurationLabel(pkg)}</span>
                    <span>{pkg.travelSeason || "All Season"}</span>
                    <span>{getGuestLabel(pkg)}</span>
                  </div>

                  <div className="cine-live-card-footer">
                    <strong>{formatInrPrice(pkg.price)}</strong>
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

export default DomesticPackages;