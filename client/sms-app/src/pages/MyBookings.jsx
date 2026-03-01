import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://service-management-system-hj06.onrender.com/api/client/requests",
        { withCredentials: true }
      );
      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axios.delete(
        `https://service-management-system-hj06.onrender.com/api/client/request/${id}`,
        { withCredentials: true }
      );

      alert("Booking cancelled");
      fetchBookings();
    } catch (err) {
       console.error("Error:", err.response?.data || err.message);
  alert("Something went wrong");
    }
  };

  const handlePayment = (booking) => {
    navigate("/payment", { state: { booking } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {bookings.length === 0 && !loading && (
        <p>No bookings found.</p>
      )}

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-md rounded-xl p-6 transition hover:shadow-lg"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {booking.serviceType}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>

            <p className="text-gray-600 mt-2">
              📍 {booking.serviceAddress}
            </p>

            <p className="text-gray-600">
              📅 {new Date(booking.preferredDate).toLocaleDateString()}
            </p>

            <p className="font-bold text-[#ea580c] mt-2">
              ₹ {booking.estimatedPrice}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {booking.description}
            </p>

            {/* Payment Status */}
            <div className="mt-3">
              {booking.paymentStatus === "paid" ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Payment Completed
                </span>
              ) : (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                  Payment Pending
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              {booking.paymentStatus !== "paid" &&
                booking.status !== "cancelled" && (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="bg-[#ea580c] text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Make Payment
                  </button>
                )}

              {booking.status !== "cancelled" &&
                booking.status !== "completed" && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                )}

              <button
                onClick={() =>
                  alert(`Current Status: ${booking.status}`)
                }
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                View Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
