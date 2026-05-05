import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
    '../../packages/fxui/src/**/*.{ts,tsx}',
  ],
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
    },
  },
  plugins: [],
} satisfies Config;
