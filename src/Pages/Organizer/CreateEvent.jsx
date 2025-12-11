// src/pages/organizer/CreateEvent.jsx
import React, { useState } from "react";
import axios from "../../api/AxiosInstance"; // your axios instance
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

      setCreatedEvent(res.data.data); // store event returned by backend
setShowSuccess(true);   
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Event creation failed",
      });
    }

    setLoading(false);
  };
const SuccessScreen = () => {
  if (!createdEvent) return null;

  return (
    <div className="max-w-2xl mx-auto p-10 bg-white shadow-lg rounded-lg text-center">

      <h2 className="text-3xl font-bold text-green-700 mb-4">
        Event Created Successfully!
      </h2>

      <p className="text-gray-600 mb-6">
        Your event has been created and is now available in your organizer dashboard.
      </p>

      <div className="text-left space-y-3 bg-gray-50 p-6 rounded border">
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
        onClick={() => navigate("organizer/dashboard")}
        className="mt-8 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        Go to My Events
      </button>
    </div>
  );
};

  return (
    <Layout>
      {showSuccess ? (
      <SuccessScreen />
    ): (<div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>

      {/* Message */}
      {msg && (
        <div
          className={`p-3 mb-4 rounded ${
            msg.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded p-2"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border rounded p-2"
            rows="3"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              className="w-full border rounded p-2"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Time</label>
            <input
              type="time"
              name="time"
              className="w-full border rounded p-2"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Venue</label>
          <input
            type="text"
            name="venue"
            className="w-full border rounded p-2"
            value={form.venue}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            className="w-full border rounded p-2"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Max Attendees</label>
            <input
              type="number"
              name="max_attendees"
              className="w-full border rounded p-2"
              value={form.max_attendees}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Ticket Price ($)</label>
            <input
              type="number"
              name="ticket_price"
              className="w-full border rounded p-2"
              value={form.ticket_price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>)}

    </Layout>
   
  );
}
