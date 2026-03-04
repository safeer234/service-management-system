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
    <div className="p-4 sm:p-6 w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Provider Verification
      </h2>

      {providers.length === 0 && (
        <p className="text-gray-500">No pending providers</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-xl p-4 sm:p-5"
          >
            <h3 className="font-semibold text-lg mb-2">
              {p.user?.username}
            </h3>

            <div className="text-sm sm:text-base space-y-1 text-gray-700">
              <p>
                <span className="font-medium">Email:</span>{" "}
                {p.user?.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {p.user?.phone}
              </p>
              <p>
                <span className="font-medium">Services:</span>{" "}
                {p.services.join(", ")}
              </p>
              <p>
                <span className="font-medium">Area:</span>{" "}
                {p.serviceArea}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={() => approve(p._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
              >
                Approve
              </button>

              <button
                onClick={() => reject(p._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderVerification;