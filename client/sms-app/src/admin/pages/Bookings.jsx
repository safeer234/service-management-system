import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 6;

  /* ================= FETCH BOOKINGS ================= */

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://service-management-system-hj06.onrender.com/api/admin/requests",
        { withCredentials: true }
      );

      setBookings(res.data.data);
    } catch (err) {
  console.error("Fetch bookings error:", err);

  setError(
    err.response?.data?.message ||
    err.message ||
    "Failed to fetch bookings"
  );

  toast.error(
    err.response?.data?.message ||
    "Failed to fetch bookings"
  );
} finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */

  const filteredBookings = useMemo(() => {
    let updated = [...bookings];

    if (search) {
      updated = updated.filter(
        (b) =>
          b.serviceType.toLowerCase().includes(search.toLowerCase()) ||
          b.client?.username
            ?.toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      updated = updated.filter((b) => b.status === statusFilter);
    }

    return updated;
  }, [bookings, search, statusFilter]);

  /* ================= PAGINATION ================= */

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredBookings.length / bookingsPerPage
  );

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `https://service-management-system-hj06.onrender.com/api/admin/request/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      toast.success("Status updated");
      fetchBookings();
    } catch (err) {
        toast.error(
    err.response?.data?.message || "Failed to update status"
  );
    }
  };

  /* ================= DELETE ================= */

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `https://service-management-system-hj06.onrender.com/api/admin/request/${id}`,
        { withCredentials: true }
      );

      toast.success("Booking deleted");
      fetchBookings();
    } catch (err) {
       toast.error(
    err.response?.data?.message || "Failed to delete booking"
  );
    }
  };

  /* ================= STATUS BADGE ================= */

  const getStatusBadge = (status) => {
    if (status === "pending")
      return "bg-yellow-100 text-yellow-700";
    if (status === "approved")
      return "bg-blue-100 text-blue-700";
    if (status === "completed")
      return "bg-green-100 text-green-700";
    if (status === "cancelled")
      return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  };

  /* ================= UI ================= */

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        All Bookings
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by service or user..."
          className="border p-2 rounded w-60"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Service</th>
              <th className="p-3">Address</th>
              <th className="p-3">Date</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentBookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  <p className="font-semibold">
                    {booking.client?.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.client?.email}
                  </p>
                </td>

                <td className="p-3">
                  {booking.serviceType}
                </td>

                <td className="p-3">
                  {booking.serviceAddress}
                </td>

                <td className="p-3">
                  {new Date(
                    booking.preferredDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-3 font-semibold text-[#ea580c]">
                  ₹ {booking.estimatedPrice}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() =>
                      updateStatus(
                        booking._id,
                        "approved"
                      )
                    }
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        booking._id,
                        "completed"
                      )
                    }
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      deleteBooking(booking._id)
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {currentBookings.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() =>
              setCurrentPage(index + 1)
            }
            className="px-3 py-1 border rounded"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Bookings;