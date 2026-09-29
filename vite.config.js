/**
 * Vite configuration: builds and serves the React frontend.
 * The /api folder is not part of this build; Vercel deploys it separately
 * as serverless functions.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
