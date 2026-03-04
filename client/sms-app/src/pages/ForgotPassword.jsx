import React from 'react'
import { useState } from 'react';
import axios  from 'axios';
import { toast } from "react-toastify";



function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://service-management-system-hj06.onrender.com/api/auth/forgotPassword",
        { email }
      );

      toast.success("Reset link sent");
      console.log(res.data.resetToken); // for testing

    } catch  {
      toast.error("Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-[#ea580c] text-white px-4 py-2 rounded w-full"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword
