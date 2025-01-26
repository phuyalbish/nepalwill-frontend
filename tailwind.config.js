/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(50px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)", opacity: 1 },
          "50%": { transform: "translateY(-1px)", opacity: 0.3 },
        },
      },
      animation: {
        slideUp: "slideUp 0.5s ease-in",
        bounce: "bounce 3s cubic-bezier(0.25, 1, 0.5, 1) infinite",
      },
    },
  },
  plugins: [],
};
