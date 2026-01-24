import React, { useState, useRef } from "react";
import { X, Upload, Plus, Trash2, Save } from "lucide-react";
import { BASE_URL } from "../../config/api";
import "./PackageFormPanel.css";

const PackageFormPanel = ({ package: pkg, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: pkg?.title || "",
    destination: pkg?.destination || "",
    price: pkg?.price || 0,
    duration: pkg?.duration || "",
    rating: pkg?.rating || 4.5,
    category: pkg?.category || "Domestic",
    description: pkg?.description || "",
    tag: pkg?.tag || "",
    itinerary: pkg?.itinerary || [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    pkg?.image ? (pkg.image.startsWith("http") ? pkg.image : `${BASE_URL}/${pkg.image}`) : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const categories = [
    "Domestic",
    "International"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image must be less than 5MB" }));
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addItineraryDay = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, ""],
    }));
  };

  const updateItineraryDay = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];
      updated[index] = value;
      return { ...prev, itinerary: updated };
    });
  };

  const removeItineraryDay = (index) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.destination.trim()) newErrors.destination = "Destination is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    // Only require image for new packages (when pkg is null/undefined and no image file selected)
    if (!pkg && !imageFile && !imagePreview) newErrors.image = "Image is required for new cards";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted, formData:", formData);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      console.error("Validation errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "itinerary") {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (imageFile) {
        data.append("image", imageFile);
      } else if (pkg?.image) {
        // Preserve existing image when no new upload
        data.append("image", pkg.image);
      }

      const hasDbId = Boolean(pkg?._id);
      const hasNonStaticId = Boolean(pkg?.id && !String(pkg.id).startsWith("static-"));
      const useUpdate = hasDbId || hasNonStaticId;

      const endpoint = useUpdate
        ? `${BASE_URL}/api/packages/${pkg._id || pkg.id}`
        : `${BASE_URL}/api/packages`;

      console.log("Submitting to:", endpoint, "Method:", useUpdate ? "PUT" : "POST");

      const res = await fetch(endpoint, {
        method: useUpdate ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();
      console.log("Response:", res.status, result);

      if (!res.ok) {
        throw new Error(result.message || "Failed to save");
      }

      console.log("Save successful, calling onSave with:", result);
      onSave(result);
    } catch (error) {
      console.error("Save error:", error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-panel-overlay" onClick={onClose}>
      <div className="form-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h2>{pkg ? "Edit Travel Card" : "Create New Travel Card"}</h2>
          <button className="close-panel-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="panel-body">
          <div className="panel-split">
            {/* Left: Form */}
            <form className="form-section" onSubmit={handleSubmit}>
              {/* Image Upload */}
              <div className="form-group">
                <label>Cover Image *</label>
                <div
                  className={`image-upload-zone ${errors.image ? "error" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="upload-preview" />
                  ) : (
                    <div className="upload-placeholder">
                      <Upload size={32} />
                      <p>Drag & drop or click to upload</p>
                      <span>Max 5MB • JPG, PNG</span>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
                {errors.image && <span className="error-text">{errors.image}</span>}
              </div>

              {/* Title */}
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? "error" : ""}
                  placeholder="e.g., Luxury Maldives Escape"
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              {/* Destination */}
              <div className="form-group">
                <label>Destination *</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className={errors.destination ? "error" : ""}
                  placeholder="e.g., Maldives"
                />
                {errors.destination && <span className="error-text">{errors.destination}</span>}
              </div>

              {/* Price & Duration */}
              <div className="form-row">
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={errors.price ? "error" : ""}
                    placeholder="2999"
                  />
                  {errors.price && <span className="error-text">{errors.price}</span>}
                </div>

                <div className="form-group">
                  <label>Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className={errors.duration ? "error" : ""}
                    placeholder="7 Days / 6 Nights"
                  />
                </div>
              </div>

              {/* Category & Rating */}
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <input
                    type="number"
                    name="rating"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Tag */}
              <div className="form-group">
                <label>Tag (Optional)</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  placeholder="e.g., Bestseller, New"
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the travel package..."
                />
              </div>

              {/* Itinerary */}
              <div className="form-group">
                <div className="label-with-action">
                  <label>Itinerary</label>
                  <button type="button" className="add-day-btn" onClick={addItineraryDay}>
                    <Plus size={16} /> Add Day
                  </button>
                </div>

                {formData.itinerary.map((day, index) => (
                  <div key={index} className="itinerary-item">
                    <span className="day-number">Day {index + 1}</span>
                    <input
                      type="text"
                      value={day}
                      onChange={(e) => updateItineraryDay(index, e.target.value)}
                      placeholder="Describe activities..."
                    />
                    <button
                      type="button"
                      className="remove-day-btn"
                      onClick={() => removeItineraryDay(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {errors.submit && <div className="submit-error">{errors.submit}</div>}

              {/* Actions */}
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={isSubmitting}>
                  <Save size={18} />
                  {isSubmitting ? "Saving..." : pkg ? "Update Card" : "Create Card"}
                </button>
              </div>
            </form>

            {/* Right: Live Preview */}
            <div className="preview-section">
              <h3>Live Preview</h3>
              <div className="preview-card">
                {imagePreview && <img src={imagePreview} alt="Preview" />}
                <div className="preview-content">
                  <span className="preview-category">{formData.category}</span>
                  <h4>{formData.title || "Untitled"}</h4>
                  <p className="preview-dest">{formData.destination || "Destination"}</p>
                  <div className="preview-meta">
                    <span className="preview-price">${formData.price || "0"}</span>
                    <span className="preview-dur">{formData.duration || "Duration"}</span>
                  </div>
                  {formData.description && (
                    <p className="preview-desc">{formData.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageFormPanel;