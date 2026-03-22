import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              "primary": "#256af4",
              "background-light": "#f5f6f8",
              "background-dark": "#101622",
          },
          fontFamily: {
              "display": ["Space Grotesk", "sans-serif"]
          },
          borderRadius: {"DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "full": "9999px"},
      },
  },
  plugins: [],
};
export default config;