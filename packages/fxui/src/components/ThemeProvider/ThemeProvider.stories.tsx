import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, useTheme } from './ThemeProvider';
import type { FxTokens } from './ThemeProvider';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Components/Theme/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ThemeProvider>;

// ── Demo components ──────────────────────────────────────────────────────────

function ColorModeToggle() {
  const { isDark, toggleColorMode, colorMode } = useTheme();
  return (
    <button
      onClick={toggleColorMode}
      className="flex items-center gap-2 px-4 py-2 border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx dark:shadow-fx-dark font-bold font-sans text-sm bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
    >
      {isDark ? '☀️' : '🌙'} {isDark ? 'Light' : 'Dark'} mode
      <span className="ml-1 text-xs font-mono opacity-50">({colorMode})</span>
    </button>
  );
}

function ThemePreview() {
  const { isDark } = useTheme();
  return (
    <div className="p-6 bg-fx-white dark:bg-fx-black border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx dark:shadow-fx-dark">
      <p className="font-display font-black text-2xl text-fx-black dark:text-fx-white mb-3">
        {isDark ? '🌙 Dark mode' : '☀️ Light mode'}
      </p>
      <div className="flex gap-2 flex-wrap mb-4">
        {['bg-fx-yellow', 'bg-fx-pink', 'bg-fx-green', 'bg-fx-blue', 'bg-fx-purple'].map((cls) => (
          <span
            key={cls}
            className={`h-8 w-8 rounded-[4px] border-2 border-fx-black dark:border-fx-white ${cls}`}
          />
        ))}
      </div>
      <p className="font-sans text-sm text-gray-500 dark:text-gray-400">
        All FXUI components respond to the dark mode class automatically.
      </p>
    </div>
  );
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="light">
      <div className="p-6 flex flex-col gap-4">
        <ColorModeToggle />
        <ThemePreview />
      </div>
    </ThemeProvider>
  ),
};

export const DefaultDark: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="dark">
      <div className="p-6 flex flex-col gap-4">
        <ColorModeToggle />
        <ThemePreview />
      </div>
    </ThemeProvider>
  ),
};

export const SystemMode: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="system">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-fx-green" />
          <span className="text-xs font-mono text-gray-400">Follows OS preference</span>
        </div>
        <ColorModeToggle />
        <ThemePreview />
      </div>
    </ThemeProvider>
  ),
};

export const ThreeModeSelector: Story = {
  render: () => {
    function Demo() {
      const { colorMode, setColorMode } = useTheme();
      return (
        <div className="p-6 flex flex-col gap-4">
          <div className="flex gap-2">
            {(['light', 'dark', 'system'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setColorMode(mode)}
                className={`px-4 py-2 text-sm font-bold font-sans border-2 rounded-[4px] transition-all capitalize ${
                  colorMode === mode
                    ? 'bg-fx-black dark:bg-fx-white text-fx-white dark:text-fx-black border-fx-black dark:border-fx-white shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white border-fx-black dark:border-fx-white shadow-fx dark:shadow-fx-dark hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px]'
                }`}
              >
                {mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '💻'} {mode}
              </button>
            ))}
          </div>
          <ThemePreview />
        </div>
      );
    }
    return (
      <ThemeProvider defaultColorMode="light">
        <Demo />
      </ThemeProvider>
    );
  },
};

