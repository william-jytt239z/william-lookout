/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        card: '#141414',
        foreground: '#fafafa',
        primary: '#ff6b35',
        muted: '#888888',
        border: '#2a2a2a',
      },
    },
  },
  plugins: [],
}
