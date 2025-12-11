import React from "react";
import { Link } from "react-router-dom";


const AttendeeHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      
      {/* Container */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🎟️ Attendee Dashboard
        </h1>
        <p className="text-gray-500 text-center mb-10">
          Manage your events, profile, tickets & preferences easily.
        </p>

        {/* Grid Menu */}
        <div className="grid sm:grid-cols-2 gap-6">

          {/* Profile */}
          <Link
            to="/profile"
            className="flex items-center p-5 bg-gray-100 hover:bg-gray-200 rounded-xl shadow-sm transition"
          >
            {/* <User className="w-8 h-8 text-indigo-600 mr-4" /> */}
            <span className="text-lg font-medium text-gray-700">My Profile</span>
          </Link>

          {/* Browse Events */}
          <Link
            to="/attendee/events"
            className="flex items-center p-5 bg-gray-100 hover:bg-gray-200 rounded-xl shadow-sm transition"
          >
            {/* <Calendar className="w-8 h-8 text-green-600 mr-4" /> */}
            <span className="text-lg font-medium text-gray-700">Browse Events</span>
          </Link>

          {/* Registered Events */}
          <Link
            to="/attendee/my-events"
            className="flex items-center p-5 bg-gray-100 hover:bg-gray-200 rounded-xl shadow-sm transition"
          >
            // <List className="w-8 h-8 text-blue-600 mr-4" />
            <span className="text-lg font-medium text-gray-700">My Registered Events</span>
          </Link>

          {/* Tickets */}
          <Link
            to="/attendee/tickets"
            className="flex items-center p-5 bg-gray-100 hover:bg-gray-200 rounded-xl shadow-sm transition"
          >
            <Ticket className="w-8 h-8 text-red-600 mr-4" />
            <span className="text-lg font-medium text-gray-700">My Tickets</span>
          </Link>

          {/* Preferences */}
          <Link
            to="/attendee/preferences"
            className="flex items-center p-5 bg-gray-100 hover:bg-gray-200 rounded-xl shadow-sm transition"
          >
            <Star className="w-8 h-8 text-yellow-500 mr-4" />
            <span className="text-lg font-medium text-gray-700">Preferences</span>
          </Link>
           <Link
            to="/attendee/loyalty"
            className="flex items-center p-5 bg-gray-100 hover:bg-gray-200 rounded-xl shadow-sm transition"
          >
            {/* <Calendar className="w-8 h-8 text-green-600 mr-4" /> */}
            <span className="text-lg font-medium text-gray-700">Loyalty Points</span>
          </Link>

          {/* Logout */}
          <Link
            to="/logout"
            className="flex items-center p-5 bg-gray-100 hover:bg-gray-200 rounded-xl shadow-sm transition"
          >
            <LogOut className="w-8 h-8 text-gray-600 mr-4" />
            <span className="text-lg font-medium text-gray-700">Logout</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AttendeeHome;
