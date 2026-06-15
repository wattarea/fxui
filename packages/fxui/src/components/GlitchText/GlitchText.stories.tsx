import type { Meta, StoryObj } from '@storybook/react';
import { GlitchText } from './GlitchText';

const meta: Meta<typeof GlitchText> = {
  title: 'Components/Special/GlitchText',
  component: GlitchText,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof GlitchText>;

export const Default: Story = {
  render: () => (
    <div className="p-12 flex items-center justify-center bg-fx-black">
      <GlitchText
        text="GLITCH"
        className="font-display font-black text-6xl text-fx-white tracking-widest"
      />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="p-12 bg-fx-black flex flex-col items-center gap-8">
      {(['pink', 'yellow', 'green', 'blue', 'purple'] as const).map((color) => (
        <GlitchText
          key={color}
          text={`FXUI — ${color.toUpperCase()}`}
          color={color}
          className="font-display font-black text-4xl text-fx-white tracking-widest uppercase"
        />
      ))}
    </div>
  ),
};

export const Intensities: Story = {
  render: () => (
    <div className="p-12 bg-fx-black flex flex-col items-center gap-10">
      {(['low', 'medium', 'high'] as const).map((intensity) => (
        <div key={intensity} className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{intensity}</span>
          <GlitchText
            text="NEO-BRUTALISM"
            intensity={intensity}
            color="pink"
            className="font-display font-black text-4xl text-fx-white tracking-wider"
          />
        </div>
      ))}
    </div>
  ),
};

export const TriggerOnHover: Story = {
  render: () => (
    <div className="p-16 bg-fx-black flex items-center justify-center">
      <GlitchText
        text="HOVER ME"
        triggerOnHover
        color="yellow"
        className="font-display font-black text-5xl text-fx-white tracking-widest cursor-pointer"
      />
    </div>
  ),
};

export const HeadingElement: Story = {
  render: () => (
    <div className="p-12 bg-fx-black">
      <GlitchText
        as="h1"
        text="FXUI"
        color="green"
        intensity="medium"
        className="font-display font-black text-8xl text-fx-white tracking-[0.2em] text-center"
      />
      <p className="font-sans text-center text-gray-500 mt-4 tracking-widest text-sm uppercase">
        Neo-Brutalist Component Library
      </p>
    </div>
  ),
};

export const Paused: Story = {
  render: () => (
    <div className="p-12 bg-fx-black flex items-center justify-center">
      <GlitchText
        text="PAUSED"
        paused
        className="font-display font-black text-5xl text-fx-white tracking-widest"
      />
    </div>
  ),
};

export const HeroSection: Story = {
  render: () => (
    <div className="bg-fx-black min-h-[320px] flex flex-col items-center justify-center gap-6 px-8">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-fx-pink animate-pulse" />
        <span className="font-mono text-xs text-gray-500 uppercase tracking-[0.3em]">Live System</span>
      </div>
      <GlitchText
        as="h1"
        text="ERROR_404"
        color="pink"
        intensity="high"
        className="font-display font-black text-7xl text-fx-white tracking-[0.15em]"
      />
      <p className="font-sans text-gray-400 text-center max-w-sm text-sm leading-relaxed">
        The page you're looking for has been corrupted beyond recovery.
      </p>
      <button className="mt-2 px-6 py-2.5 border-2 border-fx-white text-fx-white font-bold font-sans text-sm rounded-[4px] shadow-fx-dark hover:shadow-fx-dark-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
        Return Home
      </button>
    </div>
  ),
};
