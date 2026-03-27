import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";
import "./WhatsAppLeads.css";

const WhatsAppLeads = () => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, accepted: 0, pending: 0, contacted: 0, converted: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [filter]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `${BASE_URL}/api/whatsapp-leads`;
      if (filter !== "all") {
        url += `?status=${filter}`;
      }
      
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/whatsapp-leads/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/whatsapp-leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        fetchLeads();
        fetchStats();
        setSelectedLead(null);
      }
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const deleteLead = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/whatsapp-leads/${leadId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        fetchLeads();
        fetchStats();
        setSelectedLead(null);
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
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

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "badge-pending",
      contacted: "badge-contacted",
      converted: "badge-converted",
      rejected: "badge-rejected"
    };
    return `status-badge ${statusColors[status] || "badge-pending"}`;
  };

  if (loading) {
    return <div className="leads-loading">Loading...</div>;
  }

  return (
    <div className="whatsapp-leads-container">
      {/* Stats Cards */}
      <div className="leads-stats">
        <div className="stat-card stat-total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Leads</div>
        </div>
        <div className="stat-card stat-accepted">
          <div className="stat-value">{stats.accepted}</div>
          <div className="stat-label">T&C Accepted</div>
        </div>
        <div className="stat-card stat-pending">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card stat-contacted">
          <div className="stat-value">{stats.contacted}</div>
          <div className="stat-label">Contacted</div>
        </div>
        <div className="stat-card stat-converted">
          <div className="stat-value">{stats.converted}</div>
          <div className="stat-label">Converted</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="leads-filters">
        <button 
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === "contacted" ? "active" : ""}`}
          onClick={() => setFilter("contacted")}
        >
          Contacted
        </button>
        <button 
          className={`filter-btn ${filter === "converted" ? "active" : ""}`}
          onClick={() => setFilter("converted")}
        >
          Converted
        </button>
        <button 
          className={`filter-btn ${filter === "rejected" ? "active" : ""}`}
          onClick={() => setFilter("rejected")}
        >
          Rejected
        </button>
      </div>

      {/* Leads Table */}
      <div className="leads-table-container">
        {leads.length === 0 ? (
          <div className="no-leads">
            <p>No WhatsApp leads found</p>
          </div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>T&C</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} onClick={() => setSelectedLead(lead)}>
                  <td className="lead-name">{lead.name}</td>
                  <td>
                    <a href={`https://wa.me/${lead.phone.replace(/[\s\-\(\)\+]/g, '')}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="phone-link"
                       onClick={(e) => e.stopPropagation()}>
                      {lead.phone}
                    </a>
                  </td>
                  <td>{lead.email || "-"}</td>
                  <td>
                    <span className={`tc-badge ${lead.termsAccepted ? "tc-accepted" : "tc-pending"}`}>
                      {lead.termsAccepted ? "✓ Accepted" : "✗ Pending"}
                    </span>
                  </td>
                  <td>
                    <span className={getStatusBadge(lead.status)}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="lead-date">{formatDate(lead.createdAt)}</td>
                  <td className="actions-cell">
                    <select 
                      value={lead.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        updateLeadStatus(lead._id, e.target.value);
                      }}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteLead(lead._id);
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

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="lead-modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="lead-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLead(null)}>×</button>
            <h3>Lead Details</h3>
            
            <div className="lead-detail">
              <label>Name:</label>
              <span>{selectedLead.name}</span>
            </div>
            <div className="lead-detail">
              <label>Phone:</label>
              <a href={`https://wa.me/${selectedLead.phone.replace(/[\s\-\(\)\+]/g, '')}`} 
                 target="_blank" 
                 rel="noopener noreferrer">
                {selectedLead.phone} (Open WhatsApp)
              </a>
            </div>
            <div className="lead-detail">
              <label>Email:</label>
              <span>{selectedLead.email || "Not provided"}</span>
            </div>
            <div className="lead-detail">
              <label>Message:</label>
              <span>{selectedLead.message || "No message"}</span>
            </div>
            <div className="lead-detail">
              <label>Terms Accepted:</label>
              <span className={selectedLead.termsAccepted ? "text-green" : "text-red"}>
                {selectedLead.termsAccepted ? "Yes" : "No"}
                {selectedLead.termsAcceptedAt && ` (${formatDate(selectedLead.termsAcceptedAt)})`}
              </span>
            </div>
            <div className="lead-detail">
              <label>Status:</label>
              <select 
                value={selectedLead.status}
                onChange={(e) => updateLeadStatus(selectedLead._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="lead-detail">
              <label>Created:</label>
              <span>{formatDate(selectedLead.createdAt)}</span>
            </div>

            <div className="modal-actions">
              <a 
                href={`https://wa.me/${selectedLead.phone.replace(/[\s\-\(\)\+]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                💬 Open WhatsApp
              </a>
              <button 
                className="delete-btn-large"
                onClick={() => deleteLead(selectedLead._id)}
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppLeads;
