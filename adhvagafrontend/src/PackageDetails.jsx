// import React, { useState } from "react";
// import "./PackageDetails.css";

// const PackageDetails = ({ pkg, onBack }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     date: "",
//     guests: 1,
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//   };

//   if (isSubmitted) {
//     return (
//       <div className="container py-5 text-center">
//         <div className="success-icon mx-auto mb-4">
//           ✓
//         </div>

//         <h2 className="fw-bold mb-3">Booking Requested!</h2>
//         <p className="text-muted mb-4">
//           Thanks <strong>{formData.name}</strong>, we've received your request for
//           the <strong>{pkg.name}</strong> package. Our Adhvaga Holidays team will
//           contact you within 24 hours.
//         </p>

//         <button className="btn btn-warning px-4 py-2 fw-bold" onClick={onBack}>
//           Back to Explorer
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-5">
//       <div className="row g-5">
//         {/* LEFT COLUMN */}
//         <div className="col-lg-8">
//           <button className="btn btn-link back-btn mb-4" onClick={onBack}>
//             ← Back to Packages
//           </button>

//           <h1 className="fw-bold display-5 mb-3">{pkg.name}</h1>

//           <div className="d-flex flex-wrap gap-3 mb-4">
//             <span className="badge bg-warning text-dark p-3 fs-6">
//               Avg. Cost: ${pkg.price}
//             </span>
//             <span className="badge bg-light text-dark p-3 fs-6">
//               ⏱ {pkg.duration}
//             </span>
//             <span className="badge bg-light text-dark p-3 fs-6">
//               📍 {pkg.destination}
//             </span>
//           </div>

//           <img
//             src={pkg.image}
//             alt={pkg.name}
//             className="img-fluid rounded-4 shadow mb-5"
//           />

//           <section className="mb-5">
//             <h3 className="fw-bold mb-3">Experience Overview</h3>
//             <p className="text-muted">{pkg.description}</p>
//           </section>

//           <section className="mb-5">
//             <h3 className="fw-bold mb-4">Highlights</h3>
//             <div className="row g-3">
//               {pkg.highlights.map((h, i) => (
//                 <div className="col-md-6" key={i}>
//                   <div className="highlight-card">
//                     ✓ {h}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="mb-5">
//             <h3 className="fw-bold mb-4">The Journey</h3>
//             {pkg.itinerary.map((day) => (
//               <div key={day.day} className="itinerary-item">
//                 <span className="day-label">Day {day.day}</span>
//                 <h5 className="fw-bold">{day.title}</h5>
//                 <p className="text-muted">{day.description}</p>
//               </div>
//             ))}
//           </section>

//           <div className="row mb-5">
//             <div className="col-md-6">
//               <h5 className="fw-bold mb-3">Inclusions</h5>
//               <ul className="list-unstyled">
//                 {pkg.includes.map((i, idx) => (
//                   <li key={idx}>✔ {i}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="col-md-6">
//               <h5 className="fw-bold mb-3">Exclusions</h5>
//               <ul className="list-unstyled">
//                 {pkg.excludes.map((i, idx) => (
//                   <li key={idx}>✖ {i}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="col-lg-4">
//           <div className="booking-card sticky-top">
//             <h4 className="fw-bold mb-1">Book This Trip</h4>
//             <p className="text-muted small mb-4">
//               Personalized travel planning with Adhvaga.
//             </p>

//             <form onSubmit={handleSubmit}>
//               <input
//                 required
//                 className="form-control mb-3"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />

//               <input
//                 required
//                 type="email"
//                 className="form-control mb-3"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />

//               <div className="row mb-3">
//                 <div className="col">
//                   <input
//                     required
//                     type="date"
//                     className="form-control"
//                     value={formData.date}
//                     onChange={(e) =>
//                       setFormData({ ...formData, date: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="col">
//                   <input
//                     required
//                     type="number"
//                     min="1"
//                     className="form-control"
//                     value={formData.guests}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         guests: parseInt(e.target.value),
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="d-flex justify-content-between fw-bold mb-3">
//                 <span>Total Price</span>
//                 <span>${pkg.price * formData.guests}</span>
//               </div>

