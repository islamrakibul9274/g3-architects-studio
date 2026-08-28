import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111827",
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
        architect: {
          dark: "#0f172a",
          charcoal: "#1e293b",
          bronze: "#b45309",
          terracotta: "#c2410c",
          amber: "#d97706",
          sand: "#f8f6f0",
          cream: "#f4efe6",
          line: "#e2e0d8",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",
        architect: "0 10px 30px -10px rgba(15, 23, 42, 0.08)",
        elevated: "0 20px 40px -15px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
