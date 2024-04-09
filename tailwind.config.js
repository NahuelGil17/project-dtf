/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      colors: {
        primary: {
          300: "#61D1E2",
          400: "#009FB7",
          500: "#025E6C",
        },
        secondary: {
          100: "#F3EDFA",
          200: "#D3C3E5",
          300: "#9F84BD",
          400: "#360A66",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#FCFCFD",
          200: "#F8FAFC",
          300: "#EEF2F6",
          400: "#E3E8EF",
          500: "#CDD5DF",
          600: "#9AA4B2",
          700: "#697586",
          800: "#4B5565",
          900: "#364152",
          1000: "#202939",
          1100: "#121926",
        },
        success: {
          50: "#F2FFFA",
          100: "#00A05A",
          200: "#007341",
          300: "#004C2B",
        },
        warning: {
          50: "#FFF7E5",
          100: "#D9A136",
          200: "#8C6823",
          300: "#665229",
        },
        error: {
          50: "#FFE5E5",
          100: "#D93636",
          200: "#A62929",
          300: "#662929",
        },
        info: {
          50: "#E5EEFF",
          100: "#366CD9",
          200: "#264D99",
          300: "#293D66",
        },
      },
    },
    fontFamily: {
      body: ["Poppins", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
