/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#1A1A1A",
        light: "#FFFCE5",
        secondary2: "#989898",
        secondary: "#A5A5A5",
        tetiary: "#00BE7A",
        "light-purple": "#8888FF",
      },
      textshadow: {
        shadow: "#1A1A1A",
      },
    },
  },
  plugins: [],
};
