import React, { useEffect, useState } from "react";
import { getMyEvents, unregisterEvent } from "../../api/attandee";
import { toast } from "react-toastify";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch registered events
  const loadEvents = async () => {
    try {
      const res = await getMyEvents();
      setEvents(res.data|| []);
    } catch (err) {
      toast.error("Failed to load registered events");
    } finally {
      setLoading(false);
    }
  };

  // Cancel registration
  const handleUnregister = async (eventId) => {
    try {
      await unregisterEvent(eventId);
      toast.success("Successfully unregistered!");
      loadEvents();
    } catch (err) {
      toast.error("Unable to unregister");
    }
  };

   useEffect(() => {
     getMyEvents().then((res) => {
        console.log(res.data,'uuu')
       setEvents(res.data|| []);
     });
   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center py-10 text-lg font-medium text-gray-600">
//         Loading your registered events...
//       </div>
//     );
//   }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🎟️ My Registered Events
      </h1>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg">You haven’t registered for any events yet.</p>
          <a
            href="/attendee/events"
            className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Browse Events
          </a>
        </div>
      )}

      {/* Event List */}
      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="border rounded-xl shadow p-5 bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>

            <p className="text-gray-600 mt-2">{event.description}</p>

            <div className="mt-4">
              <p className="text-sm text-gray-700">
                📅 <b>Date:</b> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700">
                📍 <b>Location:</b> {event.location}
              </p>
            </div>

            <div className="mt-5 flex justify-between items-center">
              <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded">
                Registered
              </span>

              <button
                onClick={() => handleUnregister(event._id)}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Cancel Registration
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
