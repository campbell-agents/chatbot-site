module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",  // if using App Router
    "./*.{js,ts,jsx,tsx}",         // root-level files like _app.tsx or index.tsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};