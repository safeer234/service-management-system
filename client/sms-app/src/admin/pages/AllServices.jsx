import React, { useEffect, useState } from "react";
import axios from "axios";

function AllServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isPopular: false,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Fetch Services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://service-management-system-hj06.onrender.com/api/services",
        { withCredentials: true }
      );

      setServices(res.data.data);
    } catch (err) {
      console.log("Fetch error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch services"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Service
  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      await axios.delete(
        `https://service-management-system-hj06.onrender.com/api/services/${id}`,
        { withCredentials: true }
      );

      setServices(services.filter((service) => service._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  // ✅ Open Edit Modal
  const startEdit = (service) => {
    setEditingService(service._id);
    setEditData({
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category,
      isPopular: service.isPopular,
    });
  };

  // ✅ Handle Edit Change
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: name === "isPopular" ? value === "true" : value,
    });
  };

  // ✅ Update Service
  const updateService = async () => {
    try {
      const res = await axios.put(
        `https://service-management-system-hj06.onrender.com/api/services/${editingService}`,
        editData,
        { withCredentials: true }
      );

      setServices(
        services.map((service) =>
          service._id === editingService ? res.data.data : service
        )
      );

      setEditingService(null);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Services</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white shadow-md rounded-xl p-4"
          >
            <img
              src={service.image}
              alt={service.name}
              className="h-40 w-full object-cover rounded-md mb-3"
            />

            {editingService === service._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="border w-full mb-2 p-1"
                />
                <input
                  type="text"
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  className="border w-full mb-2 p-1"
                />
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                  className="border w-full mb-2 p-1"
                />
                <select
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                  className="border w-full mb-2 p-1"
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Painting">Painting</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  name="isPopular"
                  value={editData.isPopular}
                  onChange={handleEditChange}
                  className="border w-full mb-2 p-1"
                >
                  <option value="true">Popular</option>
                  <option value="false">Not Popular</option>
                </select>

                <button
                  onClick={updateService}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingService(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {service.description}
                </p>

                <p className="font-bold text-[#ea580c]">
                  ₹ {service.price}
                </p>

                <p className="text-sm mt-2">
                  Category: {service.category}
                </p>

                {service.isPopular && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                    Popular
                  </span>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => startEdit(service)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteService(service._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllServices;