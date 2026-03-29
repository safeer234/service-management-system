import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Payment() {

  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return <p className="p-6 text-center">No booking selected</p>;
  }

 const handlePayment = async () => {
  try {
    const token = localStorage.getItem("token");

    // 1. Create order
    const { data } = await axios.post(
      "https://service-management-system-hj06.onrender.com/api/payment/create-order",
      { serviceRequestId: booking._id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const order = data.order;

    // 2. Load Razorpay script
    const options = {
      key: "rzp_test_xxxx", // your key
      amount: order.amount,
      currency: "INR",
      name: "ServiceHub",
      description: booking.serviceType,
      order_id: order.id,

      handler: async function (response) {

        // 3. Verify payment
        await axios.post(
          "https://service-management-system-hj06.onrender.com/api/payment/verify",
          {
            ...response,
            serviceRequestId: booking._id
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        toast.success("Payment Successful 🎉");
        navigate("/paymentSuccess");
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log(err);
    toast.error("Payment failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="grid lg:grid-cols-2 gap-6 w-full max-w-4xl">

        {/* LEFT SIDE - ORDER DETAILS */}

        <div className="bg-white shadow-lg rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Booking Summary
          </h2>

          <div className="space-y-3 text-gray-600">

            <div className="flex justify-between">
              <span>Service</span>
              <span className="font-medium">{booking.serviceType}</span>
            </div>

            <div className="flex justify-between">
              <span>Address</span>
              <span className="text-right max-w-50">
                {booking.serviceAddress}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Date</span>
              <span>
                {new Date(booking.preferredDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-yellow-600 font-medium">
                Pending Payment
              </span>
            </div>

          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total Amount</span>
            <span className="text-[#ea580c]">
              ₹ {booking.estimatedPrice}
            </span>
          </div>

        </div>


        {/* RIGHT SIDE - PAYMENT CARD */}

        <div className="bg-white shadow-xl rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4 text-center">
            Secure Payment
          </h2>

          <div className="bg-gray-50 border rounded-lg p-4 mb-6">

            <p className="text-sm text-gray-500 mb-2">
              Paying for
            </p>

            <p className="font-semibold">
              {booking.serviceType}
            </p>

            <p className="text-sm text-gray-500">
              {booking.serviceAddress}
            </p>

          </div>

          {/* Payment Method UI */}

          <div className="space-y-3 mb-6">

            <div className="border rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-[#ea580c]">

              <span className="font-medium">UPI Payment</span>

              <span className="text-gray-400 text-sm">
                Recommended
              </span>

            </div>

            <div className="border rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-[#ea580c]">

              <span className="font-medium">Debit / Credit Card</span>

              <span className="text-gray-400 text-sm">
                Visa / MasterCard
              </span>

            </div>

            <div className="border rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-[#ea580c]">

              <span className="font-medium">Net Banking</span>

              <span className="text-gray-400 text-sm">
                All banks
              </span>

            </div>

          </div>


          {/* Pay Button */}

          <button
            onClick={handlePayment}
            className="w-full py-3 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:opacity-90 transition"
          >
            Pay ₹ {booking.estimatedPrice}
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full mt-3 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            🔒 Your payment is secured with end-to-end encryption
          </p>

        </div>

      </div>

    </div>
  );
}

export default Payment;