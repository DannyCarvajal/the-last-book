import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        green: {
          DEFAULT: "#cfdbd5",
          100: "#25312b",
          200: "#4a6256",
          300: "#6f9281",
          400: "#a0b7ab",
          500: "#cfdbd5",
          600: "#dae3de",
          700: "#e3eae7",
          800: "#ecf1ef",
          900: "#f6f8f7",
        },
        jungle: {
          DEFAULT: "#e8eddf",
          100: "#323b21",
          200: "#647642",
          300: "#94ab69",
          400: "#becca4",
          500: "#e8eddf",
          600: "#ecf0e5",
          700: "#f1f4eb",
          800: "#f6f8f2",
          900: "#fafbf8",
        },
        yellow: {
          DEFAULT: "#f5cb5c",
          100: "#3f2f04",
          200: "#7f5f08",
          300: "#be8e0c",
          400: "#f1b81d",
          500: "#f5cb5c",
          600: "#f7d67d",
          700: "#f9e09d",
          800: "#fbebbe",
          900: "#fdf5de",
        },
        gray: {
          DEFAULT: "#242423",
          100: "#070707",
          200: "#0e0e0e",
          300: "#161615",
          400: "#1d1d1c",
          500: "#242423",
          600: "#50504f",
          700: "#7d7d7a",
          800: "#a8a8a6",
          900: "#d4d4d3",
        },
      },
    },
  },
};
export default config;
