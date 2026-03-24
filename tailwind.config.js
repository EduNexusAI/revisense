/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1A2E',
          50: '#E8E8F0',
          500: '#1A1A2E',
          700: '#0E0E16',
        },
        accent: {
          DEFAULT: '#0F3460',
          light: '#1A4A7A',
          dark: '#0A2445',
        },
        highlight: {
          DEFAULT: '#E94560',
          light: '#FF6B82',
        },
        success: '#38A169',
        warning: '#F6AD55',
        info: '#3182CE',
        surface: '#F5F7FA',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        child: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        '12': '0.75rem',
        '14': '0.875rem',
        '16': '1rem',
      },
    },
  },
  plugins: [],
};
