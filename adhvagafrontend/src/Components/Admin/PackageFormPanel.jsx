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

    // ✅ FIXED
    category: pkg?.category || "Domestic", // enum field
    type: pkg?.type || "Domestic", // Domestic / International

    description: pkg?.description || "",
    tag: pkg?.tag || "",

    // ✅ FIXED (arrays)
    highlights: pkg?.highlights || [],
    includes: pkg?.includes || [],
    excludes: pkg?.excludes || [],

    // ✅ FIXED structure
    itinerary: pkg?.itinerary || [],

    // ===== NEW FIELDS =====
    durationDays: pkg?.durationDays || 0,
    durationNights: pkg?.durationNights || 0,
    travelSeason: pkg?.travelSeason || "",
    validityStart: pkg?.validityStart ? pkg.validityStart.split('T')[0] : "",
    validityEnd: pkg?.validityEnd ? pkg.validityEnd.split('T')[0] : "",
    minGuests: pkg?.minGuests || 1,
    maxGuests: pkg?.maxGuests || 10,
    hotelCategoryPricing: pkg?.hotelCategoryPricing || [],
    hotelDetails: pkg?.hotelDetails || [],
    cancellationPolicy: pkg?.cancellationPolicy || [],
    bookingPolicy: pkg?.bookingPolicy || [],
    importantNotes: pkg?.importantNotes || [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    pkg?.image
      ? pkg.image.startsWith("http")
        ? pkg.image
        : `${BASE_URL}/${pkg.image}`
      : null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const categories = ["Domestic", "International"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "type") {
        return { ...prev, type: value, category: value };
      }

      return {
        ...prev,
        [name]:
          name === "price" || name === "rating" ? parseFloat(value) || 0 : value,
      };
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image must be less than 5MB",
        }));
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
    itinerary: [
      ...prev.itinerary,
      { day: prev.itinerary.length + 1, title: "", description: "" },
    ],
  }));
};

