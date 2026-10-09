/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#141518',
          charcoal: '#1B1D21',
          slate: '#24272D',
          border: '#E8E2D5',
          'border-dark': '#2D3037',
          ivory: '#FAF7F0',
          cream: '#F4ECE1',
          sand: '#EBDDC9',
          gold: '#DFB262',
          'gold-hover': '#CE9F4C',
          'gold-light': '#F8E9C7',
          tan: '#DFB87F',
          muted: '#6E7075',
          body: '#2D2E32',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: [
          'Playfair Display',
          'Georgia',
          'serif',
        ],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(20, 21, 24, 0.06)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'elevated': '0 20px 40px -15px rgba(20, 21, 24, 0.12)',
      },
    },
  },
  plugins: [],
}
