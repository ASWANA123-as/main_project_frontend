import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     

      {/* HERO SECTION */}
      <header  className="relative w-full flex flex-col items-center justify-center text-center p-10 text-white flex-1"
  style={{
    backgroundImage: "url('https://wallpaperaccess.com/full/11122273.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl">
          Discover, Register, and Experience Amazing Events
        </h2>
        <p className="mt-4 text-lg max-w-xl opacity-90">
          A unified platform to explore upcoming events, register seamlessly, earn loyalty points,
          and download tickets instantly.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            to="/events"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium shadow hover:bg-gray-100"
          >
            Explore Events
          </Link>
          <Link
            to="/register"
            className="bg-indigo-800 px-6 py-3 rounded-lg font-medium shadow hover:bg-indigo-900"
          >
            Welcome 
          </Link>
        </div>
      </header>

      {/* FEATURES */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          
          {/* FEATURE 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600">Browse Events</h3>
            <p className="mt-3 text-gray-600">
              Explore all upcoming events with detailed information and easy filters.
            </p>
          </div>

          {/* FEATURE 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600">Easy Registration</h3>
            <p className="mt-3 text-gray-600">
              Register for events instantly and keep track of all events you’ve joined.
            </p>
          </div>

          {/* FEATURE 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-600">Loyalty Rewards</h3>
            <p className="mt-3 text-gray-600">
              Earn points for event participation and redeem exclusive benefits.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-6 shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          © {new Date().getFullYear()} EventHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
