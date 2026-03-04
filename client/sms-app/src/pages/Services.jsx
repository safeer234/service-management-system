import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import headerimg from "../assets/images/services/header img/serviceimg.png";
import headerimg2 from "../assets/images/services/header img/serviceimg2.png";

function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  const [selectedService, setSelectedService] = useState(null);

  const [bookingData, setBookingData] = useState({
  serviceAddress: "",
  preferredDate: "",
  description: "",
});

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "https://service-management-system-hj06.onrender.com/api/services"
        );
        setServices(res.data.data);
      } catch {
        toast.error("Failed to load services");
      }
    };
    fetchServices();
  }, []);

  /* ================= FILTER ================= */
  const filteredServices = useMemo(() => {
    let updated = [...services];

    if (search) {
      updated = updated.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter) {
      updated = updated.filter((s) => s.category === categoryFilter);
    }

    if (sortOption === "priceLow") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
      updated.sort((a, b) => b.price - a.price);
    }

    return updated;
  }, [services, search, sortOption, categoryFilter]);

  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredServices.length / servicesPerPage
  );

  /* ================= BOOKING SUBMIT ================= */
 const handleBookingSubmit = async () => {

  console.log("Selected Service:", selectedService);
console.log("Category:", selectedService?.category);
  if (!selectedService) {
    toast.error("No service selected");
    return;
  }

  if (
    !bookingData.serviceAddress ||
    !bookingData.preferredDate ||
    !bookingData.description
  ) {
    toast.error("All fields are required");
    return;
  }

  const requestPayload = {
    category: selectedService.category,
    serviceType: selectedService.name,
    estimatedPrice: selectedService.price,
    serviceAddress: bookingData.serviceAddress,
    preferredDate: bookingData.preferredDate,
    description: bookingData.description,
  };

  console.log("SENDING:", requestPayload);

  try {
    await axios.post(
      "https://service-management-system-hj06.onrender.com/api/client/request",
      requestPayload,
      { withCredentials: true }
    );

    toast.success("Service booked successfully! 🎉");

    setSelectedService(null);
    setBookingData({
      serviceAddress: "",
      preferredDate: "",
      description: "",
    });

  } catch (err) {
    toast.error(err.response?.data?.message || "Booking failed ❌");
  }
};
  return (
    <div>
      {/* HEADER */}
      <header className="flex flex-col lg:flex-row items-center justify-between gap-6 px-6 lg:px-16 py-8 bg-[#ea580c] text-center lg:text-left">
        <img className="w-40 sm:w-52 lg:w-60" src={headerimg} alt="" />

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
            Our Services
          </h1>
          <p className="text-white mt-2">
            Explore top-rated services that we offer
          </p>
        </div>

        <img className="w-24 sm:w-28 lg:w-32" src={headerimg2} alt="" />
      </header>

      {/* FILTERS */}
      <div className="p-6 lg:p-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-between">
        <input
          type="text"
          placeholder="Search service..."
          className="border p-2 rounded w-full sm:w-60"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full sm:w-auto"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="priceLow">Price Low → High</option>
          <option value="priceHigh">Price High → Low</option>
        </select>

        <select
          className="border p-2 rounded w-full sm:w-auto"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Painting">Painting</option>
          <option value="Carpentry">Carpentry</option>
          <option value="AC Repair">AC Repair</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 lg:p-8">
        {currentServices.map((service) => (
          <div
            key={service._id}
            className="bg-white shadow-lg rounded-xl p-4 transition hover:scale-105 duration-300"
          >
            <img
              src={service.image}
              alt=""
              className="h-40 w-full object-cover rounded mb-3"
            />

            <h3 className="font-bold text-lg">{service.name}</h3>
            <p className="text-sm text-gray-600">
              {service.description}
            </p>

            <p className="text-[#ea580c] font-bold mt-2">
              ₹ {service.price}
            </p>

            <button
              onClick={() => {
                setSelectedService(service);
                setBookingData({
                  category: service.category,     // ✅ IMPORTANT
                  serviceType: service.name,
                  estimatedPrice: service.price,
                  serviceAddress: "",
                  preferredDate: "",
                  description: "",
                });
              }}
              className="mt-3 bg-[#ea580c] text-white px-4 py-2 rounded w-full"
            >
              Book Service
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 px-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Book {selectedService.name}
            </h2>

  <input
  placeholder="Service Address"
  className="border p-2 w-full mb-2"
  value={bookingData.serviceAddress}
  onChange={(e) =>
    setBookingData((prev) => ({
      ...prev,
      serviceAddress: e.target.value,
    }))
  }
/>

<input
  type="date"
  className="border p-2 w-full mb-2"
  value={bookingData.preferredDate}
  onChange={(e) =>
    setBookingData((prev) => ({
      ...prev,
      preferredDate: e.target.value,
    }))
  }
/>

<textarea
  placeholder="Description"
  className="border p-2 w-full mb-2"
  value={bookingData.description}
  onChange={(e) =>
    setBookingData((prev) => ({
      ...prev,
      description: e.target.value,
    }))
  }
/>


            <button
              onClick={handleBookingSubmit}
              className="bg-[#ea580c] text-white w-full py-2 rounded"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => setSelectedService(null)}
              className="mt-2 text-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;