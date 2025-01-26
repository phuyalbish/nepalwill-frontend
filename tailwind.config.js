/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          "0%": { transform: "translateX(-50px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },

        slideUpEvent: {
          "0%": { transform: "translateX(-400px)", opacity: 0.6 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)", opacity: 1 },
          "50%": { transform: "translateY(-1px)", opacity: 0.3 },
        },
      },
      animation: {
        slideUpEvent: "slideUpEvent 0.5s ease-in",
        slideUp: "slideUp 0.5s ease-in",
        bounce: "bounce 3s cubic-bezier(0.25, 1, 0.5, 1) infinite",
      },
    },
  },
  plugins: [],
};
