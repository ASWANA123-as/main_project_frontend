import React, { useEffect, useState } from "react";
import { getOrganizerEvents, deleteEvent } from "../../api/organizer";
import { Link } from "react-router-dom";

export default function OrganizerEvents() {
  const [events, setEvents] = useState([]);

  const load = async () => {
    const res = await getOrganizerEvents();
    setEvents(res.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    await deleteEvent(id);
    load();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-semibold text-gray-800">
            My Events
          </h2>

          <Link
            to="/organizer/create-event"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow transition"
          >
            Create New Event
          </Link>
        </div>

        {/* Events List */}
        <div className="space-y-5">
          {events.map((ev) => (
            <div
              key={ev._id}
              className="bg-white shadow-md hover:shadow-lg transition p-6 rounded-xl border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {ev.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {ev.category || "Uncategorized"}
                  </p>
                </div>

                <div className="space-x-4 flex items-center">

                  <Link
                    to={`/organizer/event/${ev._id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => remove(ev._id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                  >
                    Delete
                  </button>

                </div>
              </div>

              {/* Optional Event Meta */}
              <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Date:</span> {ev.date || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {ev.location || "Not specified"}
                </p>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-center py-20 text-gray-500 text-lg bg-white rounded-xl shadow-sm border">
              No events created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
