/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F8FAFC",       // Clean premium cool slate-50 light background
          card: "#FFFFFF",     // Pure white card background
          hover: "#F1F5F9",    // Hover slate-100 tone
          accent: "#2563EB",   // High-impact royal blue
          accentLight: "#1D4ED8", // Hover royal blue-700
          cyan: "#0D9488",     // High contrast Teal-600
          textPrimary: "#0F172A", // Deep Slate-900 for high text readability
          textSecondary: "#475569" // Slate-600 for subtext and descriptors
        }
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-fast": "marquee 20s linear infinite",
        fadeIn: "fadeIn 0.6s ease-out forwards",
        slideUp: "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
