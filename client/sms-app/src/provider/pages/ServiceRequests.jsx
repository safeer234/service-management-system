import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const res = await axios.get(
          "https://service-management-system-hj06.onrender.com/api/provider/requests",
          { withCredentials: true }
        );

        setRequests(res.data.data);
      } catch {
        toast.error("Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  /* ================= ACCEPT ================= */

  const handleAccept = async (id) => {
    try {
      await axios.put(
        `https://service-management-system-hj06.onrender.com/api/provider/request/accept/${id}`,
        {},
        { withCredentials: true }
      );

      toast.success("Request Accepted");

      // Optimistic UI update
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "accepted" } : req
        )
      );
    } catch {
      toast.error("Failed to accept request");
    }
  };

  /* ================= REJECT ================= */

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `https://service-management-system-hj06.onrender.com/api/provider/request/reject/${id}`,
        {},
        { withCredentials: true }
      );

      toast.success("Request Rejected");

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "rejected" } : req
        )
      );
    } catch {
      toast.error("Failed to reject request");
    }
  };

  /* ================= COMPLETE ================= */

  const handleComplete = async (id) => {
    try {
      await axios.put(
        `https://service-management-system-hj06.onrender.com/api/provider/request/complete/${id}`,
        {},
        { withCredentials: true }
      );

      toast.success("Service Completed");

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: "completed" } : req
        )
      );
    } catch {
      toast.error("Failed to complete service");
    }
  };

  if (loading) return <p className="p-6">Loading requests...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Available Requests</h2>

      <div className="grid gap-6">
        {requests.length === 0 && (
          <p className="text-gray-500">No service requests available</p>
        )}

        {requests.map((req) => (
          <div key={req._id} className="bg-white shadow p-4 rounded">
            <h3 className="font-semibold">{req.serviceType}</h3>
            <p>Client: {req.client?.name}</p>
            <p>Status: {req.status}</p>
            <p>Address: {req.serviceAddress}</p>
            <p>Date: {req.preferredDate}</p>

            <div className="flex gap-3 mt-4">
              {req.status === "pending" && (
                <>
                  <button
                    onClick={() => handleAccept(req._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(req._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </>
              )}

              {req.status === "accepted" && (
                <button
                  onClick={() => handleComplete(req._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceRequests;