import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        ink: "#000000",
        "ink-soft": "#3A3A3D",
        brand: {
          DEFAULT: "#233DFF",
          dark: "#1A2ECC",
          light: "#5568FF",
        },
        paper: "#FFFFFF",
        "paper-warm": "#FAFAF8",
        card: "#F3F4F8",
        line: "rgba(0,0,0,0.1)",
        "line-dark": "rgba(255,255,255,0.14)",
        muted: "#57575C",
      },
      fontFamily: {
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1320px",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        draw: {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
