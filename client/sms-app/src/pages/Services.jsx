import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";   // ✅ ADD THIS
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
    serviceType: "",
    serviceAddress: "",
    preferredDate: "",
    estimatedPrice: "",
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
      } catch (err) {
        console.log(err);
        toast.error("Failed to load services");  // ✅ Toast error
      }
    };

    fetchServices();
  }, []);

  /* ================= FILTER + SORT ================= */

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

  /* ================= PAGINATION ================= */

  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredServices.length / servicesPerPage
  );

  /* ================= BOOKING ================= */

  const handleBookingSubmit = async () => {
    try {
      await axios.post(
        "https://service-management-system-hj06.onrender.com/api/client/request",
        bookingData,
        { withCredentials: true }
      );

      toast.success("Service booked successfully! 🎉");  // ✅ SUCCESS TOAST
      setSelectedService(null);

    } catch (err) {
      console.error("Booking Error:", err);
      toast.error(
        err.response?.data?.message || "Booking failed ❌"
      );  // ✅ ERROR TOAST
    }
  };

  /* ================= UI ================= */

  return (
    <div>
      {/* HEADER */}
      <header className="flex items-center gap-80 px-10 py-5 bg-[#ea580c]">
        <div>
          <img className="w-60" src={headerimg} alt="" />
        </div>
        <div>
          <h1 className="text-5xl text-white">Our Services</h1>
          <p className="text-white">
            Explore top-rated services that we offer
          </p>
        </div>
        <div className="px-20">
          <img className="w-30" src={headerimg2} alt="" />
        </div>
      </header>

      {/* FILTERS */}
      <div className="p-8 flex flex-wrap gap-4 justify-between">
        <input
          type="text"
          placeholder="Search service..."
          className="border p-2 rounded w-60"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="priceLow">Price Low → High</option>
          <option value="priceHigh">Price High → Low</option>
        </select>

        <select
          className="border p-2 rounded"
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
      <div className="grid grid-cols-3 gap-6 p-8">
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

            <div className="text-yellow-400 mt-2">⭐⭐⭐⭐☆</div>

            <button
              onClick={() => {
                setSelectedService(service);
                setBookingData({
                  ...bookingData,
                  serviceType: service.name,
                  estimatedPrice: service.price,
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
      <div className="flex justify-center gap-2 mb-10">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className="px-3 py-1 border rounded"
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">
              Book {selectedService.name}
            </h2>

            <input
              placeholder="Service Address"
              className="border p-2 w-full mb-2"
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  serviceAddress: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="border p-2 w-full mb-2"
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  preferredDate: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              className="border p-2 w-full mb-2"
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  description: e.target.value,
                })
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