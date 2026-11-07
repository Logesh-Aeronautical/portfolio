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
          dark: '#060a07',
          surface: '#0b140e',
          card: 'rgba(12, 22, 15, 0.82)',
          border: 'rgba(234, 179, 8, 0.25)',
          yellow: '#facc15',
          amber: '#eab308',
          green: '#22c55e',
          emerald: '#10b981',
          lime: '#84cc16'
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
