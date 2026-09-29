// PostCSS runs Tailwind, then adds vendor prefixes for older browsers.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
