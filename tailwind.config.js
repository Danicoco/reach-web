/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
