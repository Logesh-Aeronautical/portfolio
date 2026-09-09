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
          dark: '#070b14',
          surface: '#0d1527',
          card: 'rgba(15, 23, 42, 0.8)',
          border: 'rgba(56, 189, 248, 0.2)',
          cyan: '#00f0ff',
          sky: '#38bdf8'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace', 'ui-monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
