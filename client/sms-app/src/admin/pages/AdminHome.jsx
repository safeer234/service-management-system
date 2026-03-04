import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalRequests: 0,
    totalPayments: 0,
    totalService: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "https://service-management-system-hj06.onrender.com/api/admin/dashboard",
        { withCredentials: true }
      );

      setStats(res.data.data);
    } catch (err) {
      console.log("Dashboard error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full">

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Admin Dashboard
      </h2>

      {loading && (
        <p className="text-gray-600 text-sm sm:text-base">
          Loading dashboard...
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm sm:text-base">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 transition hover:shadow-xl">
          <h3 className="text-gray-600 text-sm">Total Users</h3>
          <p className="text-2xl sm:text-3xl font-bold text-[#ea580c] mt-2">
            {stats.totalUsers}
          </p>
        </div>

        {/* Total Providers */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 transition hover:shadow-xl">
          <h3 className="text-gray-600 text-sm">Total Providers</h3>
          <p className="text-2xl sm:text-3xl font-bold text-[#ea580c] mt-2">
            {stats.totalProviders}
          </p>
        </div>

        {/* Total Service Requests */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 transition hover:shadow-xl">
          <h3 className="text-gray-600 text-sm">Total Service Requests</h3>
          <p className="text-2xl sm:text-3xl font-bold text-[#ea580c] mt-2">
            {stats.totalRequests}
          </p>
        </div>

        {/* Total Paid Payments */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 transition hover:shadow-xl">
          <h3 className="text-gray-600 text-sm">Total Paid Payments</h3>
          <p className="text-2xl sm:text-3xl font-bold text-[#ea580c] mt-2">
            {stats.totalPayments}
          </p>
        </div>

        {/* Total Services */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 transition hover:shadow-xl">
          <h3 className="text-gray-600 text-sm">Total Services</h3>
          <p className="text-2xl sm:text-3xl font-bold text-[#ea580c] mt-2">
            {stats.totalService}
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminHome;