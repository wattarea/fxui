'use client';
import { createContext, useContext } from 'react';

export type ColorMode = 'light' | 'dark' | 'system';

export interface FxTokens {
  colors?: {
    black?:  string;
    white?:  string;
    yellow?: string;
    pink?:   string;
    green?:  string;
    blue?:   string;
    purple?: string;
  };
  shadows?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

export interface ThemeContextValue {
  /** Current color mode setting */
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;

  /** True when dark mode is actually active (resolves 'system') */
  isDark: boolean;

  /** Current token overrides applied to the tree */
  tokens: FxTokens;
  setTokens: (tokens: FxTokens) => void;

  // Backward-compat aliases
  /** @deprecated Use colorMode */
  theme: 'light' | 'dark';
  /** @deprecated Use setColorMode */
  setTheme: (theme: 'light' | 'dark') => void;
  /** @deprecated Use toggleColorMode */
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  colorMode: 'light',
  setColorMode: () => {},
  toggleColorMode: () => {},
  isDark: false,
  tokens: {},
  setTokens: () => {},
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
