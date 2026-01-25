// import React, { useEffect, useState } from "react";
// import { Plus, Edit2, Trash2, Eye, Search, Filter } from "lucide-react";
// import { BASE_URL } from "../../config/api";
// import PackageFormPanel from "./PackageFormPanel";
// import "./TravelCardsManager.css";

// const TravelCardsManager = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("all");
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingPackage, setEditingPackage] = useState(null);
//   const [previewPackage, setPreviewPackage] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   /* ================= FETCH PACKAGES (BACKEND ONLY) ================= */
//   const fetchPackages = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/packages`);
//       const data = await res.json();

//       const apiPackages = Array.isArray(data) ? data : [];

//       // 🔹 Normalize backend data (UI SAFE)
//       const normalizedPackages = apiPackages.map((pkg) => ({
//         ...pkg,
//         id: pkg._id || pkg.id,
//         category: pkg.type || pkg.category || "Uncategorized", // Domestic / International
//         price: Number(pkg.price) || 0,
//         duration: pkg.duration || "N/A",
//         rating: pkg.rating || 4.5,
//       }));

//       setPackages(normalizedPackages);
//     } catch (error) {
//       console.error("Failed to fetch packages:", error);
//       setPackages([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= ACTION HANDLERS ================= */

//   const handleAddNew = () => {
//     setEditingPackage(null);
//     setIsFormOpen(true);
//   };

//   const handleEdit = (pkg) => {
//     setEditingPackage(pkg);
//     setIsFormOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this travel card?")) return;

//     try {
//       const res = await fetch(`${BASE_URL}/api/packages/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         setPackages((prev) => prev.filter((pkg) => (pkg._id || pkg.id) !== id));
//       }
//     } catch (error) {
//       console.error("Delete failed:", error);
//     }
//   };

//   const handleSave = (savedPackage) => {
//     const normalized = savedPackage?.data || savedPackage;
//     const id = normalized?._id || normalized?.id;

//     if (!id) {
//       alert("Failed to save package. Please try again.");
//       return;
//     }

//     setPackages((prev) => {
//       const exists = prev.some((pkg) => (pkg._id || pkg.id) === id);
//       return exists
//         ? prev.map((pkg) => ((pkg._id || pkg.id) === id ? normalized : pkg))
//         : [normalized, ...prev];
//     });

//     setIsFormOpen(false);
//     setEditingPackage(null);
//   };

//   /* ================= HELPERS ================= */

//   const getImageUrl = (image) => {
//     if (!image) return "";
//     if (image.startsWith("http")) return image;
//     if (image.startsWith("/")) return image;
//     return `${BASE_URL}/${image}`;
//   };

//   const filteredPackages = packages.filter((pkg) => {
//     const matchesSearch =
//       pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pkg.destination?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       filterCategory === "all" || pkg.category === filterCategory;

//     return matchesSearch && matchesCategory;
//   });

//   const categories = [
//     "all",
//     "Domestic",
//     "International",
//     "Relaxation",
//     "Cultural",
//     "Adventure",
//     "Luxury",
//     "Family",
//     "Transport",
//   ];

//   /* ================= RENDER ================= */

//   return (
//     <div className="travel-cards-manager">
//       {/* Header Actions */}
//       <div className="manager-header">
//         <div className="search-filter-group">
//           <div className="search-box">
//             <Search size={18} />
//             <input
//               type="text"
//               placeholder="Search destinations..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="filter-dropdown">
//             <Filter size={18} />
//             <select
//               value={filterCategory}
//               onChange={(e) => setFilterCategory(e.target.value)}
//             >
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat === "all" ? "All Categories" : cat}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <button className="add-card-btn" onClick={handleAddNew}>
//           <Plus size={20} />
//           Add New Card
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="stats-row">
//         <div className="stat-box">
//           <span className="stat-number">{packages.length}</span>
//           <span className="stat-label">Total Cards</span>
//         </div>
//         <div className="stat-box">
//           <span className="stat-number">
//             {new Set(packages.map((p) => p.destination)).size}
//           </span>
//           <span className="stat-label">Destinations</span>
//         </div>
//         <div className="stat-box">
//           <span className="stat-number">
//             $
//             {packages.length > 0
//               ? Math.round(
//                   packages.reduce(
//                     (sum, p) => sum + (Number(p.price) || 0),
//                     0
//                   ) / packages.length
//                 )
//               : 0}
//           </span>
//           <span className="stat-label">Avg. Price</span>
//         </div>
//       </div>

