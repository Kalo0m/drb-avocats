/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: ['pt-32', 'pt-36', 'pt-40', 'pb-20'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0c1821',
          light: '#1b2838',
          dark: '#060b10',
        },
        gold: {
          DEFAULT: '#c9a227',
          light: '#dbb84a',
          dark: '#a68520',
        },
        cream: '#f8f7f4',
        sand: '#e8e4dc',
        charcoal: '#2d2d2d',
        slate: '#64748b',
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'super-wide': '0.2em',
      },
    },
  },
  plugins: [],
};
