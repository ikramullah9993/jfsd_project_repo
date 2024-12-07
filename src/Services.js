import React from "react";
import "./index.css";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/static/handi.avif"
              alt="Platform Logo"
              className="h-10 w-10 mr-3"
            />
            <h1 className="text-xl font-bold text-blue-800">Craft Platform</h1>
          </div>

          {/* Navigation for Desktop */}
          <nav className="hidden md:flex space-x-6 items-center">
            <a
              href="/"
              className="text-blue-700 hover:text-blue-900 transition"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-blue-700 hover:text-blue-900 transition"
            >
              About
            </a>
            <a
              href="/services"
              className="text-blue-700 hover:text-blue-900 transition"
            >
              Services
            </a>
            <a
              href="#"
              className="text-blue-700 hover:text-blue-900 transition"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto px-4 py-8 text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">Our Services</h2>
        <p className="text-xl text-blue-600 mb-6">
          Bringing Artisans and Handicrafts Together
        </p>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <p className="text-gray-700">
            We offer a variety of services to support artisans, promote cultural
            heritage, and connect buyers and sellers in the world of handcrafted
            goods. Our services include:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Marketplace for selling traditional handicrafts</li>
            <li>Artisan workshops and cultural exchange programs</li>
            <li>Promotion of handcrafted goods at exhibitions and fairs</li>
            <li>Networking opportunities for artisans and culturalists</li>
            <li>Support for sustainable and eco-friendly crafting practices</li>
          </ul>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Craft Platform. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Services;
