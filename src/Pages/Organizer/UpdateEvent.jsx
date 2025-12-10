// src/pages/organizer/UpdateEvent.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/AxiosInstance"; // your axios instance with baseURL + token

export default function UpdateEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`/organizer/event/${eventId}`);
      console.log(event)
      setEvent(res.data.event);
      setLoading(false);
    } catch (err) {
      setError("Failed to load event");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/organizer/event/${eventId}`, event);
      navigate("/organizer/events"); // redirect to events list
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Update Event</h2>

      {error && (
        <p className="bg-red-100 text-red-700 p-2 text-center rounded mb-4">
          {error}
        </p>
      )}

      <form onSubmit={submitUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={event?.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={event?.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-24"
          />
        </div>

        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={event?.date?.split("T")[0]}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Time</label>
          <input
            type="time"
            name="time"
            value={event?.time}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Venue</label>
          <input
            type="text"
            name="venue"
            value={event?.venue}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={event?.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Max Attendees</label>
          <input
            type="number"
            name="max_attendees"
            value={event?.max_attendees}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Ticket Price ($)</label>
          <input
            type="number"
            name="ticket_price"
            value={event?.ticket_price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
