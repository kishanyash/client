/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Override Tailwind's default blue scale with the Ultra D brand
        // royal blue (#1A3FB8) so every blue-* utility stays on-brand.
        blue: {
          50: "#EEF2FB",
          100: "#DEE6F8",
          200: "#BFCDF1",
          300: "#94ABE7",
          400: "#5F7FD9",
          500: "#3A5CC9",
          600: "#1A3FB8",
          700: "#15339A",
          800: "#11297D",
          900: "#0D1F5F",
          950: "#081340"
        },
        brand: {
          bg: "#E8ECF3",       // Soft cool gray-blue canvas — distinct from white cards
          card: "#FFFFFF",     // Pure white card background
          hover: "#F1F5F9",    // Hover slate-100 tone
          border: "#CBD5E5",   // Visible soft border for cards/buttons
          accent: "#1A3FB8",   // Ultra D royal blue
          accentLight: "#15339A", // Hover royal blue (darker)
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
