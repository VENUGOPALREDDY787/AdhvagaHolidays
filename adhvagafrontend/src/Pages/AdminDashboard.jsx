import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import AdminTopBar from "../Components/Admin/AdminTopBar";
import TravelCardsManager from "../Components/Admin/TravelCardsManager";
import DashboardOverview from "../Components/Admin/DashboardOverview";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("packages");
  const navigate = useNavigate();

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
  };

  /* ================= SECTIONS ================= */
  const sections = {
    dashboard: {
      title: "Dashboard Overview",
      subtitle: "Welcome back, here's what's happening",
      component: <DashboardOverview />,
    },
    packages: {
      title: "Travel Cards Management",
      subtitle: "Create, edit, and manage your travel offerings",
      component: <TravelCardsManager />,
    },
    bookings: {
      title: "Bookings",
      subtitle: "Manage customer bookings and reservations",
      component: <div className="coming-soon">Coming Soon</div>,
    },
    users: {
      title: "Users",
      subtitle: "Manage customers and administrators",
      component: <div className="coming-soon">Coming Soon</div>,
    },
    settings: {
      title: "Settings",
      subtitle: "Configure your application settings",
      component: <div className="coming-soon">Coming Soon</div>,
    },
  };

  const currentSection = sections[activeSection];

  return (
    <div className="admin-dashboard">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />

      <div className="dashboard-main">
        <AdminTopBar
          title={currentSection.title}
          subtitle={currentSection.subtitle}
        />

        <div className="dashboard-content">
          {currentSection.component}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
