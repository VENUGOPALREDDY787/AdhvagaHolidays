import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import AdminTopBar from "../Components/Admin/AdminTopBar";
import TravelCardsManager from "../Components/Admin/TravelCardsManager";
import FlyersManager from "../Components/Admin/FlyersManager";
import Settings from "../Components/Admin/Settings";
import WhatsAppLeads from "../Components/Admin/WhatsAppLeads";
import Inquiries from "../Components/Admin/Inquiries";
import VisaCountriesManager from "../Components/Admin/VisaCountriesManager";
import "./AdminDashboard.css";

const getAdminEmailFromToken = () => {
  const storedEmail = localStorage.getItem("admin_email");
  if (storedEmail) {
    return storedEmail;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    return "admin@adhvaga.com";
  }

  try {
    const payloadPart = token.split(".")[1];
    const payload = JSON.parse(atob(payloadPart));
    return payload?.email || "admin@adhvaga.com";
  } catch {
    return "admin@adhvaga.com";
  }
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("packages");
  const [initialEditId, setInitialEditId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const adminEmail = getAdminEmailFromToken();

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    // Parse ?panel=visas&edit=<id>
    try {
      const params = new URLSearchParams(location.search || "");
      const panel = params.get("panel");
      const edit = params.get("edit");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (panel) setActiveSection(panel);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (edit) setInitialEditId(edit);
    } catch (_e) {
      // ignore
    }
  }, [location.search]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
  };

  /* ================= SECTIONS ================= */
 const sections = {
  packages: {
    title: "Travel Cards Management",
    subtitle: "Create, edit, and manage your travel offerings",
    component: <TravelCardsManager />,
  },
  flyers: {
    title: "Flyers",
    subtitle: "Upload, remove and enable/disable flyer banners",
    component: <FlyersManager />,
  },
  visas: {
    title: "Visa Countries Management",
    subtitle: "Add, edit, and control all visa country cards",
    component: <VisaCountriesManager openEditId={initialEditId} />,
  },
  whatsappLeads: {
    title: "WhatsApp Leads",
    subtitle: "Track customers who contacted via WhatsApp",
    component: <WhatsAppLeads />,
  },
  inquiries: {   
    title: "Customer Inquiries",
    subtitle: "Manage and track user inquiries",
    component: <Inquiries />,
  },
  settings: {
    title: "Settings",
    subtitle: "Configure your application settings",
    component: <Settings />,
  },
};

  const currentSection = sections[activeSection];
  const quickStats = [
    { label: "Environment", value: "Connected", tone: "success" },
    { label: "Session", value: "Authenticated", tone: "warning" },
    { label: "Role", value: "Super Admin", tone: "neutral" },
  ];

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
          <section className="admin-control-panel">
            <div className="admin-control-copy">
              <p className="admin-control-label">Control Center</p>
              <h2>Welcome back, {adminEmail}</h2>
              <p>
                Manage packages, leads, and platform settings from one dashboard with
                live admin security checks.
              </p>
            </div>

            <div className="admin-quick-stats">
              {quickStats.map((stat) => (
                <article key={stat.label} className={`admin-stat-card ${stat.tone}`}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </article>
              ))}
            </div>
          </section>

          {currentSection.component}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
