import React, { useState } from "react";
import signupimg from "../assets/images/signup img/packing-and-moving-services.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    role: "client",
    services: [],
    serviceArea: "",
  });

  const [customService, setCustomService] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
 

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error("Enter valid phone number");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter valid email");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (formData.role === "provider") {
      if (formData.services.length === 0) {
        toast.error("Select at least one service");
        return false;
      }

      if (!formData.serviceArea.trim()) {
        toast.error("Service area is required");
        return false;
      }
    }

    return true;
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    if (selected.includes("Other")) {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setCustomService("");
    }

    const filtered = selected.filter((s) => s !== "Other");

    setFormData({
      ...formData,
      services: filtered,
    });
  };

  const addCustomService = () => {
    if (!customService.trim()) {
      toast.error("Enter custom service name");
      return;
    }

    setFormData({
      ...formData,
      services: [...formData.services, customService.trim()],
    });

    setCustomService("");
    toast.success("Service added");
  };

  /* ================= SIGNUP ================= */

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await axios.post(
        "https://service-management-system-hj06.onrender.com/api/auth/signup",
        formData,
        { withCredentials: true }
      );

      toast.success("Account created successfully 🎉");
      navigate("/auth/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 animate-fadeIn">

      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500">

        {/* IMAGE SIDE */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={signupimg}
            alt="signup"
            className="h-full w-full object-cover"
          />
        </div>

        {/* FORM SIDE */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 animate-slideUp">

          <h1 className="text-3xl font-bold mb-8">
            Sign <span className="text-[#ea580c]">Up</span>
          </h1>

          <form onSubmit={handleSignup} className="space-y-5">

            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-[#ea580c] outline-none py-2"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-[#ea580c] outline-none py-2"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-[#ea580c] outline-none py-2"
            />

            {/* Password with Eye */}
            <div className="relative border-b-2 border-gray-300 focus-within:border-[#ea580c] transition">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 outline-none bg-transparent pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#ea580c]"
              >
                👁️
              </button>
            </div>

            {/* Role */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="client">Client</option>
              <option value="provider">Provider</option>
            </select>

            {/* Provider Fields */}
            {formData.role === "provider" && (
              <div className="space-y-3 animate-fadeIn">

                <select
                  multiple
                  className="w-full border p-2 h-28 rounded"
                  onChange={handleServiceChange}
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Painting">Painting</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="AC Repair">AC Repair</option>
                  <option value="Other">Other</option>
                </select>

                {showCustomInput && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      placeholder="Enter custom service"
                      className="border p-2 flex-1 rounded"
                    />
                    <button
                      type="button"
                      onClick={addCustomService}
                      className="bg-[#ea580c] text-white px-3 rounded hover:bg-orange-600"
                    >
                      Add
                    </button>
                  </div>
                )}

                <input
                  type="text"
                  name="serviceArea"
                  placeholder="Service Area (City)"
                  value={formData.serviceArea}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white transition duration-300 transform ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-[#ea580c] hover:bg-orange-600 hover:scale-[1.02]"
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-[#ea580c] font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>

        </div>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
          .animate-slideUp {
            animation: slideUp 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

    </div>
  );
}

export default Signup;