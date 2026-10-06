import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          50: '#FBF9F5',
          100: '#F5EFE6',
          200: '#E8DCCF',
          300: '#D5BEA8',
          400: '#B89370',
          500: '#9C623C',
          600: '#8A4F2C',
          700: '#733E22',
          800: '#5C311C',
          900: '#3D1F10',
          dark: '#1A1613',
          card: '#FFFFFF',
          gold: '#C5A880',
          bronze: '#9E6139',
        }
      },
      fontFamily: {
        sans: ['var(--font-bevietnam)', 'Be Vietnam Pro', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-bevietnam)', 'Be Vietnam Pro', 'sans-serif'],
        handwritten: ['var(--font-bevietnam)', 'Be Vietnam Pro', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(138, 79, 44, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 20px 40px -12px rgba(138, 79, 44, 0.16), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'luxury-glow': '0 0 25px rgba(156, 98, 60, 0.25)',
      }
    },
  },
  plugins: [],
};
export default config;

