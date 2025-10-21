import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6c63ff",
        secondary: "#00c6ff",
        accent: "#a855f7",
        glass: "rgba(17, 25, 40, 0.75)",
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at 20% 20%, rgba(108,99,255,0.35), transparent 60%), radial-gradient(circle at 80% 30%, rgba(0,198,255,0.35), transparent 55%)",
      },
      boxShadow: {
        glow: "0 0 25px rgba(108, 99, 255, 0.35)",
        neon: "0 0 20px rgba(0, 198, 255, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
