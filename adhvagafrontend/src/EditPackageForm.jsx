// import React, { useState } from "react";
// import "./EditPackageForm.css";
// import {
//   ArrowLeft,
//   Save,
//   X,
//   Plus,
//   Trash2,
//   Image as ImageIcon,
// } from "lucide-react";

// const EditPackageForm = ({ pkg, onSave, onCancel, CATEGORIES }) => {
//   const [formData, setFormData] = useState({
//     ...pkg,
//     itinerary: pkg.itinerary || [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "price" || name === "rating"
//           ? parseFloat(value)
//           : value,
//     }));
//   };

//   const handleItineraryChange = (index, value) => {
//     const updated = [...formData.itinerary];
//     updated[index] = value;
//     setFormData({ ...formData, itinerary: updated });
//   };

//   const addItineraryStep = () => {
//     setFormData({
//       ...formData,
//       itinerary: [...formData.itinerary, ""],
//     });
//   };

//   const removeItineraryStep = (index) => {
//     setFormData({
//       ...formData,
//       itinerary: formData.itinerary.filter((_, i) => i !== index),
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="page">
//       <div className="container">
//         <button className="back-btn" onClick={onCancel}>
//           <ArrowLeft size={16} /> Cancel and Return
//         </button>

//         <form onSubmit={handleSubmit}>
//           <div className="card">
//             <div className="card-header">
//               <h1>Edit Package Details</h1>
//               <div className="package-id">Package ID: {pkg.id}</div>
//             </div>

//             <div className="grid">
//               {/* Left */}
//               <div>
//                 <label>Package Title</label>
//                 <input
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   required
//                 />

//                 <label>Destination</label>
//                 <input
//                   name="destination"
//                   value={formData.destination}
//                   onChange={handleChange}
//                   required
//                 />

//                 <div className="row">
//                   <div>
//                     <label>Price ($)</label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label>Rating</label>
//                     <input
//                       type="number"
//                       step="0.1"
//                       min="0"
//                       max="5"
//                       name="rating"
//                       value={formData.rating}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <label>Duration</label>
//                 <input
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Right */}
//               <div>
//                 <label>Cover Image URL</label>
//                 <div className="image-input">
//                   <ImageIcon size={20} />
//                   <input
//                     name="image"
//                     value={formData.image}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="image-preview">
//                   {formData.image ? (
//                     <img src={formData.image} alt="preview" />
//                   ) : (
//                     <span>Image Preview</span>
//                   )}
//                 </div>

//                 <div className="row">
//                   <div>
//                     <label>Category</label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                     >
//                       {CATEGORIES.filter((c) => c !== "All").map((cat) => (
//                         <option key={cat}>{cat}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label>Tag</label>
//                     <input
//                       name="tag"
//                       value={formData.tag || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <label>Description</label>
//             <textarea
//               name="description"
//               rows="4"
//               value={formData.description || ""}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Itinerary */}
//           <div className="card">
//             <div className="card-header">
//               <h2>Edit Itinerary</h2>
//               <button type="button" className="add-btn" onClick={addItineraryStep}>
//                 <Plus size={16} /> Add Day
//               </button>
//             </div>

//             {formData.itinerary.length === 0 && (
//               <div className="empty">No itinerary steps added yet.</div>
//             )}

//             {formData.itinerary.map((step, i) => (
//               <div key={i} className="itinerary-row">
//                 <div className="day">{i + 1}</div>
//                 <input
//                   value={step}
//                   onChange={(e) =>
//                     handleItineraryChange(i, e.target.value)
//                   }
//                 />
//                 <button type="button" onClick={() => removeItineraryStep(i)}>
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Actions */}
//           <div className="actions">
//             <button type="submit" className="save">
//               <Save size={18} /> Save Changes
//             </button>
//             <button type="button" className="cancel" onClick={onCancel}>
//               <X size={18} /> Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPackageForm;
import React, { useState } from "react";
import "./EditPackageForm.css";
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

const EditPackageForm = ({
  pkg = {},
  onSave = () => {},
  onCancel = () => {},
  CATEGORIES = [],
}) => {
  const [formData, setFormData] = useState({
    id: pkg.id || pkg._id || "",
    title: pkg.title || "",
    destination: pkg.destination || "",
    price: pkg.price || 0,
    rating: pkg.rating || 0,
    duration: pkg.duration || "",
    image: pkg.image || null, // File or existing URL
    category: pkg.category || "",
    tag: pkg.tag || "",
    description: pkg.description || "",
    itinerary: pkg.itinerary || [],
  });

  /* ---------------- handlers ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "rating"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleItineraryChange = (index, value) => {
    const updated = [...formData.itinerary];
    updated[index] = value;
    setFormData({ ...formData, itinerary: updated });
  };

  const addItineraryStep = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, ""],
    });
  };

  const removeItineraryStep = (index) => {
    setFormData({
      ...formData,
      itinerary: formData.itinerary.filter((_, i) => i !== index),
    });
  };

  /* ---------------- SUBMIT (API CALL) ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // JWT

      const data = new FormData();
      data.append("title", formData.title);
      data.append("destination", formData.destination);
      data.append("price", formData.price);
      data.append("rating", formData.rating);
      data.append("duration", formData.duration);
      data.append("category", formData.category);
      data.append("tag", formData.tag);
      data.append("description", formData.description);
      data.append("itinerary", JSON.stringify(formData.itinerary));

      // send image ONLY if user selected a new file
      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      const res = await fetch(
        `http://localhost:8080/api/packages/${formData.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const updatedPackage = await res.json();
      onSave(updatedPackage);
    } catch (error) {
      console.error(error);
      alert("Failed to update package");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="page">
      <div className="container">
        <button className="back-btn" onClick={onCancel}>
          <ArrowLeft size={16} /> Cancel and Return
        </button>

        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>Edit Package Details</h1>
              <div className="package-id">Package ID: {formData.id}</div>
            </div>

            <div className="grid">
              {/* LEFT */}
              <div>
                <label>Package Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <label>Destination</label>
                <input
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />

                <div className="row">
                  <div>
                    <label>Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <label>Duration</label>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* RIGHT */}
              <div>
                <label>Cover Image</label>
                <div className="image-input">
                  <ImageIcon size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="image-preview">
                  {formData.image && !(formData.image instanceof File) && (
                    <img src={formData.image} alt="preview" />
                  )}
                </div>

                <div className="row">
                  <div>
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label>Tag</label>
                    <input
                      name="tag"
                      value={formData.tag}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* ITINERARY */}
          <div className="card">
            <div className="card-header">
              <h2>Edit Itinerary</h2>
              <button type="button" className="add-btn" onClick={addItineraryStep}>
                <Plus size={16} /> Add Day
              </button>
            </div>

            {formData.itinerary.length === 0 && (
              <div className="empty">No itinerary steps added yet.</div>
            )}

            {formData.itinerary.map((step, i) => (
              <div key={i} className="itinerary-row">
                <div className="day">{i + 1}</div>
                <input
                  value={step}
                  onChange={(e) =>
                    handleItineraryChange(i, e.target.value)
                  }
                />
                <button type="button" onClick={() => removeItineraryStep(i)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="actions">
            <button type="submit" className="save">
              <Save size={18} /> Save Changes
            </button>
            <button type="button" className="cancel" onClick={onCancel}>
              <X size={18} /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackageForm;
