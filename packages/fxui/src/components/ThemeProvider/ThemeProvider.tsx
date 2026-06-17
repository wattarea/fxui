'use client';
import React from 'react';
import { cn } from '../../utils/cn';
import {
  ThemeContext,
  type ColorMode,
  type FxTokens,
  type ThemeContextValue,
} from '../../hooks/useTheme';

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Starting color mode. Defaults to 'system'. */
  defaultColorMode?: ColorMode;
  /** Controlled color mode */
  colorMode?: ColorMode;
  onColorModeChange?: (mode: ColorMode) => void;
  /** Token overrides applied as CSS custom properties */
  theme?: FxTokens;
  /** Extra className on the wrapper div */
  className?: string;
  /** Extra style on the wrapper div */
  style?: React.CSSProperties;
}

function buildCssVars(tokens: FxTokens): React.CSSProperties {
  const vars: Record<string, string> = {};
  if (tokens.colors) {
    const { black, white, yellow, pink, green, blue, purple } = tokens.colors;
    if (black)  vars['--fx-color-black']  = black;
    if (white)  vars['--fx-color-white']  = white;
    if (yellow) vars['--fx-color-yellow'] = yellow;
    if (pink)   vars['--fx-color-pink']   = pink;
    if (green)  vars['--fx-color-green']  = green;
    if (blue)   vars['--fx-color-blue']   = blue;
    if (purple) vars['--fx-color-purple'] = purple;
  }
  if (tokens.shadows) {
    const { sm, md, lg, xl } = tokens.shadows;
    if (sm) vars['--fx-shadow-sm'] = sm;
    if (md) vars['--fx-shadow']    = md;
    if (lg) vars['--fx-shadow-lg'] = lg;
    if (xl) vars['--fx-shadow-xl'] = xl;
  }
  return vars as React.CSSProperties;
}

function useSystemDark() {
  const [systemDark, setSystemDark] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return systemDark;
}

export function ThemeProvider({
  children,
  defaultColorMode = 'system',
  colorMode: controlledMode,
  onColorModeChange,
  theme: themeProp = {},
  className,
  style,
}: ThemeProviderProps) {
  const [internalMode, setInternalMode] = React.useState<ColorMode>(defaultColorMode);
  const systemDark = useSystemDark();

  const colorMode = controlledMode ?? internalMode;

  const setColorMode = React.useCallback(
    (mode: ColorMode) => {
      setInternalMode(mode);
      onColorModeChange?.(mode);
    },
    [onColorModeChange]
  );

  const toggleColorMode = React.useCallback(() => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  }, [colorMode, setColorMode]);

  const isDark =
    colorMode === 'dark' || (colorMode === 'system' && systemDark);

  const [tokens, setTokens] = React.useState<FxTokens>(themeProp);

  React.useEffect(() => {
    setTokens(themeProp);
  }, [JSON.stringify(themeProp)]); // eslint-disable-line react-hooks/exhaustive-deps

  const cssVars = buildCssVars(tokens);

  const value: ThemeContextValue = {
    colorMode,
    setColorMode,
    toggleColorMode,
    isDark,
    tokens,
    setTokens,
    // Backward-compat
    theme: isDark ? 'dark' : 'light',
    setTheme: (t) => setColorMode(t),
    toggleTheme: toggleColorMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-fxui-provider
        className={cn(isDark && 'dark', className)}
        style={{ ...cssVars, ...style }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export { useTheme } from '../../hooks/useTheme';
export type { ColorMode, FxTokens, ThemeContextValue };
