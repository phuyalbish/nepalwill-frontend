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

        marquee: {
          "0%": { transform: "translateX(2.5%)" },
          "50%": { transform: "translateX(-2.5%)" },
          "100%": { transform: "translateX(2.5%)" },
        },
        slideUpEvent: {
          "0%": {
            transform: "translate3d(-400px, 0, 0)",
            opacity: 0.6,
            willChange: "transform, opacity",
          },
          "100%": {
            transform: "translate3d(0, 0, 0)",
            opacity: 1,
            animationFillMode: "forwards",
          },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)", opacity: 1 },
          "50%": { transform: "translateY(-1px)", opacity: 0.3 },
        },
        smoothCarousel: {
          "0%": { transform: "translateX(-10px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        smoothCarouselEnd: {
          "0%": { transform: "translateX(10px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      animation: {
        marquee1: "marquee 7.3s linear infinite",
        marquee2: "marquee 5.9s linear infinite",
        slideUpEvent: "slideUpEvent 0.5s ease-in",
        slideUp: "slideUp 0.5s ease-in",
        smoothCarousel: "smoothCarousel 0.5s ease-in",
        smoothCarouselEnd: "smoothCarouselEnd 0.5s ease-in",
        bounce: "bounce 3s cubic-bezier(0.25, 1, 0.5, 1) infinite",
      },
    },
  },
  plugins: [],
};
