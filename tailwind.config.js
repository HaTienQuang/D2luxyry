/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          dark: '#0a0a0a',
          black: '#121212',
          cream: '#f4f0ec',
          stone: '#e7e2dc',
          gold: '#c5a880',
          goldDark: '#a3845b',
          muted: '#666666',
          border: '#e5e0d8',
        }
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.15em',
        widest: '0.25em',
      }
    },
  },
  plugins: [],
};

