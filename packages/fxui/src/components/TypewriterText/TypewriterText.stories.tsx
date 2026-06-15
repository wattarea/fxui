import type { Meta, StoryObj } from '@storybook/react';
import { TypewriterText } from './TypewriterText';

const meta: Meta<typeof TypewriterText> = {
  title: 'Components/Special/TypewriterText',
  component: TypewriterText,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TypewriterText>;

export const Default: Story = {
  render: () => (
    <div className="p-8">
      <TypewriterText
        texts={['Hello, World!', 'Welcome to FXUI.', 'Build faster.']}
        className="font-sans text-2xl font-bold text-fx-black"
      />
    </div>
  ),
};

export const HeroHeading: Story = {
  render: () => (
    <div className="p-8 max-w-xl">
      <p className="font-sans text-sm text-gray-400 mb-2">Build your next project with</p>
      <h1 className="font-display font-black text-5xl text-fx-black leading-tight flex flex-wrap gap-2">
        FXUI —
        <TypewriterText
          texts={['accessible.', 'fast.', 'beautiful.', 'brutalist.']}
          speed={70}
          pauseMs={1500}
          className="text-fx-pink"
          cursorClassName="text-fx-pink"
        />
      </h1>
    </div>
  ),
};

export const CodeTerminal: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <div className="bg-fx-black border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-800 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs font-mono text-gray-500">terminal</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <span className="text-fx-green font-mono text-sm">$</span>
            <TypewriterText
              texts={[
                'pnpm add @fxui/core',
                'import { Button } from "@fxui/core"',
                'npx create-next-app my-app',
                'pnpm run dev',
              ]}
              speed={50}
              deleteSpeed={25}
              pauseMs={2000}
              className="font-mono text-sm text-fx-white"
              cursorClassName="text-fx-green"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CustomCursor: Story = {
  render: () => (
    <div className="p-8 flex flex-col gap-6">
      {[
        { cursorChar: '|', label: 'Bar (default)' },
        { cursorChar: '_', label: 'Underscore' },
        { cursorChar: '▌', label: 'Block' },
        { cursorChar: '●', label: 'Dot' },
      ].map(({ cursorChar, label }) => (
        <div key={cursorChar} className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400 w-28">{label}</span>
          <TypewriterText
            texts={['FXUI Component Library', 'Neo-Brutalist Design']}
            cursorChar={cursorChar}
            speed={60}
            className="font-sans font-bold text-xl text-fx-black"
          />
        </div>
      ))}
    </div>
  ),
};

export const NoCursor: Story = {
  render: () => (
    <div className="p-8">
      <TypewriterText
        texts={['No cursor mode — clean output']}
        cursor={false}
        loop={false}
        className="font-sans text-xl font-bold text-fx-black"
      />
    </div>
  ),
};

export const NoLoop: Story = {
  render: () => (
    <div className="p-8">
      <p className="text-xs font-mono text-gray-400 mb-2">Types once, then stops:</p>
      <TypewriterText
        texts={['This text types once and stops here.']}
        loop={false}
        speed={80}
        className="font-sans text-xl font-bold text-fx-black"
      />
    </div>
  ),
};

export const Speeds: Story = {
  render: () => (
    <div className="p-8 flex flex-col gap-6">
      {[
        { speed: 30,  label: 'Fast (30ms)' },
        { speed: 70,  label: 'Normal (70ms)' },
        { speed: 150, label: 'Slow (150ms)' },
      ].map(({ speed, label }) => (
        <div key={speed} className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400 w-28">{label}</span>
          <TypewriterText
            texts={['Neo-Brutalist UI', 'Open Source']}
            speed={speed}
            className="font-sans font-bold text-lg text-fx-black"
          />
        </div>
      ))}
    </div>
  ),
};
