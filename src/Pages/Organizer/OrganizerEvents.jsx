import React, { useEffect, useState } from "react";
import { getOrganizerEvents, deleteEvent } from "../../api/organizer";
import { Link } from "react-router-dom";

export default function OrganizerEvents() {
  const [events, setEvents] = useState([]);

  const load = async () => {
    const res = await getOrganizerEvents();
    console.log(res,'res')
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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Events</h2>

      <Link
        to="/organizer/create-event"
        className="bg-blue-600 text-white px-3 py-2 rounded"
      >
        Create New Event
      </Link>

      <ul className="mt-4 space-y-3">
        {events?.map((ev) => (
          <li key={ev._id} className="border p-4 rounded flex justify-between">
            <span>{ev.title}</span>

            <div className="space-x-3">
              <Link
                to={`/organizer/event/${ev._id}`}
                className="text-blue-600"
              >
                Edit
              </Link>

              <button
                onClick={() => remove(ev._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
