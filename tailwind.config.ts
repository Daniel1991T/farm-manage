import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        casal: {
          "50": "#e7fffb",
          "100": "#c3fff6",
          "200": "#8fffee",
          "300": "#42ffe3",
          "400": "#00ffdf",
          "500": "#00fffd",
          "600": "#00cddd",
          "700": "#00a2b1",
          "800": "#00808d",
          "900": "#025864",
          "950": "#004653",
        },
        emerald: {
          "50": "#edfff7",
          "100": "#d5ffef",
          "200": "#aeffde",
          "300": "#70ffc6",
          "400": "#2bfda8",
          "500": "#00d47e",
          "600": "#00c06d",
          "700": "#009659",
          "800": "#067549",
          "900": "#07603e",
          "950": "#003721",
        },
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
