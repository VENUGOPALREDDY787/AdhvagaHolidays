import React, { useEffect, useState } from "react";
import "./AdminPortal.css";
import { Edit2, Trash2, Plus, ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPortal = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchPackages = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const res = await fetch("http://localhost:8080/api/packages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  };

  fetchPackages();
}, [navigate]);


  const avgPrice =
    packages.length > 0
      ? Math.round(
          packages.reduce((acc, p) => acc + p.price, 0) / packages.length,
        )
      : 0;

  const handleBack = () => {
    navigate(-1); // goes back to previous page
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:8080/api/packages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setPackages((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete package");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };
  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <button className="exit-btn" onClick={handleLogout}>
              <ArrowLeft size={16} />
              Logout
            </button>

            <h1 className="admin-title">
              <Settings size={32} className="icon-yellow" />
              Package Management
            </h1>
            <p className="admin-subtitle">
              Manage your inventory and travel offerings from one place.
            </p>
          </div>

          <button className="add-btn">
            <Plus size={20} />
            Add New Package
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Packages</p>
            <p className="stat-value">{packages.length}</p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Active Destinations</p>
            <p className="stat-value">
              {new Set(packages.map((p) => p.destination)).size}
            </p>
          </div>

          <div className="stat-card">
            <p className="stat-label">Average Price</p>
            <p className="stat-value">${avgPrice}</p>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg._id}>
                    <td>
                      <div className="package-cell">
                        <img src={pkg.image} alt="" />
                        <div>
                          <p className="pkg-title">{pkg.title}</p>
                          <p className="pkg-destination">{pkg.destination}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge">{pkg.category}</span>
                    </td>

                    <td>
                      <p className="price">${pkg.price}</p>
                    </td>

                    <td className="right">
                      <div className="actions">
                        <button
                          className="icon-btn edit"
                          onClick={() => handleEdit(pkg._id)}
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          className="icon-btn delete"
                          onClick={() => handleDelete(pkg._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {packages.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: "center", padding: "40px" }}
                    >
                      No packages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
