import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, LogIn, User, ChevronDown } from 'lucide-react';

const HomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userRoles = [
    {
      name: "Admin",
      description:
        "Manage platform content, monitor transactions, and resolve issues",
      route: "/admin",
    },
    {
      name: "Artisan",
      description:
        "Create and update product listings, manage orders, and communicate with customers",
      route: "/LoginSeller",
    },
    {
      name: "Customer",
      description:
        "Explore and purchase handcrafted items, provide reviews, and participate in promotions",
      route: "/login",
    },
    {
      name: "Cultural Consultant",
      description:
        "Ensure that the content accurately represents the traditional crafts and heritage",
      route: "/LoginCulturalist",
    },
  ];

  const handleLogin = (route) => {
    // In a real application, this would use React Router or Next.js routing
    window.location.href = route;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return React.createElement(
    "div",
    {
      className:
        "min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex flex-col",
    },
    React.createElement(
      "header",
      { className: "flex justify-between items-center p-4 px-8" },
      React.createElement("div", { className: "w-1/3" }),
      React.createElement(
        "h1",
        { className: "text-2xl font-bold text-center text-gray-800" },
        "Handi-Craft Platform"
      ),
      React.createElement(
        "div",
        { className: "w-1/3 flex justify-end relative", ref: dropdownRef },
        React.createElement(
          "button",
          {
            onClick: () => setIsDropdownOpen(!isDropdownOpen),
            className:
              "bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition flex items-center",
          },
          React.createElement(LogIn, { className: "mr-2" }),
          "Login",
          React.createElement(ChevronDown, { className: "ml-2" })
        ),
        isDropdownOpen &&
          React.createElement(
            "div",
            {
              className:
                "absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border z-50",
            },
            userRoles.map((role) =>
              React.createElement(
                "div",
                {
                  key: role.name,
                  onClick: () => {
                    handleLogin(role.route);
                    setIsDropdownOpen(false);
                  },
                  className:
                    "px-4 py-3 hover:bg-amber-50 cursor-pointer border-b last:border-b-0",
                },
                React.createElement(
                  "div",
                  { className: "font-semibold flex items-center" },
                  React.createElement(User, {
                    className: "mr-2 text-amber-600",
                  }),
                  role.name
                ),
                React.createElement(
                  "p",
                  { className: "text-xs text-gray-500 mt-1" },
                  role.description
                )
              )
            )
          )
      )
    ),
    React.createElement(
      "div",
      {
        className:
          "container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between",
      },
      React.createElement(
        "div",
        { className: "lg:w-1/2 text-left mb-10 lg:mb-0" },
        React.createElement(
          "h1",
          {
            className:
              "text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight",
          },
          "Weaving Traditions, ",
          React.createElement("br"),
          "Crafting Memories"
        ),
        React.createElement(
          "p",
          { className: "text-xl text-gray-600 mb-8" },
          "Discover the rich heritage of handloom crafts. Each piece tells a story of artisan skill, cultural legacy, and sustainable craftsmanship."
        ),
        React.createElement(
          "div",
          { className: "flex space-x-4" },
          React.createElement(
            "button",
            {
              className:
                "bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition flex items-center",
            },
            "Explore Collections",
            React.createElement(ArrowRight, { className: "ml-2" })
          ),
          React.createElement(
            "button",
            {
              className:
                "border-2 border-amber-500 text-amber-600 px-6 py-3 rounded-lg hover:bg-amber-50 transition",
            },
            "About Our Artisans"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "lg:w-1/2 flex justify-center" },
        React.createElement(
          "div",
          { className: "relative" },
          React.createElement("div", {
            className:
              "absolute -inset-4 bg-amber-300 rounded-full opacity-30 blur-xl",
          }),
          React.createElement("img", {
            src: "./static/main.jpg",
            alt: "Handloom Weaving",
            className:
              "relative z-10 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300",
            style: { width: "450px", height: "300px" },
          })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "bg-white py-16" },
      React.createElement(
        "div",
        { className: "container mx-auto px-4" },
        React.createElement(
          "h2",
          { className: "text-3xl font-bold text-center mb-12 text-gray-800" },
          "Why Choose HandiCrafts?"
        ),
        React.createElement(
          "div",
          { className: "grid md:grid-cols-3 gap-8" },
          [
            {
              icon: "🧵",
              title: "Authentic Craftsmanship",
              description:
                "Each piece is meticulously handwoven by skilled artisans, preserving traditional techniques.",
            },
            {
              icon: "🌍",
              title: "Sustainable Production",
              description:
                "Eco-friendly processes that support local communities and minimize environmental impact.",
            },
            {
              icon: "🎨",
              title: "Unique Designs",
              description:
                "Celebrating cultural diversity through intricate patterns and vibrant color palettes.",
            },
          ].map((feature, index) =>
            React.createElement(
              "div",
              {
                key: index,
                className:
                  "bg-amber-50 p-6 rounded-xl text-center hover:shadow-lg transition",
              },
              React.createElement(
                "div",
                { className: "text-5xl mb-4" },
                feature.icon
              ),
              React.createElement(
                "h3",
                { className: "text-xl font-semibold mb-3" },
                feature.title
              ),
              React.createElement(
                "p",
                { className: "text-gray-600" },
                feature.description
              )
            )
          )
        )
      )
    ),
    React.createElement(
      "footer",
      { className: "bg-gray-800 text-white py-8 mt-auto" },
      React.createElement(
        "div",
        { className: "container mx-auto px-4 text-center" },
        "© 2024 Handloom Craft Project. All Rights Reserved"
      )
    )
  );
};

export default HomePage;