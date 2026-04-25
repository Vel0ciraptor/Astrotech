/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        border: "var(--glass-border)",
        input: "var(--glass-border)",
        ring: "var(--accent-primary)",
        primary: {
          DEFAULT: "var(--accent-primary)",
          foreground: "white",
        },
        secondary: {
          DEFAULT: "var(--glass-bg-strong)",
          foreground: "var(--text-primary)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "var(--glass-bg)",
          foreground: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--glass-bg-hover)",
          foreground: "var(--text-primary)",
        },
        card: {
          DEFAULT: "var(--glass-bg)",
          foreground: "var(--text-primary)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(168, 85, 247, 0.3)',
        'glow-strong': '0 0 60px rgba(168, 85, 247, 0.5)',
        'glow-pink': '0 0 40px rgba(236, 72, 153, 0.3)',
        'glow-blue': '0 0 40px rgba(99, 102, 241, 0.3)',
      },
    },
  },
  plugins: [],
}