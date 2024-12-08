/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: ({ theme }) => theme("spacing"),
      keyframes: {
        "translate-fade-in": {
          "0%": { opacity: "0", transform: "translateY(-5%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "translate-fade-in": "translate-fade-in 200ms",
      },
    },

  },
  plugins: [],
}