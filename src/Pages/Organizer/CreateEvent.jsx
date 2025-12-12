// src/pages/organizer/CreateEvent.jsx

import React, { useState } from "react";
import axios from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    max_attendees: "",
    ticket_price: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdEvent, setCreatedEvent] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/organizer/event", form);
      setCreatedEvent(res.data.data);
      setShowSuccess(true);
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Event creation failed",
      });
    }

    setLoading(false);
  };

  // SUCCESS SCREEN UI
  const SuccessScreen = () => {
    if (!createdEvent) return null;

    return (
      <div className="min-h-screen flex justify-center items-center px-4 py-12 bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-10 text-center transform transition-all animate-fadeIn">

          <h2 className="text-4xl font-extrabold text-green-700 mb-4">
            Event Created!
          </h2>

          <p className="text-gray-600 mb-8">
            Your event is successfully created and will now appear in your dashboard.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border space-y-4 text-left shadow-inner">
            <p><strong>Title:</strong> {createdEvent.title}</p>
            <p><strong>Description:</strong> {createdEvent.description}</p>
            <p><strong>Date:</strong> {createdEvent.date}</p>
            <p><strong>Time:</strong> {createdEvent.time}</p>
            <p><strong>Venue:</strong> {createdEvent.venue}</p>
            <p><strong>Category:</strong> {createdEvent.category}</p>
            <p><strong>Max Attendees:</strong> {createdEvent.max_attendees}</p>
            <p><strong>Ticket Price:</strong> ${createdEvent.ticket_price}</p>
          </div>

          <button
            onClick={() => navigate("/organizer/dashboard")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl font-semibold shadow-md transition"
          >
            Go to Dashboard
          </button>

        </div>
      </div>
    );
  };

  return (
    <Layout>

      {showSuccess ? (
        <SuccessScreen />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center px-4 py-10">

          <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10">

            <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
              Create a New Event
            </h1>

            {msg && (
              <div
                className={`p-3 mb-4 rounded-lg shadow-sm ${
                  msg.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {msg.text}
              </div>
            )}

            <form onSubmit={submit} className="space-y-6">

              {/* Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={form.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Venue */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  value={form.venue}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Music">Music</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Art">Art</option>
                </select>
              </div>

              {/* Attendees & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    name="max_attendees"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    value={form.max_attendees}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Ticket Price ($)
                  </label>
                  <input
                    type="number"
                    name="ticket_price"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    value={form.ticket_price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
              >
                {loading ? "Creating Event..." : "Create Event"}
              </button>

            </form>
          </div>

        </div>
      )}
    </Layout>
  );
}
