/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f5f5f5",
        "primary-green": "#48cd64",
      },
      backgroundColor: {
        "primary-green": "#48cd64",
        pink: "#feebe2",
      },
      fontSize: {
        normal: "14px",
      },
      fontFamily: {
        Lato: ["Lato"],
      },
    },
  },
  plugins: [],
};
