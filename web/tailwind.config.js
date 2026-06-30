/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1220',
        surface: '#0F172A',
        accent: '#6EE7B7',
        'accent-2': '#A5F3FC',
        foreground: '#EDF2F7',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
      backgroundImage: {
        'gradient-medical': 'linear-gradient(135deg, #6EE7B7 0%, #A5F3FC 100%)',
      },
    },
  },
  plugins: [],
};
