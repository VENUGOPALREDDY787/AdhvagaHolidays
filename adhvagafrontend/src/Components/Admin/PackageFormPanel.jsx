import React, { useRef, useState } from "react";
import { Plus, Save, Trash2, Upload, X } from "lucide-react";
import { BASE_URL } from "../../config/api";
import "./PackageFormPanel.css";

const categoryOptions = [
  "Relaxation",
  "Cultural",
  "Adventure",
  "Luxury",
  "Family",
  "Transport",
];

const typeOptions = ["Domestic", "International"];

const ensureStringArray = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "").trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const ensureItinerary = (value) => {
  if (!Array.isArray(value)) return [];

  return value.map((item, index) => ({
    day: Number(item?.day) || index + 1,
    title: String(item?.title ?? ""),
    description: String(item?.description ?? ""),
  }));
};

const createInitialFormData = (pkg) => ({
  title: pkg?.title || "",
  location: pkg?.location || "",
  destination: pkg?.destination || "",
  tag: pkg?.tag || "",
  description: pkg?.description || "",
  price: pkg?.price ?? "",
  duration: pkg?.duration || "",
  rating: pkg?.rating ?? 0,
  category: pkg?.category || categoryOptions[0],
  type: pkg?.type || typeOptions[0],
  highlights: ensureStringArray(pkg?.highlights),
  includes: ensureStringArray(pkg?.includes),
  excludes: ensureStringArray(pkg?.excludes),
  itinerary: ensureItinerary(pkg?.itinerary),
});

const PackageFormPanel = ({ package: pkg, onClose, onSave }) => {
  const [formData, setFormData] = useState(createInitialFormData(pkg));
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    pkg?.image
      ? pkg.image.startsWith("http")
        ? pkg.image
        : `${BASE_URL}/${pkg.image}`
      : null,
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = ["price", "rating"];

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? value === ""
          ? ""
          : Number(value)
        : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please choose an image file" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "Image must be less than 5MB" }));
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: null }));
  };

  const addListItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const updateListItem = (field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const removeListItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addItineraryDay = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: prev.itinerary.length + 1,
          title: "",
          description: "",
        },
      ],
    }));
  };

  const updateItinerary = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];
      updated[index] = {
        ...updated[index],
        [field]: field === "day" ? Number(value) : value,
      };
      return { ...prev, itinerary: updated };
    });
  };

  const removeItineraryDay = (index) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, day: i + 1 })),
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.title.trim()) nextErrors.title = "Title is required";
    if (!formData.destination.trim()) {
      nextErrors.destination = "Destination is required";
    }
    if (!formData.category) nextErrors.category = "Category is required";
    if (!formData.type) nextErrors.type = "Type is required";
    if (!pkg && !imageFile && !imagePreview) {
      nextErrors.image = "Image is required for new card";
    }

    return nextErrors;
  };

  const cleanList = (list) => list.map((item) => item.trim()).filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      const payload = {
        ...formData,
        highlights: cleanList(formData.highlights),
        includes: cleanList(formData.includes),
        excludes: cleanList(formData.excludes),
        itinerary: formData.itinerary
          .map((day, index) => ({
            day: Number(day.day) || index + 1,
            title: String(day.title || "").trim(),
            description: String(day.description || "").trim(),
          }))
          .filter((day) => day.title || day.description),
      };

      const jsonFields = ["highlights", "includes", "excludes", "itinerary"];

      Object.entries(payload).forEach(([key, value]) => {
        if (jsonFields.includes(key)) {
          data.append(key, JSON.stringify(value));
          return;
        }

        if (value === undefined || value === null) return;
        data.append(key, value);
      });

      if (imageFile) {
        data.append("image", imageFile);
      }

      const packageId = pkg?._id || pkg?.id;
      const isEdit = Boolean(packageId);

      const endpoint = isEdit
        ? `${BASE_URL}/api/packages/${packageId}`
        : `${BASE_URL}/api/packages`;

      const response = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to save package");
      }

      onSave(result);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "Failed to save package",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStringList = (field, label, placeholder) => (
    <div className="form-group">
      <div className="label-with-action">
        <label>{label}</label>
        <button type="button" className="add-day-btn" onClick={() => addListItem(field)}>
          <Plus size={16} /> Add
        </button>
      </div>

      {formData[field].map((item, index) => (
        <div key={`${field}-${index}`} className="policy-item">
          <input
            type="text"
            value={item}
            placeholder={placeholder}
            onChange={(e) => updateListItem(field, index, e.target.value)}
          />
          <button type="button" className="remove-day-btn" onClick={() => removeListItem(field, index)}>
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );

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
            <form className="form-section" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Cover Image *</label>
                <div className={`image-upload-zone ${errors.image ? "error" : ""}`} onClick={() => fileInputRef.current?.click()}>
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

              <div className="form-group">
                <label>Tag</label>
                <input type="text" name="tag" value={formData.tag} onChange={handleChange} placeholder="e.g., Bestseller" />
              </div>

              <div className="form-group">
                <label>Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className={errors.title ? "error" : ""} />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Destination *</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className={errors.destination ? "error" : ""}
                  />
                  {errors.destination && <span className="error-text">{errors.destination}</span>}
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Type *</label>
                  <select name="type" value={formData.type} onChange={handleChange} className={errors.type ? "error" : ""}>
                    {typeOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errors.type && <span className="error-text">{errors.type}</span>}
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={errors.category ? "error" : ""}
                  >
                    {categoryOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errors.category && <span className="error-text">{errors.category}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" placeholder="0" />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 5D / 4N" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rating</label>
                  <input type="number" name="rating" value={formData.rating} onChange={handleChange} step="0.1" min="0" max="5" />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />
              </div>

              {renderStringList("highlights", "Highlights", "e.g., Scenic valley stay")}
              {renderStringList("includes", "Includes", "e.g., Breakfast and transfers")}
              {renderStringList("excludes", "Excludes", "e.g., Personal expenses")}

              <div className="form-group">
                <div className="label-with-action">
                  <label>Itinerary</label>
                  <button type="button" className="add-day-btn" onClick={addItineraryDay}>
                    <Plus size={16} /> Add Day
                  </button>
                </div>

                {formData.itinerary.map((day, index) => (
                  <div key={`it-${index}`} className="itinerary-item">
                    <input
                      type="number"
                      value={day.day}
                      min="1"
                      onChange={(e) => updateItinerary(index, "day", e.target.value)}
                      style={{ maxWidth: "90px" }}
                    />
                    <input
                      type="text"
                      placeholder="Day title"
                      value={day.title}
                      onChange={(e) => updateItinerary(index, "title", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Day description"
                      value={day.description}
                      onChange={(e) => updateItinerary(index, "description", e.target.value)}
                    />
                    <button type="button" className="remove-day-btn" onClick={() => removeItineraryDay(index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {errors.submit && <div className="submit-error">{errors.submit}</div>}

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

            <div className="preview-section">
              <h3>Live Preview</h3>
              <div className="preview-card">
                {imagePreview && <img src={imagePreview} alt="Preview" />}
                <div className="preview-content">
                  <span className="preview-category">{formData.type} • {formData.category}</span>
                  <h4>{formData.title || "Untitled"}</h4>
                  <p className="preview-dest">{formData.destination || "Destination"}</p>
                  <div className="preview-meta">
                    <span className="preview-price">₹{formData.price || 0}</span>
                    <span className="preview-dur">{formData.duration || "Flexible"}</span>
                  </div>
                  {formData.description && <p className="preview-desc">{formData.description}</p>}
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
