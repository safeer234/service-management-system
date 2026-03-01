import React, { useEffect, useState } from "react";
import axios from "axios";

function ProviderHome() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "https://service-management-system-hj06.onrender.com/api/provider/dashboard",
          { withCredentials: true }
        );

        if (res.data && res.data.data) {
          setDashboard(res.data.data);
        } else {
          setDashboard({
            totalRequests: 0,
            activeRequests: 0,
            completedRequests: 0,
            totalEarnings: 0,
          });
        }

      } catch (error) {
        console.error("Dashboard error:", error);

        // fallback to safe state
        setDashboard({
          totalRequests: 0,
          activeRequests: 0,
          completedRequests: 0,
          totalEarnings: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  if (!dashboard) return <p className="p-6">No dashboard data</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Provider Dashboard</h2>

      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">Total Requests</h3>
          <p className="text-2xl font-bold">{dashboard.totalRequests}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">Active</h3>
          <p className="text-2xl font-bold">{dashboard.activeRequests}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold">{dashboard.completedRequests}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-gray-500">Earnings</h3>
          <p className="text-2xl font-bold">₹ {dashboard.totalEarnings}</p>
        </div>
      </div>
    </div>
  );
}

export default ProviderHome;