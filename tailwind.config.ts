import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aqua: {
          DEFAULT: "var(--color-aqua)",
          50: "#F3FAFB",
          100: "#E1F3F5",
          200: "#ACEEF9",
          300: "#7EE5F5",
          400: "#50DCF2",
          500: "#22D3EE",
          600: "#10BAD4",
          700: "#0D96AA",
          800: "#0A7281",
          900: "#074E58",
        },
        coral: {
          DEFAULT: "var(--color-coral)",
          50: "#FCF3F4",
          100: "#F9E8EA",
          200: "#FDC6CE",
          300: "#FDA9B6",
          400: "#FC8D9D",
          500: "#FB7185",
          600: "#F93754",
          700: "#EF0728",
          800: "#B5051F",
          900: "#7C0315",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          50: "#F5F6FA",
          100: "#E2E6EF",
          200: "#B3C2E4",
          300: "#889FD5",
          400: "#5D7CC5",
          500: "#3D5EAB",
          600: "#2E4680",
          700: "#1E2F55",
          800: "#0F172A",
          900: "#080C17",
        },
        soft: "#F8FAFC",
        success: {
          DEFAULT: "#22C55E",
          50: "#EFFDF4",
          600: "#16A34A",
        },
        // Text/icon color for content drawn on top of a brand-colored
        // background (buttons, icon badges, the CTA banner) — automatically
        // white or Navy, whichever is readable against the actual picked
        // Primary/Accent color. RGB-triplet form so `/opacity` modifiers
        // (e.g. text-on-primary/80) work like any built-in Tailwind color.
        "on-primary": "rgb(var(--color-on-primary-rgb) / <alpha-value>)",
        "on-accent": "rgb(var(--color-on-accent-rgb) / <alpha-value>)",
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
        lift: "0 20px 40px -12px rgba(15, 23, 42, 0.18)",
        glow: "0 0 0 1px rgba(34, 211, 238, 0.15), 0 8px 32px -8px rgba(34, 211, 238, 0.35)",
        "glow-pink": "0 0 0 1px rgba(251, 113, 133, 0.15), 0 8px 32px -8px rgba(251, 113, 133, 0.35)",
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.1)",
      },
      backgroundImage: {
        // Flat solid colors, not real gradients — kept as `backgroundImage`
        // entries (a "gradient" with two identical stops) so every existing
        // `bg-gradient-brand*` class name across the site keeps working
        // unchanged. These use the exact official brand hex, unmodified —
        // accessibility is handled by picking the text color instead (see
        // the "on-primary"/"on-accent" colors above).
        "gradient-brand": "linear-gradient(var(--color-aqua), var(--color-aqua))",
        "gradient-brand-2": "linear-gradient(var(--color-coral), var(--color-coral))",
        "gradient-brand-3": "linear-gradient(var(--color-aqua), var(--color-aqua))",
        "gradient-radial": "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 20% 20%, rgba(34,211,238,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(251,113,133,0.2) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(15,23,42,0.15) 0px, transparent 50%)",
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
