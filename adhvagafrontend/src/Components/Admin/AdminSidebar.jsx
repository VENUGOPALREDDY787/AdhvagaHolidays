import React from "react";
import { Package, MessageCircle, Settings, Mail, LogOut } from "lucide-react";
import "./AdminSidebar.css";

const AdminSidebar = ({ activeSection, onSectionChange, onLogout }) => {
  const menuItems = [
    { id: "packages", label: "Travel Cards", icon: Package },
    { id: "whatsappLeads", label: "WhatsApp Leads", icon: MessageCircle },
    { id: "inquiries", label: "Inquiries", icon: Mail },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <span className="logo-text">Adhvaga</span>
          <span className="logo-subtext">Admin</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout-btn" onClick={onLogout}>
          <LogOut size={20} /> {/* ✅ FIXED */}
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;