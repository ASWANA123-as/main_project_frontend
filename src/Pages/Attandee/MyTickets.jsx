import React, { useEffect, useState } from "react";
import { getMyEvents,downloadTicket } from "../../api/attandee"; 

import { Link } from "react-router-dom";

const handleDownload = async (userId,eventId, title) => {
  try {
    const res = await downloadTicket(userId,eventId);

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}-Ticket.pdf`;
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    toast.error("Failed to download ticket");
  }
};

const MyTickets = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

//   const loadTickets = async () => {
//     try {
//       const res = await getMyEvents();
//       setEvents(res.data.events || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load tickets");
//     } finally {
//       setLoading(false);
//     }
//   };
 useEffect(() => {
     getMyEvents().then((res) => {
        console.log(res,'iiii')
       setEvents(res.data || []);
   
     });
   }, []);

//   useEffect(() => {
//     loadTickets();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center py-20">
//         <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">🎟️ My Tickets</h2>

      {events.length === 0 ? (
        <div className="text-center bg-white shadow rounded-xl p-10">
          <h3 className="text-xl font-semibold text-gray-700">No Tickets Found</h3>
          <p className="text-gray-500 mt-2">You haven’t registered for any event yet.</p>
          <Link
            to="/attendee/events"
            className="inline-block mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 shadow rounded-xl hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>

              <p className="text-gray-600 mt-1">{event.description}</p>

              <div className="mt-3 text-sm text-gray-500">
                📅 {new Date(event.date).toDateString()}  
              </div>

              <div className="mt-1 text-sm text-gray-500">
                📍 {event.location}
              </div>

              <div className="mt-4">
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                  Ticket Confirmed
                </span>
              </div>

              <button
  onClick={() => handleDownload(event.attendees[0], event._id, event.title)}
  className="mt-5 px-4 py-2 w-full bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
>
  Download Ticket
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTickets;
