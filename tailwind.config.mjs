/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans JP"', 'sans-serif'],
      },
      fontSize: {
        'xs': ['13px', { lineHeight: '1.5' }],
        'sm': ['15px', { lineHeight: '1.6' }],
      },
      colors: {
        gray: {
          400: '#d0d4de',
          500: '#b0b5c0',
          600: '#8a8f9a',
        },
        glass: {
          100: 'rgba(255, 255, 255, 0.05)',
          200: 'rgba(255, 255, 255, 0.1)',
          300: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        neon: {
          cyan: '#00f3ff',
          purple: '#bc13fe',
          pink: '#ff0055',
        },
      },
    },
  },
  plugins: [],
};