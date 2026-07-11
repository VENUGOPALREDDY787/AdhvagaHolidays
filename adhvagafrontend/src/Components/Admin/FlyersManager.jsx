import React, { useEffect, useState, useRef } from "react";
import { Upload, Trash2, ToggleLeft, Plus } from "lucide-react";
import "./FlyersManager.css";

const STORAGE_KEY = "admin_flyers";
const STORAGE_ENABLED = "admin_flyers_enabled";

const FlyersManager = () => {
  const [flyers, setFlyers] = useState([]);
  const [enabled, setEnabled] = useState(true);

  const fileRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    setFlyers(list);
    const en = localStorage.getItem(STORAGE_ENABLED);
    setEnabled(en === null ? true : en === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flyers));
  }, [flyers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ENABLED, enabled ? "true" : "false");
  }, [enabled]);

  const handleUpload = (e) => {
    const input = e.target;
    const file = input?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      const item = {
        id: Date.now().toString(),
        name: file.name,
        url,
        active: true,
      };
      setFlyers((s) => [item, ...s]);
      // clear input so same file can be selected again
      try { input.value = null; } catch (e) { /* ignore */ }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Remove this flyer?")) return;
    setFlyers((s) => s.filter((f) => f.id !== id));
  };

  const toggleActive = (id) => {
    setFlyers((s) => s.map((f) => (f.id === id ? { ...f, active: !f.active } : f)));
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
            onClick={() => setEnabled((v) => !v)}
          >
            <ToggleLeft size={16} /> {enabled ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      <div className="flyers-list">
        {flyers.length === 0 && (
          <div className="flyers-empty">No flyers uploaded yet.</div>
        )}

        {flyers.map((f) => (
          <div key={f.id} className={`flyer-item ${f.active ? "active" : "inactive"}`}>
            <div className="thumb">
              <img src={f.url} alt={f.name} />
            </div>
            <div className="meta">
              <div className="name">{f.name}</div>
              <div className="controls">
                <button className="icon" onClick={() => toggleActive(f.id)}>
                  <ToggleLeft size={14} /> {f.active ? "On" : "Off"}
                </button>
                <button className="icon delete" onClick={() => handleDelete(f.id)}>
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
