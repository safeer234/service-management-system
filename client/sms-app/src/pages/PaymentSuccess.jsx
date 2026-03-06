import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccess() {

  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount;

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate("/bookings");
    }, 4000);

    return () => clearTimeout(timer);

  }, [navigate]);

  return (

    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-xl text-center w-87.5">

        {/* Success Animation */}
        <div className="flex justify-center mb-4">

          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-pulse">

            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>

          </div>

        </div>

        <h2 className="text-2xl font-semibold text-green-600 mb-2">
          Payment Successful
        </h2>

        <p className="text-gray-600 mb-4">
          Your payment has been processed successfully.
        </p>

        <p className="text-xl font-bold text-[#ea580c]">
          ₹ {amount}
        </p>

        <p className="text-sm text-gray-400 mt-4">
          Redirecting to bookings...
        </p>

      </div>

    </div>

  );
}

export default PaymentSuccess;