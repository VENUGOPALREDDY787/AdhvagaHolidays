import React, { useEffect, useMemo, useRef, useState } from "react";
import { Edit2, Globe2, Plus, Save, Trash2, X } from "lucide-react";
import { BASE_URL } from "../../config/api";
import "./VisaCountriesManager.css";

const createInitialData = (item) => ({
  country: item?.country || "",
  visaType: item?.visaType || "Tourist Visa",
  processingTime: item?.processingTime || "7-10 Working Days",
  entries: item?.entries || "Single Entry",
  validity: item?.validity || "90 Days",
  image: item?.image || "",
  sortOrder: Number(item?.sortOrder || 0),
  isActive: item?.isActive ?? true,
  description: item?.description || "",
  price: item?.price ?? "",
  documentsRequired: Array.isArray(item?.documentsRequired) ? item.documentsRequired : [],
});

const VisaCountriesManager = ({ openEditId = null }) => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingVisa, setEditingVisa] = useState(null);
  const [formData, setFormData] = useState(createInitialData());
  const [imageSource, setImageSource] = useState("url"); // 'url' | 'upload' | 'flyers'
  const [flyersList, setFlyersList] = useState([]);
  const fileRef = useRef(null);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchVisas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/visas?admin=true`);
      const data = await res.json();
      setVisas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch visas", error);
      setVisas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisas();
    // load flyers from localStorage for "From Flyers" option
    try {
      const raw = localStorage.getItem("admin_flyers");
      const list = raw ? JSON.parse(raw) : [];
      setFlyersList(Array.isArray(list) ? list : []);
    } catch (e) {
      setFlyersList([]);
    }
  }, []);

  useEffect(() => {
    if (!openEditId) return;
    if (visas.length === 0) return;
    const target = visas.find((v) => String(v._id) === String(openEditId));
    if (target) {
      setTimeout(() => openEditForm(target), 150);
    }
  }, [openEditId, visas]);

  const filteredVisas = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return visas;

    return visas.filter((item) => {
      const text = `${item.country} ${item.visaType} ${item.processingTime}`.toLowerCase();
      return text.includes(term);
    });
  }, [visas, search]);

  const openCreateForm = () => {
    setEditingVisa(null);
    setFormData(createInitialData());
    setFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingVisa(item);
    setFormData(createInitialData(item));
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingVisa(null);
    setFormData(createInitialData());
  };

  const onInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileSelect = (e) => {
    const input = e.target;
    const file = input?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      setFormData((prev) => ({ ...prev, image: url }));
      // clear input
      try { input.value = null; } catch (err) {}
    };
    reader.readAsDataURL(file);
  };

  const handleSelectFlyer = (flyerId) => {
    const f = flyersList.find((x) => x.id === flyerId);
    if (f) setFormData((prev) => ({ ...prev, image: f.url }));
  };

  const addDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documentsRequired: [...prev.documentsRequired, ""],
    }));
  };

  const updateDocument = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.documentsRequired];
      updated[index] = value;
      return { ...prev, documentsRequired: updated };
    });
  };

  const removeDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documentsRequired: prev.documentsRequired.filter((_, i) => i !== index),
    }));
  };

  const saveVisa = async (event) => {
    event.preventDefault();

    if (!formData.country.trim() || !formData.image.trim()) {
      alert("Country and image URL are required");
      return;
    }

    setSaving(true);
    try {
      const id = editingVisa?._id;
      const endpoint = id ? `${BASE_URL}/api/visas/${id}` : `${BASE_URL}/api/visas`;
      const method = id ? "PUT" : "POST";

      const payload = {
        ...formData,
        sortOrder: Number(formData.sortOrder) || 0,
        documentsRequired: formData.documentsRequired.map(i => String(i).trim()).filter(Boolean),
      };

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to save visa country");
      }

      if (id) {
        setVisas((prev) => prev.map((item) => (item._id === id ? data : item)));
      } else {
        setVisas((prev) => [data, ...prev]);
      }

      closeForm();
    } catch (error) {
      alert(error.message || "Failed to save visa country");
    } finally {
      setSaving(false);
    }
  };

  const deleteVisa = async (id) => {
    if (!window.confirm("Delete this visa country?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/visas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to delete visa country");
      }

      setVisas((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.message || "Delete failed");
    }
  };

  return (
    <div className="visa-manager">
      <div className="visa-manager-header">
        <div>
          <h3>Visa Countries</h3>
          <p>Create, edit, activate, or remove visa countries shown on the Visa page.</p>
        </div>

        <div className="visa-manager-actions">
          <input
            type="text"
            placeholder="Search country or visa type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" onClick={openCreateForm}>
            <Plus size={16} />
            Add Country
          </button>
        </div>
      </div>

      {loading ? (
        <div className="visa-loading">Loading visa countries...</div>
      ) : (
        <div className="visa-manager-grid">
          {filteredVisas.map((item) => (
            <article className="visa-country-card" key={item._id}>
              <img src={item.image} alt={item.country} />
              <div className="visa-country-content">
                <div className="visa-country-head">
                  <h4>{item.country}</h4>
                  <span className={item.isActive ? "active" : "inactive"}>
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <p>{item.visaType}</p>
                <small>
                  {item.processingTime} • {item.entries} • {item.validity}
                </small>

                <div className="visa-country-cta-row">
                  <button type="button" onClick={() => openEditForm(item)}>
                    <Edit2 size={15} />
                    Edit
                  </button>
                  <button type="button" className="danger" onClick={() => deleteVisa(item._id)}>
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filteredVisas.length === 0 && (
            <div className="visa-empty-state">
              <Globe2 size={28} />
              <p>No visa countries found</p>
            </div>
          )}
        </div>
      )}

      {formOpen && (
        <div className="visa-form-overlay" onClick={closeForm}>
          <form className="visa-form-panel" onClick={(e) => e.stopPropagation()} onSubmit={saveVisa}>
            <div className="visa-form-header">
              <h4>{editingVisa ? "Edit Visa Country" : "Add Visa Country"}</h4>
              <button type="button" onClick={closeForm}>
                <X size={18} />
              </button>
            </div>

            <div className="visa-form-grid">
              <label>
                Country *
                <input name="country" value={formData.country} onChange={onInputChange} required />
              </label>

              <label>
                Visa Type
                <input name="visaType" value={formData.visaType} onChange={onInputChange} />
              </label>

              <label>
                Processing Time
                <input name="processingTime" value={formData.processingTime} onChange={onInputChange} />
              </label>

              <label>
                Entries
                <input name="entries" value={formData.entries} onChange={onInputChange} />
              </label>

              <label>
                Validity
                <input name="validity" value={formData.validity} onChange={onInputChange} />
              </label>

              <label>
                Sort Order
                <input
                  name="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={onInputChange}
                />
              </label>

              <label>
                Price
                <input name="price" type="number" value={formData.price} onChange={onInputChange} placeholder="e.g., 5000" />
              </label>

              <label className="full-width">
                Overview / Description
                <textarea name="description" value={formData.description} onChange={onInputChange} rows="3" />
              </label>

              <div className="full-width form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <label style={{ margin: 0 }}>Documents Required</label>
                  <button type="button" onClick={addDocument} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 8px", background: "rgba(210, 180, 140, 0.1)", border: "1px solid rgba(210, 180, 140, 0.2)", borderRadius: "4px", color: "#d2b48c", cursor: "pointer", fontSize: "0.85rem" }}>
                    <Plus size={14} /> Add
                  </button>
                </div>
                {formData.documentsRequired.map((doc, index) => (
                  <div key={index} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <input type="text" value={doc} onChange={(e) => updateDocument(index, e.target.value)} placeholder="e.g., Original Passport" style={{ flex: 1 }} />
                    <button type="button" onClick={() => removeDocument(index)} style={{ background: "rgba(255, 107, 107, 0.1)", border: "1px solid rgba(255, 107, 107, 0.2)", color: "#ff6b6b", borderRadius: "4px", padding: "0 10px", cursor: "pointer" }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="full-width image-options">
                <label>Image Source</label>
                <div className="image-source-controls">
                  <label>
                    <input
                      type="radio"
                      name="imageSource"
                      value="url"
                      checked={imageSource === "url"}
                      onChange={() => setImageSource("url")}
                    />
                    Use URL
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="imageSource"
                      value="upload"
                      checked={imageSource === "upload"}
                      onChange={() => setImageSource("upload")}
                    />
                    Upload File
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="imageSource"
                      value="flyers"
                      checked={imageSource === "flyers"}
                      onChange={() => setImageSource("flyers")}
                    />
                    From Flyers
                  </label>
                </div>

                {imageSource === "url" && (
                  <input name="image" value={formData.image} onChange={onInputChange} required />
                )}

                {imageSource === "upload" && (
                  <div className="upload-control">
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleFileSelect} />
                    <button type="button" className="btn" onClick={() => fileRef.current && fileRef.current.click()}>
                      Upload Image
                    </button>
                    {formData.image && <small className="preview-note">Preview will be used</small>}
                  </div>
                )}

                {imageSource === "flyers" && (
                  <div className="flyers-select">
                    <select onChange={(e) => handleSelectFlyer(e.target.value)} defaultValue="">
                      <option value="">Select a flyer</option>
                      {flyersList.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                    {formData.image && <small className="preview-note">Preview will be used</small>}
                  </div>
                )}
              </div>

              <label className="visa-active-toggle full-width">
                <input
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={onInputChange}
                />
                Show this country on visa page
              </label>
            </div>

            <div className="visa-form-footer">
              <button type="button" className="ghost" onClick={closeForm}>
                Cancel
              </button>
              <button type="submit" disabled={saving}>
                <Save size={16} />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VisaCountriesManager;