const updateItineraryDay = (index, field, value) => {
  setFormData((prev) => {
    const updated = [...prev.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    return { ...prev, itinerary: updated };
  });
};

const removeItineraryDay = (index) => {
  setFormData((prev) => ({
    ...prev,
    itinerary: prev.itinerary.filter((_, i) => i !== index),
  }));
};

// ===== HOTEL CATEGORY PRICING HELPERS =====
const addHotelCategoryPricing = () => {
  setFormData((prev) => ({
    ...prev,
    hotelCategoryPricing: [
      ...prev.hotelCategoryPricing,
      { category: "A", pricePerPerson: 0, description: "" },
    ],
  }));
};

const updateHotelCategoryPricing = (index, field, value) => {
  setFormData((prev) => {
    const updated = [...prev.hotelCategoryPricing];
    updated[index] = { ...updated[index], [field]: value };
    return { ...prev, hotelCategoryPricing: updated };
  });
};

const removeHotelCategoryPricing = (index) => {
  setFormData((prev) => ({
    ...prev,
    hotelCategoryPricing: prev.hotelCategoryPricing.filter((_, i) => i !== index),
  }));
};

// ===== HOTEL DETAILS HELPERS =====
const addHotelDetail = () => {
  setFormData((prev) => ({
    ...prev,
    hotelDetails: [
      ...prev.hotelDetails,
      { city: "", hotelName: "", category: "A", checkIn: "", checkOut: "", roomType: "", nights: 1 },
    ],
  }));
};

const updateHotelDetail = (index, field, value) => {
  setFormData((prev) => {
    const updated = [...prev.hotelDetails];
    updated[index] = { ...updated[index], [field]: value };
    return { ...prev, hotelDetails: updated };
  });
};

const removeHotelDetail = (index) => {
  setFormData((prev) => ({
    ...prev,
    hotelDetails: prev.hotelDetails.filter((_, i) => i !== index),
  }));
};

// ===== POLICY HELPERS (for cancellation, booking, notes) =====
const addPolicyItem = (field) => {
  setFormData((prev) => ({
    ...prev,
    [field]: [...prev[field], ""],
  }));
};

const updatePolicyItem = (field, index, value) => {
  setFormData((prev) => {
    const updated = [...prev[field]];
    updated[index] = value;
    return { ...prev, [field]: updated };
  });
};

const removePolicyItem = (field, index) => {
  setFormData((prev) => ({
    ...prev,
    [field]: prev[field].filter((_, i) => i !== index),
  }));
};


  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.destination.trim())
      newErrors.destination = "Destination is required";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    // Only require image for new packages (when pkg is null/undefined and no image file selected)
    if (!pkg && !imageFile && !imagePreview)
      newErrors.image = "Image is required for new cards";
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

      // Fields that need JSON stringification
      const jsonFields = [
        'itinerary',
        'highlights',
        'includes',
        'excludes',
        'hotelCategoryPricing',
        'hotelDetails',
        'cancellationPolicy',
        'bookingPolicy',
        'importantNotes'
      ];

      Object.keys(formData).forEach((key) => {
        if (jsonFields.includes(key)) {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (imageFile) {
        data.append("image", imageFile);
      } 

      const hasDbId = Boolean(pkg?._id);
      const hasNonStaticId = Boolean(
        pkg?.id && !String(pkg.id).startsWith("static-"),
      );
      const useUpdate = hasDbId || hasNonStaticId;

      const endpoint = useUpdate
        ? `${BASE_URL}/api/packages/${pkg._id || pkg.id}`
        : `${BASE_URL}/api/packages`;

      console.log(
        "Submitting to:",
        endpoint,
        "Method:",
        useUpdate ? "PUT" : "POST",
      );

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
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="upload-preview"
                    />
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
                {errors.image && (
                  <span className="error-text">{errors.image}</span>
                )}
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
                {errors.title && (
                  <span className="error-text">{errors.title}</span>
                )}
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
                {errors.destination && (
                  <span className="error-text">{errors.destination}</span>
                )}
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
                  {errors.price && (
                    <span className="error-text">{errors.price}</span>
                  )}
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
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
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

              {/* Duration Days/Nights */}
              <div className="form-row">
                <div className="form-group">
                  <label>Duration Days</label>
                  <input
                    type="number"
                    name="durationDays"
                    min="0"
                    value={formData.durationDays}
                    onChange={handleChange}
                    placeholder="7"
                  />
                </div>
                <div className="form-group">
                  <label>Duration Nights</label>
                  <input
                    type="number"
                    name="durationNights"
                    min="0"
                    value={formData.durationNights}
                    onChange={handleChange}
                    placeholder="6"
                  />
                </div>
              </div>

              {/* Travel Season */}
              <div className="form-group">
                <label>Travel Season</label>
                <input
                  type="text"
                  name="travelSeason"
                  value={formData.travelSeason}
                  onChange={handleChange}
                  placeholder="e.g., Oct - Mar (Best Time)"
                />
              </div>

              {/* Validity Period */}
              <div className="form-row">
                <div className="form-group">
                  <label>Validity Start</label>
                  <input
                    type="date"
                    name="validityStart"
                    value={formData.validityStart}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Validity End</label>
                  <input
                    type="date"
                    name="validityEnd"
                    value={formData.validityEnd}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Number of Guests */}
              <div className="form-row">
                <div className="form-group">
                  <label>Min Guests</label>
                  <input
                    type="number"
                    name="minGuests"
                    min="1"
                    value={formData.minGuests}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Max Guests</label>
                  <input
                    type="number"
                    name="maxGuests"
                    min="1"
                    value={formData.maxGuests}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="form-group">
                <div className="label-with-action">
                  <label>Highlights</label>
                  <button type="button" className="add-day-btn" onClick={() => addPolicyItem('highlights')}>
                    <Plus size={16} /> Add
                  </button>
                </div>
                {formData.highlights.map((item, index) => (
                  <div key={index} className="policy-item">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updatePolicyItem('highlights', index, e.target.value)}
                      placeholder="e.g., Beachfront Resort Stay"
                    />
                    <button type="button" className="remove-day-btn" onClick={() => removePolicyItem('highlights', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Includes */}
              <div className="form-group">
                <div className="label-with-action">
                  <label>Inclusions</label>
                  <button type="button" className="add-day-btn" onClick={() => addPolicyItem('includes')}>
                    <Plus size={16} /> Add
                  </button>
                </div>
                {formData.includes.map((item, index) => (
                  <div key={index} className="policy-item">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updatePolicyItem('includes', index, e.target.value)}
                      placeholder="e.g., Breakfast included"
                    />
                    <button type="button" className="remove-day-btn" onClick={() => removePolicyItem('includes', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Excludes */}
              <div className="form-group">
                <div className="label-with-action">
                  <label>Exclusions</label>
                  <button type="button" className="add-day-btn" onClick={() => addPolicyItem('excludes')}>
                    <Plus size={16} /> Add
                  </button>
                </div>
                {formData.excludes.map((item, index) => (
                  <div key={index} className="policy-item">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updatePolicyItem('excludes', index, e.target.value)}
                      placeholder="e.g., Airfare not included"
                    />
                    <button type="button" className="remove-day-btn" onClick={() => removePolicyItem('excludes', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Hotel Category Pricing */}
              <div className="form-group">
                <div className="label-with-action">
                  <label>Hotel Category Pricing</label>
                  <button type="button" className="add-day-btn" onClick={addHotelCategoryPricing}>
                    <Plus size={16} /> Add Category
                  </button>
                </div>
                {formData.hotelCategoryPricing.map((item, index) => (
                  <div key={index} className="hotel-pricing-item">
                    <select
                      value={item.category}
                      onChange={(e) => updateHotelCategoryPricing(index, 'category', e.target.value)}
                    >
                      <option value="A">Category A (Luxury)</option>
                      <option value="B">Category B (Standard)</option>
                      <option value="C">Category C (Budget)</option>
                    </select>
                    <input
                      type="number"
                      value={item.pricePerPerson}
                      onChange={(e) => updateHotelCategoryPricing(index, 'pricePerPerson', Number(e.target.value))}
                      placeholder="Price per person"
                    />
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateHotelCategoryPricing(index, 'description', e.target.value)}
                      placeholder="Description (e.g., 5-star hotels)"
                    />
                    <button type="button" className="remove-day-btn" onClick={() => removeHotelCategoryPricing(index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* City-wise Hotel Details */}
              <div className="form-group">
                <div className="label-with-action">
                  <label>City-wise Hotel Details</label>
                  <button type="button" className="add-day-btn" onClick={addHotelDetail}>
                    <Plus size={16} /> Add Hotel
                  </button>
                </div>
                {formData.hotelDetails.map((hotel, index) => (
                  <div key={index} className="hotel-detail-item">
                    <div className="hotel-detail-row">
                      <input
                        type="text"
                        value={hotel.city}
                        onChange={(e) => updateHotelDetail(index, 'city', e.target.value)}
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={hotel.hotelName}
                        onChange={(e) => updateHotelDetail(index, 'hotelName', e.target.value)}
                        placeholder="Hotel Name"
                      />
                      <select
                        value={hotel.category}
                        onChange={(e) => updateHotelDetail(index, 'category', e.target.value)}
                      >
                        <option value="A">Cat A</option>
                        <option value="B">Cat B</option>
                        <option value="C">Cat C</option>
                      </select>
                    </div>
                    <div className="hotel-detail-row">
                      <input
                        type="text"
                        value={hotel.roomType}
                        onChange={(e) => updateHotelDetail(index, 'roomType', e.target.value)}
                        placeholder="Room Type"
                      />
                      <input
                        type="number"
                        value={hotel.nights}
                        onChange={(e) => updateHotelDetail(index, 'nights', Number(e.target.value))}
                        placeholder="Nights"
                        min="1"
                      />
                      <button type="button" className="remove-day-btn" onClick={() => removeHotelDetail(index)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cancellation Policy */}
              <div className="form-group">
                <div className="label-with-action">
                  <label>Cancellation Policy</label>
                  <button type="button" className="add-day-btn" onClick={() => addPolicyItem('cancellationPolicy')}>
                    <Plus size={16} /> Add
                  </button>
                </div>
                {formData.cancellationPolicy.map((item, index) => (
                  <div key={index} className="policy-item">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updatePolicyItem('cancellationPolicy', index, e.target.value)}
                      placeholder="e.g., Free cancellation up to 7 days before"
                    />
                    <button type="button" className="remove-day-btn" onClick={() => removePolicyItem('cancellationPolicy', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Booking Policy */}
              <div className="form-group">
                <div className="label-with-action">
                  <label>Booking Policy</label>
                  <button type="button" className="add-day-btn" onClick={() => addPolicyItem('bookingPolicy')}>
                    <Plus size={16} /> Add
                  </button>
                </div>
                {formData.bookingPolicy.map((item, index) => (
                  <div key={index} className="policy-item">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updatePolicyItem('bookingPolicy', index, e.target.value)}
                      placeholder="e.g., 50% advance payment required"
                    />
                    <button type="button" className="remove-day-btn" onClick={() => removePolicyItem('bookingPolicy', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Important Notes */}
              <div className="form-group">
                <div className="label-with-action">
                  <label>Important Notes</label>
                  <button type="button" className="add-day-btn" onClick={() => addPolicyItem('importantNotes')}>
                    <Plus size={16} /> Add
                  </button>
                </div>
                {formData.importantNotes.map((item, index) => (
                  <div key={index} className="policy-item">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updatePolicyItem('importantNotes', index, e.target.value)}
                      placeholder="e.g., Passport validity 6 months required"
                    />
                    <button type="button" className="remove-day-btn" onClick={() => removePolicyItem('importantNotes', index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
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
                  <button
                    type="button"
                    className="add-day-btn"
                    onClick={addItineraryDay}
                  >
                    <Plus size={16} /> Add Day
                  </button>
                </div>

                {formData.itinerary.map((day, index) => (
                  <div key={index} className="itinerary-item">
                    <span className="day-number">Day {index + 1}</span>
                    <input
  type="text"
  placeholder="Title"
  value={day.title}
  onChange={(e) =>
    updateItineraryDay(index, "title", e.target.value)
  }
/>

<input
  type="text"
  placeholder="Description"
  value={day.description}
  onChange={(e) =>
    updateItineraryDay(index, "description", e.target.value)
  }
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

              {errors.submit && (
                <div className="submit-error">{errors.submit}</div>
              )}

              {/* Actions */}
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-btn"
                  disabled={isSubmitting}
                >
                  <Save size={18} />
                  {isSubmitting
                    ? "Saving..."
                    : pkg
                      ? "Update Card"
                      : "Create Card"}
                </button>
              </div>
            </form>

            {/* Right: Live Preview */}
            {/* <div className="preview-section">
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
            </div> */}
            <div className="preview-section">
              <h3>Live Preview</h3>

              <div className="preview-card">
                {imagePreview && <img src={imagePreview} alt="Preview" />}

                <div className="preview-content">
                  <span className="preview-category">{formData.category}</span>

                  <h4>{formData.title || "Untitled"}</h4>

                  <p className="preview-dest">
                    {formData.destination || "Destination"}
                  </p>

                  <div className="preview-meta">
                    <span className="preview-price">
                      ₹{formData.price || "0"}
                    </span>
                    <span className="preview-dur">
                      {formData.duration || `${formData.durationDays}D / ${formData.durationNights}N`}
                    </span>
                  </div>

                  {formData.travelSeason && (
                    <p className="preview-season">🌤 {formData.travelSeason}</p>
                  )}

                  {formData.description && (
                    <p className="preview-desc">{formData.description}</p>
                  )}

                  {/* Highlights Preview */}
                  {formData.highlights?.length > 0 && (
                    <div className="preview-extra">
                      <strong>Highlights</strong>
                      <ul>
                        {formData.highlights.map((h, i) => (
                          <li key={i}>✔ {h}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Itinerary Preview */}
                  {formData.itinerary?.length > 0 && (
                    <div className="preview-extra">
                      <strong>Itinerary</strong>
                      {formData.itinerary.map((day, index) => (
                        <div key={index} className="preview-itinerary-day">
                          <div className="it-day">
                            Day {day.day || index + 1}: {day.title || "Untitled"}
                          </div>
                          {day.description && (
                            <div className="it-desc">{day.description}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hotel Categories Preview */}
                  {formData.hotelCategoryPricing?.length > 0 && (
                    <div className="preview-extra">
                      <strong>Hotel Pricing</strong>
                      {formData.hotelCategoryPricing.map((cat, i) => (
                        <div key={i}>Cat {cat.category}: ₹{cat.pricePerPerson}/person</div>
                      ))}
                    </div>
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
