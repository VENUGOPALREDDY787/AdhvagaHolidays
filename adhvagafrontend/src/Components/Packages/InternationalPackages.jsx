import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateDestinationAlt } from "../../utils/seoHelpers";
import { BASE_URL } from "../../config/api";

const INTERNATIONAL_TYPE = "international";

const getPackageApiCandidates = (queryString) => {
  const rawCandidates = [
    BASE_URL ? `${BASE_URL}/api/packages${queryString}` : "",
    `/api/packages${queryString}`,
    `http://localhost:8080/api/packages${queryString}`,
    `http://localhost:5000/api/packages${queryString}`,
  ].filter(Boolean);

  return Array.from(new Set(rawCandidates));
};

const fetchPackagesWithFallback = async (queryString) => {
  const endpoints = getPackageApiCandidates(queryString);
  let lastError = null;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        lastError = new Error(`Package feed returned status ${response.status}`);
        continue;
      }

      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to load package feed");
};

const matchesPackageType = (pkg, typeLabel, includeLegacyUntyped = false) => {
  const target = typeLabel.toLowerCase();
  const pkgType = (pkg?.type || "").trim().toLowerCase();
  const pkgCategory = (pkg?.category || "").trim().toLowerCase();

  const categoryIsType = pkgCategory === "domestic" || pkgCategory === "international";
  const hasExplicitType = Boolean(pkgType) || categoryIsType;

  if (!hasExplicitType) {
    return includeLegacyUntyped;
  }

  return pkgType === target || pkgCategory === target;
};

const formatInrPrice = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return value ? `Rs ${value}` : "On Request";
  }

  return `Rs ${parsed.toLocaleString("en-IN")}`;
};

const compactText = (value, fallback, limit = 110) => {
  const text = (value || "").trim();
  if (!text) {
    return fallback;
  }

  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit).trimEnd()}...`;
};

const getDurationLabel = (pkg) => {
  if (pkg.duration) {
    return pkg.duration;
  }

  if (pkg.durationDays || pkg.durationNights) {
    return `${pkg.durationNights || 0}N / ${pkg.durationDays || 0}D`;
  }

  return "Flexible Duration";
};

const getGuestLabel = (pkg) => {
  const min = Number(pkg.minGuests);
  const max = Number(pkg.maxGuests);

  if (Number.isFinite(min) && Number.isFinite(max) && min > 0 && max > 0) {
    return `${min}-${max} Guests`;
  }

  return "Custom Group Size";
};

const getCategoryTag = (pkg) => {
  const rawCategory = (pkg.category || "").trim();
  const normalized = rawCategory.toLowerCase();

  if (!rawCategory || normalized === "domestic" || normalized === "international") {
    return "Signature Route";
  }

  return rawCategory;
};

const getPackageId = (pkg) => {
  const id = pkg?._id || pkg?.id;
  return id ? String(id).trim() : "";
};

const PackagesSection = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const openPackageDetails = () => {
    navigate("/packages/reference");
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Fetch all packages so legacy records without `type` are still available.
        const data = await fetchPackagesWithFallback("");
        setPackages(data);
      } catch (_err) {
        setError("PACKAGE_FEED_UNAVAILABLE");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const internationalPackages = useMemo(() => {
    return packages.filter((pkg) => matchesPackageType(pkg, INTERNATIONAL_TYPE, true));
  }, [packages]);

  const categories = useMemo(() => {
    const dynamicCategories = new Set();

    internationalPackages.forEach((pkg) => {
      const category = (pkg.category || "").trim();
      if (!category) {
        return;
      }

      const normalized = category.toLowerCase();
      if (normalized === "domestic" || normalized === "international") {
        return;
      }

      dynamicCategories.add(category);
    });

    return ["All", ...Array.from(dynamicCategories)];
  }, [internationalPackages]);

  const filteredPackages = useMemo(() => {
    if (filter === "All") {
      return internationalPackages;
    }

    const selected = filter.toLowerCase();
    return internationalPackages.filter(
      (pkg) => (pkg.category || "").trim().toLowerCase() === selected
    );
  }, [internationalPackages, filter]);

  const hasLivePackages = !loading && !error && filteredPackages.length > 0;

  return (
    <section id="packages" className="cine-live-packages">
      <div className="cine-container" data-reveal>
        {hasLivePackages && (
          <div className="cine-home-filters" role="list" aria-label="International package categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
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
                key={getPackageId(pkg) || `${pkg.title || "package"}-${pkg.destination || "destination"}`}
                className="cine-live-card"
                role="button"
                tabIndex={0}
                onClick={() => openPackageDetails(pkg)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openPackageDetails(pkg);
                  }
                }}
              >
                <img
                  src={pkg.image}
                  alt={generateDestinationAlt(pkg.destination || pkg.title, "international holiday package")}
                  className="cine-live-card-image"
                  loading="lazy"
                />

                <div className="cine-live-card-body">
                  <div className="cine-live-card-top">
                    <span className="cine-live-card-tag">{getCategoryTag(pkg)}</span>
                    {pkg.rating ? (
                      <span className="cine-live-card-rating">{Number(pkg.rating).toFixed(1)}★</span>
                    ) : null}
                  </div>

                  <h3>{pkg.title || "Untitled Package"}</h3>
                  <p className="cine-live-card-route">{pkg.destination || pkg.location || "International Journey"}</p>
                  <p className="cine-live-card-description">
                    {compactText(pkg.description, "Premium route with immersive experiences and concierge-grade support.")}
                  </p>

                  <div className="cine-live-card-info">
                    <span>{getDurationLabel(pkg)}</span>
                    <span>{pkg.travelSeason || "All Season"}</span>
                    <span>{getGuestLabel(pkg)}</span>
                  </div>

                  <div className="cine-live-card-footer">
                    <strong>{formatInrPrice(pkg.price)}</strong>
                    <button
                      type="button"
                      className="cine-explore-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        openPackageDetails(pkg);
                      }}
                    >
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
