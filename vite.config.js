import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.BACKEND_URL || "http://localhost:8090",
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: "dist",
  },

  // Absolute base: nested routes such as /programs/:slug must resolve assets from the site root.
  base: "/",
});
