import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";
import "./WhatsAppLeads.css"; 

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

 const fetchInquiries = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/inquiries`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      console.warn("API failed:", res.status);
      setInquiries([]);
      return;
    }

    const data = await res.json();
    setInquiries(data.data || []);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    setInquiries([]); // ✅ prevent crash
  } finally {
    setLoading(false);
  }
};

  const deleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        fetchInquiries();
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return <div className="leads-loading">Loading...</div>;
  }

  return (
    <div className="whatsapp-leads-container">
      
      {/* TABLE */}
      <div className="leads-table-container">
        {inquiries.length === 0 ? (
          <div className="no-leads">
            <p>No inquiries found</p>
          </div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {inquiries.map((item) => (
                <tr key={item._id} onClick={() => setSelectedInquiry(item)}>
                  <td className="lead-name">{item.name}</td>

                  <td>
                    <a
                      href={`https://wa.me/${item.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="phone-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.phone}
                    </a>
                  </td>

                  <td>{item.email}</td>
                  <td>{item.subject}</td>
                  <td className="lead-date">{formatDate(item.createdAt)}</td>

                  <td className="actions-cell">
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteInquiry(item._id);
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {selectedInquiry && (
        <div
          className="lead-modal-overlay"
          onClick={() => setSelectedInquiry(null)}
        >
          <div
            className="lead-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedInquiry(null)}
            >
              ×
            </button>

            <h3>Inquiry Details</h3>

            <div className="lead-detail">
              <label>Name:</label>
              <span>{selectedInquiry.name}</span>
            </div>

            <div className="lead-detail">
              <label>Phone:</label>
              <a
                href={`https://wa.me/${selectedInquiry.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedInquiry.phone}
              </a>
            </div>

            <div className="lead-detail">
              <label>Email:</label>
              <span>{selectedInquiry.email}</span>
            </div>

            <div className="lead-detail">
              <label>Subject:</label>
              <span>{selectedInquiry.subject}</span>
            </div>

            <div className="lead-detail">
              <label>Message:</label>
              <span>{selectedInquiry.message}</span>
            </div>

            <div className="lead-detail">
              <label>Created:</label>
              <span>{formatDate(selectedInquiry.createdAt)}</span>
            </div>

            <div className="modal-actions">
              <a
                href={`https://wa.me/${selectedInquiry.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                💬 Contact on WhatsApp
              </a>

              <button
                className="delete-btn-large"
                onClick={() => deleteInquiry(selectedInquiry._id)}
              >
                Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;