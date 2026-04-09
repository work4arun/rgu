import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rgu: {
          purple: "#660066",
          "purple-light": "#883388",
          "purple-dark": "#440044",
          blue: "#006699",
          "blue-light": "#3388bb",
          "blue-dark": "#004466",
          green: "#99cc33",
          "green-light": "#aabb55",
          "green-dark": "#77aa22",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      backgroundImage: {
        "rgu-gradient": "linear-gradient(135deg, #0a000a 0%, #001a2e 50%, #0d1a00 100%)",
        "rgu-gradient-2": "linear-gradient(135deg, #660066 0%, #006699 50%, #99cc33 100%)",
        "card-glass": "linear-gradient(135deg, rgba(102,0,102,0.15) 0%, rgba(0,102,153,0.15) 100%)",
        "hero-radial": "radial-gradient(ellipse at 20% 50%, rgba(102,0,102,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0,102,153,0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(153,204,51,0.2) 0%, transparent 50%)",
      },
      animation: {
        "dash": "dash 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "border-dance": "borderDance 4s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        dash: {
          "0%": { "stroke-dashoffset": "1000" },
          "100%": { "stroke-dashoffset": "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(102,0,102,0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(0,102,153,0.8)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        borderDance: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-lg": "0 16px 48px 0 rgba(31, 38, 135, 0.5)",
        "purple-glow": "0 0 30px rgba(102, 0, 102, 0.6)",
        "blue-glow": "0 0 30px rgba(0, 102, 153, 0.6)",
        "green-glow": "0 0 30px rgba(153, 204, 51, 0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
