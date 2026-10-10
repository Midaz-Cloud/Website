/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        funnel: ['"Funnel Display"', "system-ui", "sans-serif"],
        poppins: ["Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "#1e3a8a",
          light: "#3b82f6",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          dark: "#b45309",
          light: "#fbbf24",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        midaz: {
          blue: "#1e3a8a",
          gold: "#fbbf24",
          navy: "#0f172a",
        },
        // Tokens de la landing (Figma "Landing page - Midaz")
        landing: {
          navy: "#07143a",
          blue: "#004be0",
          orange: "#e67800",
          amber: "#ffac44",
          slate: "#98abcc",
          bg: "#f6f7fa",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "line-shadow": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% -100%" },
        },
        // Flotación suave del teléfono del hero y de su sombra (empiezan en reposo).
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-shadow": {
          "0%, 100%": { transform: "translateX(-50%) scale(1)", opacity: "1" },
          "50%": { transform: "translateX(-50%) scale(0.88)", opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
        slideUp: "slideUp 0.6s ease-out",
        "line-shadow": "line-shadow 15s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-shadow": "float-shadow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
