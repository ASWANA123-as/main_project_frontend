import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition">
      {/* <Header/> */}
<ThemeToggle/>
      <main className="flex-grow bg-gray-50 px-6 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
