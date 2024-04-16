/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#632626",
          200: "#9D5353",
          300: "#BF8B67",
          400: "#DACC96",
        }
      }
    },
  },
  plugins: [],
}

