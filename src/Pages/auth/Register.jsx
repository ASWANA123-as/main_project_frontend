import React, { useState } from "react";
import { register as registerApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password_hash: "",
    role: "attendee",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const change = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0  bg-opacity-50"></div>

      {/* Registration Card */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-10 rounded-2xl w-full max-w-md">

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow">
          Create Your Account
        </h2>

        {/* Subtitle */}
        <p className="text-center text-sm text-gray-200 mb-8">
          Join the platform to explore events, manage your listings, or oversee system operations.
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={change}
              required
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={change}
              required
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password_hash"
              value={formData.password_hash}
              onChange={change}
              required
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Select Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={change}
              className="w-full px-4 py-2 border bg-white/80 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="attendee">Attendee – Browse and book events</option>
              <option value="organizer">Organizer – Create and manage events</option>
              <option value="admin">Admin – Manage the platform</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-all shadow-lg"
          >
            Register
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-200 mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-blue-300 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
