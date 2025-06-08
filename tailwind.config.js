/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // only needed if you're using the App Router
    './*.{js,ts,jsx,tsx}',        // for root-level files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};