import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "src"),
    },
  },
});