//               <button className="btn btn-warning w-100 fw-bold py-3">
//                 Confirm Booking →
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageDetails;

import React, { useState, useEffect } from "react"; // ✅ added useEffect
import "./PackageDetails.css";

const PackageDetails = ({ pkg: initialPkg, onBack }) => {

  // ✅ ADDED: local pkg state for backend data
  const [pkg, setPkg] = useState(initialPkg || null);
  const [loading, setLoading] = useState(!initialPkg);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guests: 1,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ ADDED: fetch package from backend
  useEffect(() => {
    if (!pkg) {
      fetch("http://localhost:8080/api/packages/6965e74668a88de2a6eec4bc")
        .then((res) => res.json())
        .then((data) => {
          setPkg(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch package:", err);
          setLoading(false);
        });
    }
  }, [pkg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // ✅ ADDED: loading guard (prevents crash)
  if (loading || !pkg) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" />
        <p className="mt-3">Loading package details...</p>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container py-5 text-center">
        <div className="success-icon mx-auto mb-4">✓</div>

        <h2 className="fw-bold mb-3">Booking Requested!</h2>
        <p className="text-muted mb-4">
          Thanks <strong>{formData.name}</strong>, we've received your request for
          the <strong>{pkg.name}</strong> package. Our Adhvaga Holidays team will
          contact you within 24 hours.
        </p>

        <button className="btn btn-warning px-4 py-2 fw-bold" onClick={onBack}>
          Back to Explorer
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* LEFT COLUMN */}
        <div className="col-lg-8">
          <button className="btn btn-link back-btn mb-4" onClick={onBack}>
            ← Back to Packages
          </button>

          <h1 className="fw-bold display-5 mb-3">{pkg.name}</h1>

          <div className="d-flex flex-wrap gap-3 mb-4">
            <span className="badge bg-warning text-dark p-3 fs-6">
              Avg. Cost: ${pkg.price}
            </span>
            <span className="badge bg-light text-dark p-3 fs-6">
              ⏱ {pkg.duration}
            </span>
            <span className="badge bg-light text-dark p-3 fs-6">
              📍 {pkg.destination}
            </span>
          </div>

          <img
            src={pkg.image}
            alt={pkg.name}
            className="img-fluid rounded-4 shadow mb-5"
          />

          <section className="mb-5">
            <h3 className="fw-bold mb-3">Experience Overview</h3>
            <p className="text-muted">{pkg.description}</p>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-4">Highlights</h3>
            <div className="row g-3">
              {pkg.highlights?.map((h, i) => (
                <div className="col-md-6" key={i}>
                  <div className="highlight-card">✓ {h}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-5">
            <h3 className="fw-bold mb-4">The Journey</h3>
            {pkg.itinerary?.map((day) => (
              <div key={day.day} className="itinerary-item">
                <span className="day-label">Day {day.day}</span>
                <h5 className="fw-bold">{day.title}</h5>
                <p className="text-muted">{day.description}</p>
              </div>
            ))}
          </section>

          <div className="row mb-5">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Inclusions</h5>
              <ul className="list-unstyled">
                {pkg.includes?.map((i, idx) => (
                  <li key={idx}>✔ {i}</li>
                ))}
              </ul>
            </div>

            <div className="col-md-6">
              <h5 className="fw-bold mb-3">Exclusions</h5>
              <ul className="list-unstyled">
                {pkg.excludes?.map((i, idx) => (
                  <li key={idx}>✖ {i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-lg-4">
          <div className="booking-card sticky-top">
            <h4 className="fw-bold mb-1">Book This Trip</h4>
            <p className="text-muted small mb-4">
              Personalized travel planning with Adhvaga.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                required
                className="form-control mb-3"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                required
                type="email"
                className="form-control mb-3"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <div className="row mb-3">
                <div className="col">
                  <input
                    required
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div className="col">
                  <input
                    required
                    type="number"
                    min="1"
                    className="form-control"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guests: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total Price</span>
                <span>${pkg.price * formData.guests}</span>
              </div>

              <button className="btn btn-warning w-100 fw-bold py-3">
                Confirm Booking →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;

