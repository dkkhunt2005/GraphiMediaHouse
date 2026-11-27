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
          gold: "#E6C500",
          "gold-hover": "#D4B200",
          "gold-light": "#FFF9D2",
          black: "#000000",
          charcoal: "#222222",
          "charcoal-muted": "#555555",
          "charcoal-light": "#777777",
          "off-white": "#F9F9F9",
          border: "#EAEAEA",
          "border-dark": "#2A2A2A"
        }
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'Akrobat', '"Archivo Narrow"', '"Oswald"', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'editorial-wide': '0.15em',
        'editorial-wider': '0.25em',
        'editorial-tight': '-0.02em',
      },
    },
  },
  plugins: [],
}
