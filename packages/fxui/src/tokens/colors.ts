export const colors = {
  primary: {
    50: '#fef9ee',
    100: '#fdefd0',
    200: '#fbda9d',
    300: '#f8be63',
    400: '#f59b2d',
    500: '#f27d0e',
    600: '#e36309',
    700: '#bc490b',
    800: '#963a0f',
    900: '#7a3110',
  },
  black: '#0a0a0a',
  white: '#fafafa',
  neon: {
    yellow: '#FFE500',
    pink: '#FF2D78',
    green: '#00FF94',
    blue: '#0066FF',
    purple: '#7C3AED',
  },
  gray: {
    50: '#f9f9f7',
    100: '#f0f0ec',
    200: '#e4e4de',
    300: '#d2d2ca',
    400: '#afafaa',
    500: '#888882',
    600: '#6b6b66',
    700: '#4f4f4b',
    800: '#333330',
    900: '#1a1a18',
  },
  semantic: {
    success: '#00C853',
    warning: '#FFD600',
    error: '#FF1744',
    info: '#0066FF',
  },
} as const;

export type ColorToken = typeof colors;
