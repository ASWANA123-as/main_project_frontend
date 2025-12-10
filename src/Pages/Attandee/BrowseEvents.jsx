import React, { useEffect, useState } from "react";
import { getAllEvents, registerEvent,Paymentcheckout } from "../../api/attandee";


export default function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const handlePayment = async (eventId,event) => {
  try {
    
  
  const res = await Paymentcheckout(eventId,{eventId:eventId,amount:event.ticket_price});
    window.location.href = res.data.url;  
     
  const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement, // Stripe Card Element
    },
  });
  console.log(paymentIntent,'iiiioooppp')
  if (error) {
    console.error("Payment failed:", error.message);
    return;
  }

  if (paymentIntent.status === "succeeded") {
    console.log("Payment Success");

    // 3. Register user AFTER payment success
    await registerEvent(eventId);
  }
} // redirect to Stripe
   catch (err) {
    console.error(err);
    alert("Payment failed to start");
  }
};

   useEffect(() => {
     getAllEvents().then((res) => {
        console.log(res,'iiii')
       setEvents(res.data.events || []);
      setFiltered(res.data.events || []);
     });
   }, []);

  const loadEvents = async () => {
    try {
        console.log('ttttt')
      const res = await getAllEvents();
      setEvents(res.data.events || []);
      setFiltered(res.data.events || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    filterEvents(value, category);
  };

  const handleCategory = (value) => {
    setCategory(value);
    filterEvents(search, value);
  };

  const filterEvents = (searchTerm, cat) => {
    let filteredList = events;

    if (cat !== "all") {
      filteredList = filteredList.filter((e) => e.category === cat);
    }

    if (searchTerm.trim() !== "") {
      filteredList = filteredList.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(filteredList);
  };

  const handleRegister = async (eventId) => {
    try {
      await registerEvent(eventId);
      toast.success("Registered Successfully!");
    } catch (err) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="px-6 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Events</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => handleCategory(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="all">All Categories</option>
          <option value="Music">Music</option>
          <option value="business">Business</option>
          <option value="tech">Tech</option>
          <option value="sports">Sports</option>
          <option value="education">Education</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-lg p-5 border hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold text-blue-600">{event.title}</h2>
            <p className="text-gray-700 mt-2 line-clamp-2">{event.description}</p>

            <div className="mt-3">
              <p className="text-sm text-gray-500">
                📅 {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">📌 {event.location}</p>
              <p className="text-sm text-gray-500">
                🎭 Category: <span className="font-medium">{event.category}</span>
              </p>
            </div>

            <button
  onClick={() => handlePayment(event._id,event)}
  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
>
  Register & Pay
</button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No events found.</p>
      )}
    </div>
  );
}
