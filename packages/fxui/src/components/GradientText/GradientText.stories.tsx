import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GradientText } from './GradientText';

const meta: Meta<typeof GradientText> = {
  title: 'Components/Typography/GradientText',
  component: GradientText,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof GradientText>;

export const Gradients: Story = {
  render: () => (
    <div className="p-8 flex flex-col gap-4">
      {(['neon', 'sunset', 'ocean', 'fire', 'electric', 'lime', 'candy'] as const).map((g) => (
        <div key={g} className="flex items-center gap-4">
          <span className="w-20 text-xs text-gray-400 font-mono">{g}</span>
          <GradientText as="h2" gradient={g} className="text-4xl font-display font-black">
            FXUI Design
          </GradientText>
        </div>
      ))}
    </div>
  ),
};

export const HeroHeading: Story = {
  render: () => (
    <div className="p-12 text-center">
      <h1 className="font-display font-black leading-none" style={{ fontSize: 80 }}>
        Build{' '}
        <GradientText gradient="neon">Brutally</GradientText>
        {' '}Beautiful
      </h1>
    </div>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <div className="p-8 max-w-lg">
      <p className="font-sans text-xl leading-relaxed text-fx-black">
        FXUI gives you{' '}
        <GradientText gradient="electric" className="font-bold">
          100+ components
        </GradientText>{' '}
        with a distinctive{' '}
        <GradientText gradient="neon" className="font-bold">
          neo-brutalist
        </GradientText>{' '}
        style that stands out.
      </p>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-8 flex flex-col gap-2">
      <GradientText gradient="neon" className="text-2xl font-bold font-display">Small heading</GradientText>
      <GradientText gradient="sunset" className="text-4xl font-black font-display">Medium heading</GradientText>
      <GradientText gradient="ocean" className="text-6xl font-black font-display">Large heading</GradientText>
    </div>
  ),
};
