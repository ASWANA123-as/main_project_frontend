import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          EventHub
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link 
            to="/browse-events" 
            className="hover:text-indigo-600 transition"
          >
            Events
          </Link>

          <Link 
            to="/dashboard" 
            className="hover:text-indigo-600 transition"
          >
            Dashboard
          </Link>

          <Link 
            to="/profile" 
            className="hover:text-indigo-600 transition"
          >
            Profile
          </Link>
        </nav>

        {/* Login / Logout Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link 
            to="/login" 
            className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
