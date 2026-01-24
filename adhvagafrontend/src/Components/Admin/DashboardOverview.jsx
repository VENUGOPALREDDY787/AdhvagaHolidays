
import React from "react";
import { TrendingUp, Package, DollarSign, Users } from "lucide-react";
import "./DashboardOverview.css";

const DashboardOverview = () => {
  const stats = [
    { icon: Package, label: "Total Packages", value: "42", change: "+12%", color: "#d2b48c" },
    { icon: Users, label: "Active Users", value: "1,248", change: "+23%", color: "#6366f1" },
    { icon: DollarSign, label: "Revenue", value: "$89,420", change: "+18%", color: "#10b981" },
    { icon: TrendingUp, label: "Growth", value: "24%", change: "+5%", color: "#f59e0b" },
  ];

  return (
    <div className="dashboard-overview">
      <div className="stats-overview">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="overview-stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-label">{stat.label}</span>
                <h3 className="stat-value">{stat.value}</h3>
                <span className="stat-change positive">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-content-area">
        <div className="welcome-section">
          <h1>Welcome to Adhvaga Admin Dashboard</h1>
          <p>Manage your travel business with powerful tools and insights</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
