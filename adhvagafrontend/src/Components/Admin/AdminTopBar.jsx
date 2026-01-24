import React from "react";
import { Bell, Search, User } from "lucide-react";
import "./AdminTopBar.css";

const AdminTopBar = ({ title, subtitle }) => {
  return (
    <header className="admin-topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <h1 className="topbar-title">{title}</h1>
          {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
        </div>

        <div className="topbar-right">
          <div className="search-container">
            <Search size={18} />
            <input type="text" placeholder="Search..." />
          </div>

          <button className="icon-button">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>

          <div className="admin-profile">
            <div className="avatar">
              <User size={18} />
            </div>
            <div className="profile-info">
              <span className="profile-name">Admin</span>
              <span className="profile-role">Super Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;