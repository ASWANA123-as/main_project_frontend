import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { registerEvent } from "../../api/attandee";

const PaymentSuccess = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const eventId = params.get("eventId");
  const sessionId = params.get("session_id");

  // Register user after payment
  useEffect(() => {
    if (eventId) {
      registerEvent(eventId)
        .then(() => {
          console.log("User registered successfully");
        })
        .catch(() => {
          console.log("Registration failed");
        });
    }
  }, [eventId]);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center border border-green-200">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-20 h-20 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-3">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment has been verified successfully.
        </p>

        {/* Details */}
        <div className="bg-gray-100 p-5 rounded-lg text-left space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Event ID:</span> {eventId}
          </p>
          
        </div>

        {/* Redirect / CTA */}
        <div className="mt-8">
          <Link
            to="/attendee/my-events"
            className="w-full block bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            View Registered Events
          </Link>

          <Link
            to="/attendee/events"
            className="w-full block mt-3 text-green-700 underline hover:text-green-800"
          >
            Browse More Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
