/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx}", "./src/shared/icons/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "0rem",
          xxs: "0.2rem",
          xs: "0rem",
          sm: "0rem",
          md: "4rem",
          lg: "4rem",
          xl: "3rem",
          "2xl": "2rem",
          "3xl": "1rem",
        },
      },
    },
  },
  plugins: [],
}

