import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(email, password);

      const token = res.token || res.data?.token;
      const userType = res.userType || res.data?.userType;
      const firstname =
        res.firstname || res.firstName || res.data?.firstname || res.name;

      login({ token, userType, email: res.email || email, firstname });

      if (userType === "organizer") navigate("/organizer/dashboard");
      else if (userType === "attendee") navigate("/events");
      else if (userType === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-50"></div>

      <div className="relative bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-white text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg bg-white/70 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-right mt-1">
      <a
        href="/forgot-password"
        className="text-blue-300 text-sm hover:underline"
      >
        Forgot Password?
      </a>
    </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-white text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-300 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
