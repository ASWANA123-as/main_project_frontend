import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white">EventPro</h2>
          <p className="mt-3 text-gray-400">
            Your all-in-one platform for event discovery, registration, and management.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/browse-events" className="hover:text-white">Events</Link></li>
            <li><Link to="/my-registrations" className="hover:text-white">My Registrations</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p>Email: support@eventpro.com</p>
          <p className="mt-2">Phone: +91 234 567 890</p>
          <p className="mt-2">Address: 123 Event Lane, Tech City</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} EventPro. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
