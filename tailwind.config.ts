import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#2A384C",
        slate: "#A0B2C2",
        silver: "#D1D9DF",
        "light-gray": "#F0F0F0",
      },
      fontFamily: {
        sans: ["Cooper Hewitt", "Inter", "sans-serif"],
        serif: ["Sansita", "Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
