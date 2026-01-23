import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditPackageForm.css";
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

const CATEGORIES = [
  "Relaxation",
  "Cultural",
  "Adventure",
  "Luxury",
  "Family",
  "Transport",
];

const EditPackageForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/packages/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setFormData({
          id: data._id,
          title: data.title || "",
          destination: data.destination || "",
          price: data.price || 0,
          rating: data.rating || 0,
          duration: data.duration || "",
          image: data.image || data.images?.[0] || null,
          category: data.category || "",
          tag: data.tag || "",
          description: data.description || "",
          itinerary: data.itinerary?.length
            ? data.itinerary
            : [{ day: 1, title: "", description: "" }],
        });
      } catch (err) {
        alert("Failed to load package");
      }
    };

    fetchPackage();
  }, [id]);

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

  const handleItineraryChange = (index, field, value) => {
    const updated = [...formData.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, itinerary: updated });
  };

  const addItineraryStep = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        { day: formData.itinerary.length + 1, title: "", description: "" },
      ],
    });
  };

  const removeItineraryStep = (index) => {
    const updated = formData.itinerary
      .filter((_, i) => i !== index)
      .map((item, idx) => ({ ...item, day: idx + 1 }));

    setFormData({ ...formData, itinerary: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "itinerary") {
          data.append("itinerary", JSON.stringify(value));
        } else if (key !== "image") {
          data.append(key, value);
        }
      });

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      const res = await fetch(
        `http://localhost:8080/api/packages/${formData.id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        }
      );

      if (!res.ok) throw new Error("Update failed");
      navigate(-1);
    } catch {
      alert("Failed to update package");
    }
  };

  if (!formData) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div className="epf-page">
      <div className="container">
        <button className="epf-back-btn pt-5" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Cancel and Return
        </button>

        <form onSubmit={handleSubmit}>
          
          <div className="row">
          <div className="epf-card">
            <div className="epf-card-header">
              <h1>Edit Package Details</h1>
              <div className="epf-package-id">Package ID: {formData.id}</div>
            </div>

            <div className="epf-grid">
              <div>
                <label className="form-label"><b>Package Title</b></label>
                <input name="title" value={formData.title} onChange={handleChange} className="form-control text-muted"/>

                <label className="form-label">Destination</label>
                <input name="destination" value={formData.destination} onChange={handleChange}  className="form-control text-muted"/>

                <div className="epf-row">
                  <div>
                    <label className="form-label">Price ($)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange}  className="form-control text-muted" />
                  </div>
                  <div>
                    <label className="form-label">Rating</label>
                    <input type="number" step="0.1" min="0" max="5" name="rating" value={formData.rating} onChange={handleChange}  className="form-control text-muted" />
                  </div>
                </div>

                <label className="form-label">Duration</label>
                <input name="duration" value={formData.duration} onChange={handleChange}  className="form-control text-muted"/>
              </div>

              <div>
                <label className="form-label">Cover Image</label>
                <div className="epf-image-input">
                  <ImageIcon size={20} />
                  <input type="file" accept="image/*" onChange={handleImageChange}  className="form-control text-muted"/>
                </div>

                <div className="epf-image-preview">
                  {formData.image && !(formData.image instanceof File) && (
                    <img src={formData.image} alt="preview" />
                  )}
                </div>

                <div className="epf-row">
                  <div>
                    <label className="form-label">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="form-control">
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Tag</label>
                    <input name="tag" value={formData.tag} onChange={handleChange}  className="form-control text-muted"/>
                  </div>
                </div>
              </div>
            </div>

            <label className="form-label">Description</label>
            <textarea rows="4" name="description" value={formData.description} onChange={handleChange}  className="form-control text-muted" />
          </div>

          <div className="epf-card">
            <div className="epf-card-header">
              <h2>Edit Itinerary</h2>
              <button type="button" className="epf-add-btn" onClick={addItineraryStep}>
                <Plus size={16} /> Add Day
              </button>
            </div>

            {formData.itinerary.map((step, i) => (
              <div key={i} className="epf-itinerary-row">
                <div className="epf-day m">{i + 1}</div>
                <input value={step.title} onChange={(e) => handleItineraryChange(i, "title", e.target.value)}  className="form-control "/>
                <input value={step.description} onChange={(e) => handleItineraryChange(i, "description", e.target.value)}   className="form-control"/>
                <button type="button" onClick={() => removeItineraryStep(i)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          </div>
          <div className="row">f
          <div className="epf-actions">
            <button type="submit" className="epf-save">
              <Save size={18} /> Save Changes
            </button>
            <button type="button" className="epf-cancel" onClick={() => navigate(-1)}>
              <X size={18} /> Cancel
            </button>
          </div>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default EditPackageForm;
