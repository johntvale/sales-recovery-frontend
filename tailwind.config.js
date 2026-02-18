export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "primary-dark": "#1d4ed8",
        "primary-light": "#eff6ff",
        dark: "#0f172a",
        slate: {
          text: "#475569",
          border: "#e2e8f0",
          light: "#f8fafc",
        },
      },
      backgroundImage: {
        "gradient-blue": "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(59, 130, 246, 0.15)",
      },
    },
  },
  plugins: [],
}

