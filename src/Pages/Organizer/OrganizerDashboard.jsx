import React, { useEffect, useState } from "react";
import axios from "../../api/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";

export default function OrganizerDashboard() {
  const [stats, setStats] = useState({});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch events created by organizer
  const fetchData = async () => {
    try {
      const eventRes = await axios.get("/organizer/events");
      setEvents(eventRes.data.data || []);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-xl">Loading Dashboard...</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
        <Link
          to="/organizer/create-event"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Event
        </Link>
      </div>

      {/* Events List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Your Events</h2>

        {events.length === 0 ? (
          <p className="text-gray-500">You haven't created any events yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="border p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>

                <p className="mt-2 text-sm text-gray-700">
                  <strong>Date:</strong> {event.date?.split("T")[0]}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Venue:</strong> {event.venue}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      navigate(`/organizer/event/${event._id}`)
                    }
                    className="bg-yellow-500 px-3 py-1 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => navigate(`/organizer/event/${event._id}`)}
                    className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-600"
                  >
                    View
                  </button>

                  <button
                    onClick={() => navigate(`/organizer/event/${event._id}`)}
                    className="bg-red-600 px-3 py-1 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
