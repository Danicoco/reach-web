/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  darkMode: "class",
  important: true,
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
