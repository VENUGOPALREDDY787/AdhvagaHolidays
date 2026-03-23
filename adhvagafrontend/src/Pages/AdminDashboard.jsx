import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import AdminTopBar from "../Components/Admin/AdminTopBar";
import TravelCardsManager from "../Components/Admin/TravelCardsManager";
import DashboardOverview from "../Components/Admin/DashboardOverview";
import BookingsManager from "../Components/Admin/BookingsManager";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("packages");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/admin/login", { replace: true });
    setLoading(false); // 🔥 ADD THIS
    return;
  }

  fetch("http://localhost:8080/api/admin/verify-admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Invalid token");
      }
      return res.json();
    })
    .then(() => {
      setLoading(false);
    })
    .catch(() => {
      localStorage.removeItem("token");
      navigate("/admin/login", { replace: true });
      setLoading(false); // 🔥 ADD THIS
    });
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
  component: <BookingsManager />,
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
if (loading) {
  return <div>Checking authentication...</div>;
}
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
