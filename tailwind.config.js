/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "1.5rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1248px" },
    },
    extend: {
      colors: {
        page: "#F6FDFA",
        ink: { DEFAULT: "#0A1A0F", 700: "#3D5A45" },
        // muted: 5.7:1 on page, 5.9:1 on white, 5.1:1 on sage-50, 5.4:1 on mint-50. muted-300 is decorative only (2.2:1).
        muted: { DEFAULT: "#4F6B57", 300: "#9BB3A2" },
        mint: { DEFAULT: "#99F2C8", strong: "#3CE293", 50: "#DCFCE9" },
        sage: { 50: "#E7F2ED" },
        purple: {
          DEFAULT: "#735BDA",
          50: "#F3F0FD",
          600: "#5F46C4",
          700: "#5B43C2",
        },
        success: { DEFAULT: "#16A34A", strong: "#15803D" },
        // coral-700 is the text tone (5.2:1 on page, 4.7:1 on coral/10); plain coral is for fills and borders only.
        coral: { DEFAULT: "#F2545B", 700: "#C2363D" },
        line: "#E5E7EB",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        sans: [
          "Satoshi",
          '"Plus Jakarta Sans"',
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      borderRadius: {
        pill: "9999px",
        card: "16px",
        hero: "24px",
        field: "12px",
        chip: "8px",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(0 0 0 / 0.05)",
        lift: "0 20px 25px -5px rgb(115 91 218 / 0.10), 0 8px 10px -6px rgb(115 91 218 / 0.10)",
        glow: "0 25px 50px -12px rgb(153 242 200 / 0.35)",
      },
      backgroundImage: {
        signature: "linear-gradient(to bottom right, #99F2C8, #735BDA)",
        "ink-gradient": "linear-gradient(160deg, #0A1A0F, #132419 40%, #1A3020)",
        scrim:
          "linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.3), transparent)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%,-8%,0) scale(1.08)" },
          "66%": { transform: "translate3d(-5%,6%,0) scale(0.94)" },
        },
        "blob-alt": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "40%": { transform: "translate3d(-8%,5%,0) scale(1.1)" },
          "70%": { transform: "translate3d(5%,-6%,0) scale(0.92)" },
        },
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        streak: {
          "0%": { transform: "translateX(-60%) skewX(-20deg)" },
          "100%": { transform: "translateX(260%) skewX(-20deg)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        blob: "blob 18s ease-in-out infinite",
        "blob-alt": "blob-alt 22s ease-in-out infinite",
        caret: "caret 1s steps(1) infinite",
        shimmer: "shimmer 2.2s linear infinite",
        float: "float 5s ease-in-out infinite",
        streak: "streak 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
