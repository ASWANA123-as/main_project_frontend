import React, { useEffect, useState } from "react";
import { getLoyaltyPoints, addLoyaltyPoints } from "../../api/attandee";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const LoyaltyPoints = () => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Fetch loyalty points
  const loadPoints = async () => {
    try {
      const res = await getLoyaltyPoints();
      setPoints(res.data.loyaltyPoints);
    } catch (err) {
      toast.error("Failed to load loyalty points");
    } finally {
      setLoading(false);
    }
  };

  // Add points
  const handleAddPoints = async () => {
    const pointsToAdd = 10; // or whatever your field name is

  console.log("Sending Points:", pointsToAdd); 
    try {
      setAdding(true);
      const res = await addLoyaltyPoints({ points: pointsToAdd });
      toast.success("Points added successfully!");
      setPoints(res.data.points);
    } catch (err) {
      toast.error("Error adding points");
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    loadPoints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* <ToastContainer /> */}

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-5 text-center">
          🎉 Loyalty Points
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading your points...</p>
        ) : (
          <>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-indigo-600">{points}</h3>
              <p className="text-gray-500 mt-2">Total Points Earned</p>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Progress to next reward 🎁
              </p>

              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all"
                  style={{ width: `${(points % 100)}%` }}
                ></div>
              </div>

              <p className="text-right text-gray-600 text-xs mt-1">
                {points % 1000}/1000
              </p>
            </div>

            {/* Add points button */}
            <button
              onClick={handleAddPoints}
              disabled={adding}
              className="mt-8 w-full bg-indigo-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
              {adding ? "Adding..." : "Add Loyalty Points"}
            </button>

            {/* Rewards */}
            <div className="mt-10">
              <h4 className="text-xl font-semibold text-gray-700 mb-3">
                Rewards You Can Unlock ⭐
              </h4>

              <ul className="space-y-3">
                <li className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                  🎟️ <b>Free Event Ticket</b> — 500 pts
                </li>
                <li className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  ☕ <b>Free Food Coupon</b> — 200 pts
                </li>
                <li className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  🎁 <b>Exclusive Goodie Bag</b> — 800 pts
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoyaltyPoints;
