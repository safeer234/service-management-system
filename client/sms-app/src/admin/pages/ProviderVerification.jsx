import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ProviderVerification() {
  const [providers, setProviders] = useState([]);

  /* ================= FETCH PROVIDERS ================= */

  const fetchProviders = async () => {
    try {
      const res = await axios.get(
        "https://service-management-system-hj06.onrender.com/api/admin/providers/pending",
        { withCredentials: true }
      );

      setProviders(res.data.data);
    } catch {
      toast.error("Failed to load providers");
    }
  };

  /* ================= USE EFFECT ================= */

  useEffect(() => {
  const loadProviders = async () => {
    try {
      const res = await axios.get(
        "https://service-management-system-hj06.onrender.com/api/admin/providers/pending",
        { withCredentials: true }
      );

      setProviders(res.data.data);
    } catch {
      toast.error("Failed to load providers");
    }
  };

  loadProviders();
}, []);
  /* ================= APPROVE ================= */

  const approve = async (id) => {
    try {
      await axios.put(
        `https://service-management-system-hj06.onrender.com/api/admin/provider/approve/${id}`,
        {},
        { withCredentials: true }
      );

      toast.success("Provider Approved");
      fetchProviders();
    } catch {
      toast.error("Approval failed");
    }
  };

  /* ================= REJECT ================= */

  const reject = async (id) => {
    try {
      await axios.put(
        `https://service-management-system-hj06.onrender.com/api/admin/provider/reject/${id}`,
        {},
        { withCredentials: true }
      );

      toast.success("Provider Rejected");
      fetchProviders();
    } catch {
      toast.error("Rejection failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Provider Verification
      </h2>

      {providers.length === 0 && (
        <p>No pending providers</p>
      )}

      {providers.map((p) => (
        <div key={p._id} className="bg-white shadow p-4 mb-4 rounded">
          <h3 className="font-semibold">
            {p.user?.username}
          </h3>

          <p>Email: {p.user?.email}</p>
          <p>Phone: {p.user?.phone}</p>
          <p>Services: {p.services.join(", ")}</p>
          <p>Area: {p.serviceArea}</p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => approve(p._id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => reject(p._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProviderVerification;