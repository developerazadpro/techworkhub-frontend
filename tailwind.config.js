/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gray': '#6b7280',      // text gray
        'brand-light': '#f6f7f8',     // main background
        'brand-green': '#108a00',     // primary brand color
        'brand-border': '#e6e8eb',    // borders
        'brand-accent': '#e9f7ef',    // card icon bg
        'brand-muted': '#9ca3af',     // small text
      },
    },
  },
  plugins: [],
};