//       {/* Cards Grid */}
//       {loading ? (
//         <div className="loading-state">Loading travel cards...</div>
//       ) : (
//         <div className="cards-grid">
//           {filteredPackages.map((pkg) => (
//             <div key={pkg._id || pkg.id} className="travel-card-item">
//               <div className="card-image-wrapper">
//                 <img src={getImageUrl(pkg.image)} alt={pkg.title} />

//                 <div className="card-overlay">
//                   <button
//                     className="overlay-btn"
//                     onClick={() => setPreviewPackage(pkg)}
//                   >
//                     <Eye size={18} />
//                   </button>
//                   <button
//                     className="overlay-btn edit"
//                     onClick={() => handleEdit(pkg)}
//                   >
//                     <Edit2 size={18} />
//                   </button>
//                   <button
//                     className="overlay-btn delete"
//                     onClick={() => handleDelete(pkg._id || pkg.id)}
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>

//                 <span className="card-category-badge">{pkg.category}</span>
//               </div>

//               <div className="card-details">
//                 <h3 className="card-title">{pkg.title}</h3>
//                 <p className="card-destination">{pkg.destination}</p>
//                 <div className="card-meta">
//                   <span className="card-price">${pkg.price}</span>
//                   <span className="card-duration">{pkg.duration}</span>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filteredPackages.length === 0 && (
//             <div className="empty-state">
//               <p>No travel cards found</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Slide-in Form Panel */}
//       {isFormOpen && (
//         <PackageFormPanel
//           package={editingPackage}
//           onClose={() => {
//             setIsFormOpen(false);
//             setEditingPackage(null);
//           }}
//           onSave={handleSave}
//         />
//       )}

//       {/* Preview Modal */}
//       {previewPackage && (
//         <div
//           className="preview-modal"
//           onClick={() => setPreviewPackage(null)}
//         >
//           <div
//             className="preview-content"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="close-preview"
//               onClick={() => setPreviewPackage(null)}
//             >
//               ×
//             </button>

//             <img
//               src={getImageUrl(previewPackage.image)}
//               alt={previewPackage.title}
//             />

//             <div className="preview-info">
//               <h2>{previewPackage.title}</h2>
//               <p className="preview-destination">
//                 {previewPackage.destination}
//               </p>
//               <p className="preview-description">
//                 {previewPackage.description}
//               </p>

//               <div className="preview-meta">
//                 <span className="preview-price">
//                   ${previewPackage.price}
//                 </span>
//                 <span className="preview-duration">
//                   {previewPackage.duration}
//                 </span>
//                 <span className="preview-rating">
//                   ⭐ {previewPackage.rating}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TravelCardsManager;
import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, Search, Filter } from "lucide-react";
import { BASE_URL } from "../../config/api";
import PackageFormPanel from "./PackageFormPanel";
import "./TravelCardsManager.css";

