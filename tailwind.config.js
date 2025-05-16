/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bora: {
          yellow: '#FCB235',
          brown: '#462F13',
          red: '#EF432E',
          black: '#000000',
          white: '#FFFFFF',
          darkred: '#D04D38',
          orange: '#F68B31',
        },
      },
      fontFamily: {
        'bebas': ['var(--font-bebas)', 'sans-serif'],
        'yeseva': ['var(--font-yeseva)', 'serif'],
        'unbounded': ['var(--font-unbounded)', 'sans-serif'],
      },
      animation: {
        'sway': 'sway 8s ease-in-out infinite',
        'flame': 'flame 3s ease-in-out infinite',
        'water': 'water 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        'pulse-warm': 'pulse-warm 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'heat-wave': 'heat-wave 2s ease-in-out infinite',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        flame: {
          '0%, 100%': { 
            transform: 'rotate(-1deg) scale(1)',
            filter: 'drop-shadow(0 0 10px rgba(246, 139, 49, 0.5)) drop-shadow(0 0 20px rgba(239, 67, 46, 0.3))'
          },
          '50%': { 
            transform: 'rotate(1deg) scale(1.05)',
            filter: 'drop-shadow(0 0 15px rgba(246, 139, 49, 0.8)) drop-shadow(0 0 30px rgba(239, 67, 46, 0.5))'
          },
        },
        'pulse-warm': {
          '0%, 100%': {
            opacity: 1,
            filter: 'drop-shadow(0 0 8px rgba(252, 178, 53, 0.5))'
          },
          '50%': {
            opacity: 0.8,
            filter: 'drop-shadow(0 0 12px rgba(239, 67, 46, 0.7))'
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-500px 0',
          },
          '100%': {
            backgroundPosition: '500px 0',
          },
        },
        'heat-wave': {
          '0%, 100%': {
            transform: 'skewX(0deg) scale(1)',
          },
          '50%': {
            transform: 'skewX(-2deg) scale(1.02)',
          },
        },
        water: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
