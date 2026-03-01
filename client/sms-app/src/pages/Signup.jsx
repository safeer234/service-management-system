import React, { useState } from "react";
import signupimg from "../assets/images/signup img/packing-and-moving-services.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
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
    if (!customService.trim()) return;

    setFormData({
      ...formData,
      services: [...formData.services, customService.trim()],
    });

    setCustomService("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await axios.post(
        "https://service-management-system-hj06.onrender.com/api/auth/signup",
        formData,
        { withCredentials: true }
      );

      navigate("/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="flex w-200 shadow-lg">

        {/* Image */}
        <div>
          <img className="h-100" src={signupimg} alt="signup" />
        </div>

        {/* Form */}
        <div className="p-8 w-full">
          <h1 className="text-2xl font-semibold mb-6">
            Sign <span className="text-orange-600">Up</span>
          </h1>

          <form onSubmit={handleSignup}>

            <input
              className="w-full mb-4 border-b-2 p-2 outline-none"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <input
              className="w-full mb-4 border-b-2 p-2 outline-none"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              className="w-full mb-4 border-b-2 p-2 outline-none"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              className="w-full mb-4 border-b-2 p-2 outline-none"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <select
              className="w-full mb-4 p-2 border"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="client">Client</option>
              <option value="provider">Provider</option>
            </select>

            {/* Provider Fields */}
            {formData.role === "provider" && (
              <>
                <select
                  multiple
                  className="w-full border p-2 mb-3 h-32"
                  onChange={handleServiceChange}
                >
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Painter">Painter</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Other">Other</option>
                </select>

                {showCustomInput && (
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      placeholder="Enter custom service"
                      className="border p-2 flex-1"
                    />
                    <button
                      type="button"
                      onClick={addCustomService}
                      className="bg-orange-600 text-white px-3 rounded"
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
                  className="w-full border p-2 mb-3"
                  required
                />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {error && (
              <p className="text-red-500 text-center mt-3">{error}</p>
            )}
          </form>

          <p className="text-center mt-4 text-orange-600">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;