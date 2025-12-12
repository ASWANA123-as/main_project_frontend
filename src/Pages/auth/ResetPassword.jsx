import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`/auth/reset-password/${token}`, { password });
      setMessage("Your password has been reset successfully.");
      
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(
        err?.response?.data?.message || "Invalid or expired link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleReset}>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            required
            className="w-full border p-3 rounded-lg mt-1 focus:ring focus:ring-blue-300"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            required
            className="w-full border p-3 rounded-lg mt-1 focus:ring focus:ring-blue-300"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-5 font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p className="text-center text-gray-700 font-medium mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
