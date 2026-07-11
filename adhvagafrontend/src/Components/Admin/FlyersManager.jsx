import React, { useEffect, useState, useRef } from "react";
import { Upload, Trash2, ToggleLeft } from "lucide-react";
import { BASE_URL } from "../../config/api";
import "./FlyersManager.css";

const FlyersManager = () => {
  const [flyers, setFlyers] = useState([]);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const fileRef = useRef(null);
  const token = localStorage.getItem("token");

  const fetchFlyers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/flyers?admin=true`);
      const data = await res.json();
      setFlyers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/settings`);
      const data = await res.json();
      if (data && data.flyersEnabled !== undefined) {
        setEnabled(data.flyersEnabled);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    Promise.all([fetchFlyers(), fetchSettings()]).finally(() => setLoading(false));
  }, []);

  const toggleGlobalEnabled = async () => {
    const nextState = !enabled;
    setEnabled(nextState);
    try {
      await fetch(`${BASE_URL}/api/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ flyersEnabled: nextState }),
      });
    } catch (e) {
      console.error("Failed to update global flyers setting");
      setEnabled(!nextState); // revert on error
    }
  };

  const handleUpload = async (e) => {
    const input = e.target;
    const file = input?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const url = reader.result;
      try {
        const res = await fetch(`${BASE_URL}/api/flyers`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: file.name, url, active: true }),
        });
        const data = await res.json();
        setFlyers((s) => [data, ...s]);
      } catch (err) {
        alert("Failed to upload flyer.");
      }
      try { input.value = null; } catch (e) { /* ignore */ }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this flyer?")) return;
    try {
      await fetch(`${BASE_URL}/api/flyers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlyers((s) => s.filter((f) => f._id !== id));
    } catch (e) {
      alert("Failed to delete flyer");
    }
  };

  const toggleActive = async (id, currentStatus) => {
    const nextStatus = !currentStatus;
    // Optimistic UI update
    setFlyers((s) => s.map((f) => (f._id === id ? { ...f, active: nextStatus } : f)));
    try {
      await fetch(`${BASE_URL}/api/flyers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ active: nextStatus }),
      });
    } catch (e) {
      // Revert on failure
      setFlyers((s) => s.map((f) => (f._id === id ? { ...f, active: currentStatus } : f)));
    }
  };

  return (
    <div className="flyers-manager">
      <div className="flyers-header">
        <h2>Flyers</h2>
        <div className="flyers-actions">
          <div className="file-upload">
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} />
            <button type="button" className="btn" onClick={() => fileRef.current && fileRef.current.click()}>
              <Upload size={16} /> Upload Flyer
            </button>
          </div>

          <button
            className={`btn toggle ${enabled ? "on" : "off"}`}
            onClick={toggleGlobalEnabled}
          >
            <ToggleLeft size={16} /> {enabled ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      <div className="flyers-list">
        {loading && <div className="flyers-empty">Loading...</div>}
        {!loading && flyers.length === 0 && (
          <div className="flyers-empty">No flyers uploaded yet.</div>
        )}

        {flyers.map((f) => (
          <div key={f._id} className={`flyer-item ${f.active ? "active" : "inactive"}`}>
            <div className="thumb">
              <img src={f.url} alt={f.name} />
            </div>
            <div className="meta">
              <div className="name">{f.name}</div>
              <div className="controls">
                <button className="icon" onClick={() => toggleActive(f._id, f.active)}>
                  <ToggleLeft size={14} /> {f.active ? "On" : "Off"}
                </button>
                <button className="icon delete" onClick={() => handleDelete(f._id)}>
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlyersManager;
