/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        'accent': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
        },
        'surface': {
          0: '#ffffff',
          50: '#fef7f8',
          100: '#fdf0f2',
          200: '#fce4e8',
          300: '#f5c6ce',
          400: '#d4a0aa',
          500: '#a07880',
          600: '#7a555d',
          700: '#5c3d44',
          800: '#3d2329',
          900: '#2a1519',
        },
        'rose': {
          50: '#fff5f7',
          100: '#ffecf0',
          200: '#ffd6e0',
          300: '#ffb3c6',
          400: '#ff8fa8',
          500: '#ff6b8a',
        },
        'pastel-pink': '#FFB6C1',
        'pastel-purple': '#E6B0FF',
        'pastel-blue': '#B0E0FF',
        'pastel-peach': '#FFDAB9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(244,63,94,0.06), 0 1px 2px rgba(244,63,94,0.08)',
        'card': '0 0 0 1px rgba(253,164,175,0.15), 0 2px 8px rgba(244,63,94,0.06)',
        'elevated': '0 8px 30px rgba(244,63,94,0.1), 0 2px 8px rgba(0,0,0,0.04)',
        'glow': '0 0 20px rgba(244,63,94,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-8px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
