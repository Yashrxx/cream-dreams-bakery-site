import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // ✅ Always use repo name as base in production
  base: mode === "production" ? "/cream-dreams-bakery-site/" : "/",

  server: {
    host: "0.0.0.0", // ✅ safer than "::" for dev
    port: 8080,
  },

  plugins: [
    react(),
    // ✅ only run componentTagger in dev to avoid prod issues
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));