const TravelCardsManager = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [previewPackage, setPreviewPackage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPackages();
  }, []);

  /* ================= FETCH PACKAGES ================= */
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/packages`);
      const data = await res.json();

      const apiPackages = Array.isArray(data) ? data : [];

      const normalizedPackages = apiPackages.map((pkg) => ({
        ...pkg,
        id: pkg._id || pkg.id,

        // ✅ FIXED: proper fields
        category: pkg.category || "Uncategorized",
        type: pkg.type || "Domestic",

        price: Number(pkg.price) || 0,
        duration: pkg.duration || "N/A",
        rating: pkg.rating || 4.5,
      }));

      setPackages(normalizedPackages);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTION HANDLERS ================= */

  const handleAddNew = () => {
    setEditingPackage(null);
    setIsFormOpen(true);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this travel card?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/packages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setPackages((prev) => prev.filter((pkg) => (pkg._id || pkg.id) !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSave = (savedPackage) => {
    const raw = savedPackage?.data || savedPackage;

    if (!raw?._id && !raw?.id) {
      alert("Failed to save package. Please try again.");
      return;
    }

    const normalized = {
      ...raw,
      id: raw._id || raw.id,
      category: raw.category || "Uncategorized",
      type: raw.type || "Domestic",
      price: Number(raw.price) || 0,
      rating: raw.rating || 4.5,
    };

    setPackages((prev) => {
      const exists = prev.some((pkg) => (pkg._id || pkg.id) === normalized.id);
      return exists
        ? prev.map((pkg) =>
            (pkg._id || pkg.id) === normalized.id ? normalized : pkg
          )
        : [normalized, ...prev];
    });

    setIsFormOpen(false);
    setEditingPackage(null);
  };

  /* ================= HELPERS ================= */

  const getImageUrl = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return image;
    return `${BASE_URL}/${image}`;
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" ||
      pkg.category === filterCategory ||
      pkg.type === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    "Domestic",
    "International",
    "Relaxation",
    "Cultural",
    "Adventure",
    "Luxury",
    "Family",
    "Transport",
  ];

  /* ================= RENDER ================= */

  return (
    <div className="travel-cards-manager">
      {/* Header Actions */}
      <div className="manager-header">
        <div className="search-filter-group">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-dropdown">
            <Filter size={18} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="add-card-btn" onClick={handleAddNew}>
          <Plus size={20} />
          Add New Card
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-number">{packages.length}</span>
          <span className="stat-label">Total Cards</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">
            {new Set(packages.map((p) => p.destination?.trim())).size}
          </span>
          <span className="stat-label">Destinations</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">
            $
            {packages.length > 0
              ? Math.round(
                  packages.reduce((sum, p) => sum + (Number(p.price) || 0), 0) /
                    packages.length
                )
              : 0}
          </span>
          <span className="stat-label">Avg. Price</span>
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="loading-state">Loading travel cards...</div>
      ) : (
        <div className="cards-grid">
          {filteredPackages.map((pkg) => (
            <div key={pkg._id || pkg.id} className="travel-card-item">
              <div className="card-image-wrapper">
                <img src={getImageUrl(pkg.image)} alt={pkg.title} />

                <div className="card-overlay">
                  <button
                    className="overlay-btn"
                    onClick={() => setPreviewPackage(pkg)}
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="overlay-btn edit"
                    onClick={() => handleEdit(pkg)}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="overlay-btn delete"
                    onClick={() => handleDelete(pkg._id || pkg.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* UI SAME – data fixed */}
                <span className="card-category-badge">
                  {pkg.type} • {pkg.category}
                </span>
              </div>

              <div className="card-details">
                <h3 className="card-title">{pkg.title}</h3>
                <p className="card-destination">{pkg.destination}</p>
                <div className="card-meta">
                  <span className="card-price">${pkg.price}</span>
                  <span className="card-duration">{pkg.duration}</span>
                </div>
              </div>
            </div>
          ))}

          {filteredPackages.length === 0 && (
            <div className="empty-state">
              <p>No travel cards found</p>
            </div>
          )}
        </div>
      )}

      {/* Slide-in Form Panel */}
      {isFormOpen && (
        <PackageFormPanel
          package={editingPackage}
          onClose={() => {
            setIsFormOpen(false);
            setEditingPackage(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Preview Modal */}
      {previewPackage && (
        <div className="preview-modal" onClick={() => setPreviewPackage(null)}>
          <div
            className="preview-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-preview"
              onClick={() => setPreviewPackage(null)}
            >
              ×
            </button>

            <img
              src={getImageUrl(previewPackage.image)}
              alt={previewPackage.title}
            />

            <div className="preview-info">
              <h2>{previewPackage.title}</h2>
              <p className="preview-destination">
                {previewPackage.destination}
              </p>
              <p className="preview-description">
                {previewPackage.description}
              </p>

              <div className="preview-meta">
                <span className="preview-price">
                  ${previewPackage.price}
                </span>
                <span className="preview-duration">
                  {previewPackage.duration}
                </span>
                <span className="preview-rating">
                  ⭐ {previewPackage.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelCardsManager;
