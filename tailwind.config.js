/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: { brand: { blue: '#1d4ed8', orange: '#f97316' } },
    },
  },
  plugins: [],
}
