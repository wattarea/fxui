import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'fx-black': '#0a0a0a',
        'fx-white': '#fafafa',
        'fx-yellow': '#FFE500',
        'fx-pink': '#FF2D78',
        'fx-green': '#00FF94',
        'fx-blue': '#0066FF',
        'fx-purple': '#7C3AED',
      },
      boxShadow: {
        'fx-sm': '2px 2px 0px #0a0a0a',
        fx: '4px 4px 0px #0a0a0a',
        'fx-lg': '6px 6px 0px #0a0a0a',
        'fx-xl': '8px 8px 0px #0a0a0a',
        'fx-neon-yellow': '4px 4px 0px #FFE500',
        'fx-neon-pink': '4px 4px 0px #FF2D78',
        'fx-neon-green': '4px 4px 0px #00FF94',
        'fx-dark': '4px 4px 0px #fafafa',
        'fx-dark-sm': '2px 2px 0px #fafafa',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        display: ['"Archivo Black"', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'fx-press': 'fxPress 0.1s ease-in-out',
        'fx-in': 'fxIn 0.2s ease-out',
        'fx-shimmer': 'fxShimmer 1.6s linear infinite',
        'fx-slide-in-right': 'fxSlideInRight 0.25s ease-out',
        'fx-slide-in-left': 'fxSlideInLeft 0.25s ease-out',
        'fx-slide-in-top': 'fxSlideInTop 0.25s ease-out',
        'fx-slide-in-bottom': 'fxSlideInBottom 0.25s ease-out',
        'fx-pulse': 'fxPulse 1.8s ease-in-out infinite',
        'fx-wave': 'fxWave 1.4s ease-in-out infinite',
        'fx-cursor': 'fxCursor 0.9s step-end infinite',
        'fx-typewriter': 'fxTypewriter 0.05s steps(1) forwards',
      },
      keyframes: {
        fxPress: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(2px, 2px)' },
        },
        fxIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fxShimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        fxSlideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fxSlideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fxSlideInTop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fxSlideInBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fxPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        fxWave: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fxCursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
