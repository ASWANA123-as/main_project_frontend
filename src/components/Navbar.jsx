// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav
      className="
        bg-gradient-to-r from-blue-700/80 via-indigo-700/80 to-purple-700/80
        backdrop-blur-lg shadow-lg border-b border-white/20
        sticky top-0 z-50
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand Logo */}
        <Link
          to="/"
          className="
            text-2xl font-bold tracking-wide 
            text-white drop-shadow 
            hover:text-gray-200 transition
          "
        >
          Book Your Event
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-white"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Menu Links */}
        <div
          className={`
            md:flex items-center gap-8 
            ${menuOpen ? "block" : "hidden"}
          `}
        >
          {/* Guest Navigation */}
          {!user && (
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0">
              <Link
                to="/login"
                className="text-white font-medium hover:text-gray-200 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white font-medium hover:text-gray-200 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Logged-in Navigation */}
          {user && (
            <div className="relative mt-4 md:mt-0">

              {/* Avatar Button */}
              <button
                onClick={toggleDropdown}
                className="
                  flex items-center gap-3 
                  hover:bg-white/10 px-4 py-2 
                  rounded-xl transition text-white
                "
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&size=40&background=2563eb&color=fff`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-white/30 shadow-md"
                />

                <div className="text-left">
                  <p className="font-semibold text-md">{user.name}</p>
                  <span className="text-xs px-2 py-1 rounded bg-white/20 text-white uppercase tracking-wide">
                    {user.usertype}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="
                    absolute right-0 mt-3 w-64
                    bg-white/95 backdrop-blur-xl
                    shadow-2xl border border-gray-200
                    rounded-2xl py-3 z-50
                    animate-scaleFade
                  "
                >
                  <div className="border-b px-5 pb-3">
                    <p className="font-semibold text-gray-800 text-lg">{user.name}</p>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 uppercase">
                      {user.usertype}
                    </span>
                  </div>

                  {/* Organizer Menu */}
                  {user.usertype === "organizer" && (
                    <>
                      <Link
                        to="/organizer/dashboard"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="text-xl">📊</span> Dashboard
                      </Link>

                      <Link
                        to="/organizer/profile"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="text-xl">👤</span> Profile
                      </Link>

                      <Link
                        to="/organizer/myevents"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="text-xl">📅</span> My Events
                      </Link>

                      <Link
                        to="/organizer/upload-docs"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="text-xl">📄</span> Upload Docs
                      </Link>
                    </>
                  )}

                  {/* Attendee Menu */}
                  {user.usertype === "attendee" && (
                    <>
                      <Link
                        to="/events"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="text-xl">🎟️</span> Browse Events
                      </Link>

                      <Link
                        to="/attendee/preferences"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="text-xl">⚙️</span> Preferences
                      </Link>

                      <Link
                        to="/attendee/loyalty"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="text-xl">⭐</span> Loyalty Points
                      </Link>
                    </>
                  )}

                  {/* Admin Menu */}
                  {user.usertype === "admin" && (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="text-xl">🛠️</span> Admin Dashboard
                      </Link>

                      <Link
                        to="/admin/organizers"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
                      >
                        <span className="text-xl">🧑‍💼</span> Organizer List
                      </Link>
                    </>
                  )}

                  <div className="border-t mt-2"></div>

                  <button
                    onClick={logout}
                    className="flex items-center gap-3 px-5 py-3 w-full text-left font-medium text-red-600 hover:bg-red-50"
                  >
                    <span className="text-xl">🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
