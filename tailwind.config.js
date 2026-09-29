/**
 * Tailwind configuration
 * ----------------------
 * Design tokens for the "calm clinical" theme. Components use these names
 * (bg-canvas, text-ink, bg-brand…) instead of raw hex values, so the whole
 * palette can be changed here.
 */
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F7F7", // page background
        surface: "#FFFFFF", // cards and inputs
        ink: "#123038", // main text
        muted: "#5B6E77", // secondary text
        line: "#E2E9EB", // borders
        brand: {
          DEFAULT: "#0E7C7B", // medical teal
          deep: "#0A5E5D", // hover / pressed
          soft: "#E4F1F0", // tinted backgrounds
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"], // headings
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"], // body text
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,48,56,0.04), 0 12px 28px -16px rgba(18,48,56,0.18)",
      },
    },
  },
  // Adds the `prose` classes used to style the AI's Markdown answers.
  plugins: [typography],
};
