import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/styles/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        terracotta: "#D07D5B",
        "terracotta-dark": "#6E4B3A",
        sand: "#F6EDE6",
        cream: "#FFF8F4",
        charcoal: "#2A2A2A",
        sage: "#98A89E"
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        display: ["Playfair Display", ...fontFamily.serif]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 10px 40px rgba(208, 125, 91, 0.12)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
