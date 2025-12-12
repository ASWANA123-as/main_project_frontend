import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">

      {/* Header (optional) */}
      {/* <Header /> */}

      {/* Theme Toggle Positioned Top-Right */}
      <div className="w-full flex justify-end px-6 py-4">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <main className="flex-grow px-6 py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
