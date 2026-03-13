import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config/api";
import "./BookingsManager.css";

const BookingsManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();

      console.log("BOOKINGS RESPONSE:", data);

      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/api/bookings/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update booking status");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  /* ================= UI ================= */
  return (
    <div className="bookings-manager">
      <h2>Customer Bookings</h2>

      <table className="bookings-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Package</th>
            <th>Travel Date</th>
            <th>Persons</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(bookings) && bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>
                  <strong>{booking.customerName}</strong>
                  <br />
                  {booking.email}
                </td>

                <td>
                  {booking.packageId?.title || "Unknown Package"}
                  <br />
                  <small>{booking.packageId?.destination}</small>
                </td>

                <td>
                  {booking.travelDate
                    ? new Date(booking.travelDate).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>{booking.persons}</td>

                <td>
                  <span className={`status ${booking.status}`}>
                    {booking.status}
                  </span>
                </td>

                <td>
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      updateStatus(booking._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsManager;