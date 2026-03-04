import React, { useState } from "react";
import loginimg from "../assets/images/login image/repair-services-for-equipment-vehicles-and-home-maintenance.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
   const [rememberMe, setRememberMe] = useState(false);

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter valid email");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  /* ================= LOGIN ================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "https://service-management-system-hj06.onrender.com/api/auth/login",
        {...formData,rememberMe},
        { withCredentials: true }
      );

      const user = res.data.user;

      dispatch(loginSuccess(user));
      toast.success("Login successful 🎉");

      // ✅ Remember Me Logic
      

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "provider") navigate("/provider");
      else navigate("/");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 animate-fadeIn">

      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500">

        {/* IMAGE SIDE */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={loginimg}
            alt="login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* FORM SIDE */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 animate-slideUp">

          <h1 className="text-3xl font-bold mb-8">
            Log <span className="text-[#ea580c]">In</span>
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL */}
            <div className="border-b-2 border-gray-300 focus-within:border-[#ea580c] transition">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full py-2 outline-none bg-transparent"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative border-b-2 border-gray-300 focus-within:border-[#ea580c] transition">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full py-2 outline-none bg-transparent pr-10"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#ea580c]"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6a9.77 9.77 0 0 1 8.94 6 9.77 9.77 0 0 1-2.34 3.16l1.41 1.41A11.73 11.73 0 0 0 22 12a11.8 11.8 0 0 0-10-6 11.5 11.5 0 0 0-3.72.61l1.61 1.61A9.77 9.77 0 0 1 12 6z"/>
                    <path d="M2 3.27 3.28 2 22 20.72 20.73 22l-3.4-3.4A11.77 11.77 0 0 1 12 18a11.8 11.8 0 0 1-10-6 11.73 11.73 0 0 1 4.12-4.77L2 3.27z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6a9.77 9.77 0 0 1 8.94 6A9.77 9.77 0 0 1 12 18a9.77 9.77 0 0 1-8.94-6A9.77 9.77 0 0 1 12 6m0-2A11.8 11.8 0 0 0 2 12a11.8 11.8 0 0 0 10 8 11.8 11.8 0 0 0 10-8A11.8 11.8 0 0 0 12 4zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* REMEMBER ME */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>

              <span   onClick={() => navigate("/auth/forgotPassword")} className="text-[#ea580c] hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white transition duration-300 transform ${
                loading
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-[#ea580c] hover:bg-orange-600 hover:scale-[1.02]"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-[#ea580c] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>

      {/* ANIMATION STYLES */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
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

export default Login;