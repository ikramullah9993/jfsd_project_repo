/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "dropdown-slide": "dropdown-slide 0.3s ease-out",
        pulse: "pulse 2s infinite",
        "text-gradient": "text-gradient 3s ease infinite",
      },
      keyframes: {
        "dropdown-slide": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "text-gradient": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      backgroundSize: {
        "200%": "200% auto",
      },
      perspective: {
        1000: "1000px",
      },
    },
  },
  plugins: [],
  
};