export const CustomTokens: Story = {
  render: () => {
    const presets: { name: string; theme: FxTokens }[] = [
      {
        name: 'Default',
        theme: {},
      },
      {
        name: 'Ocean',
        theme: {
          colors: { yellow: '#00D2FF', pink: '#0066FF', green: '#00B4D8', blue: '#0096C7', purple: '#023E8A' },
        },
      },
      {
        name: 'Sunset',
        theme: {
          colors: { yellow: '#FF6B35', pink: '#FF006E', green: '#FFBE0B', blue: '#FB5607', purple: '#8338EC' },
        },
      },
      {
        name: 'Forest',
        theme: {
          colors: { yellow: '#95D5B2', pink: '#52B788', green: '#40916C', blue: '#1B4332', purple: '#081C15' },
        },
      },
    ];

    function Demo() {
      const [preset, setPreset] = React.useState(presets[0]);
      return (
        <div className="p-6 flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {presets.map((p) => (
              <button
                key={p.name}
                onClick={() => setPreset(p)}
                className={`px-3 py-1.5 text-xs font-bold font-sans border-2 rounded-[4px] transition-all ${
                  preset.name === p.name
                    ? 'bg-fx-black text-fx-white border-fx-black shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-fx-white text-fx-black border-fx-black shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px]'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <ThemeProvider theme={preset.theme} className="w-full">
            <div className="flex gap-3 flex-wrap">
              {(['bg-fx-yellow', 'bg-fx-pink', 'bg-fx-green', 'bg-fx-blue', 'bg-fx-purple'] as const).map((cls) => (
                <div
                  key={cls}
                  className={`h-20 w-20 rounded-[4px] border-2 border-fx-black shadow-fx flex items-end justify-start p-1.5 ${cls}`}
                >
                  <span className="text-[9px] font-mono font-black leading-none opacity-60">
                    {cls.replace('bg-fx-', '')}
                  </span>
                </div>
              ))}
            </div>
          </ThemeProvider>
          <p className="text-xs font-mono text-gray-400">
            Note: CSS variable overrides apply to custom CSS using <code>var(--fx-color-*)</code>. Tailwind utility classes use baked-in values.
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const Nested: Story = {
  render: () => (
    <ThemeProvider defaultColorMode="light">
      <div className="p-6 flex flex-col gap-4 bg-fx-white border-2 border-fx-black rounded-[4px]">
        <p className="font-display font-black text-lg text-fx-black">Outer provider — Light</p>
        <ThemeProvider defaultColorMode="dark" className="p-4 rounded-[4px]">
          <div className="flex flex-col gap-3">
            <p className="font-display font-black text-lg text-fx-white">Nested provider — Dark</p>
            <div className="flex gap-2">
              {['bg-fx-yellow', 'bg-fx-pink', 'bg-fx-green'].map((cls) => (
                <span key={cls} className={`h-8 w-8 rounded-[4px] border-2 border-fx-white ${cls}`} />
              ))}
            </div>
          </div>
        </ThemeProvider>
        <p className="text-xs font-sans text-gray-400">Providers can be nested — each creates its own dark scope.</p>
      </div>
    </ThemeProvider>
  ),
};

export const ControlledMode: Story = {
  render: () => {
    function Demo() {
      const [mode, setMode] = React.useState<'light' | 'dark'>('light');
      return (
        <div className="p-6 flex flex-col gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="font-sans font-bold text-sm">Dark mode</span>
            <div
              onClick={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))}
              className={`relative h-6 w-11 rounded-full border-2 border-fx-black transition-colors ${mode === 'dark' ? 'bg-fx-black' : 'bg-gray-200'}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full border-2 border-fx-black bg-fx-white transition-transform ${mode === 'dark' ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
          </label>
          <ThemeProvider colorMode={mode}>
            <ThemePreview />
          </ThemeProvider>
        </div>
      );
    }
    return <Demo />;
  },
};

export const UseThemeHook: Story = {
  render: () => {
    function HookDemo() {
      const { colorMode, isDark, toggleColorMode, tokens } = useTheme();
      return (
        <div className="p-4 border-2 border-fx-black dark:border-fx-white rounded-[4px] font-mono text-xs bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white">
          <p className="text-gray-400 mb-2">useTheme() returns:</p>
          <pre className="whitespace-pre-wrap leading-relaxed">
{`{
  colorMode:  "${colorMode}",
  isDark:     ${isDark},
  tokens:     ${JSON.stringify(tokens, null, 2)
    .split('\n')
    .join('\n  ')},
}`}
          </pre>
          <button
            onClick={toggleColorMode}
            className="mt-3 px-3 py-1.5 border-2 border-fx-black dark:border-fx-white rounded-[4px] font-bold font-sans text-sm bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white hover:shadow-fx dark:hover:shadow-fx-dark transition-all"
          >
            toggle
          </button>
        </div>
      );
    }
    return (
      <ThemeProvider defaultColorMode="light">
        <div className="p-6">
          <HookDemo />
        </div>
      </ThemeProvider>
    );
  },
};
