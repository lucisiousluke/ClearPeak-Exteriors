import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aqua: {
          DEFAULT: "var(--color-aqua)",
          50: "#EAFBFF",
          100: "#CEF6FF",
          200: "#9DEDFF",
          300: "#63E1FF",
          400: "#2DD6FF",
          500: "#00D4FF",
          600: "#00A8CC",
          700: "#00819C",
          800: "#005C70",
          900: "#003C49",
        },
        pink: {
          DEFAULT: "var(--color-pink)",
          50: "#FFF0F8",
          100: "#FFDCEF",
          200: "#FFB3DD",
          300: "#FF89CA",
          400: "#FF6EBB",
          500: "#FF4FA3",
          600: "#E23689",
          700: "#B7286D",
          800: "#8C1D53",
          900: "#62143A",
        },
        coral: {
          DEFAULT: "var(--color-coral)",
          50: "#FFF3F0",
          100: "#FFE1D9",
          200: "#FFC1AF",
          300: "#FF9F85",
          400: "#FF8C6E",
          500: "#FF7A59",
          600: "#E85C3B",
          700: "#C1442A",
          800: "#96331F",
          900: "#6B2416",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          50: "#F2F5FA",
          100: "#E3E9F3",
          200: "#C1CCE0",
          300: "#93A4C2",
          400: "#5C71A0",
          500: "#3C4F7D",
          600: "#293A64",
          700: "#1F2D51",
          800: "#172B4D",
          900: "#101B33",
        },
        soft: "#F6FCFF",
        success: {
          DEFAULT: "#22C55E",
          50: "#EFFDF4",
          600: "#16A34A",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(23, 43, 77, 0.08)",
        lift: "0 20px 40px -12px rgba(23, 43, 77, 0.18)",
        glow: "0 0 0 1px rgba(0, 212, 255, 0.15), 0 8px 32px -8px rgba(0, 212, 255, 0.35)",
        "glow-pink": "0 0 0 1px rgba(255, 79, 163, 0.15), 0 8px 32px -8px rgba(255, 79, 163, 0.35)",
        glass: "0 8px 32px 0 rgba(23, 43, 77, 0.1)",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #00D4FF 0%, #FF4FA3 100%)",
        "gradient-brand-2": "linear-gradient(135deg, #FF4FA3 0%, #FF7A59 100%)",
        "gradient-brand-3": "linear-gradient(135deg, #00D4FF 0%, #FF4FA3 50%, #FF7A59 100%)",
        "gradient-radial": "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 20% 20%, rgba(0,212,255,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(255,79,163,0.25) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(255,122,89,0.2) 0px, transparent 50%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};

export default config;
