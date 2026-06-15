import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NoiseBg } from './NoiseBg';

const meta: Meta<typeof NoiseBg> = {
  title: 'Components/Special/NoiseBg',
  component: NoiseBg,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof NoiseBg>;

const Card = ({ color, label, children }: { color?: string; label?: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    {label && <span className="text-xs font-mono text-gray-400">{label}</span>}
    <div className={`h-36 w-48 rounded-[4px] border-2 border-fx-black ${color ?? 'bg-fx-yellow'} overflow-hidden`}>
      {children}
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-4">
      <p className="text-xs font-mono text-gray-400">
        Grayscale noise at opacity 0.35 with multiply blend — subtle texture over yellow
      </p>
      <NoiseBg
        opacity={0.35}
        className="h-48 w-64 bg-fx-yellow border-2 border-fx-black rounded-[4px]"
      >
        <div className="flex items-center justify-center h-full">
          <span className="font-display font-black text-3xl text-fx-black">FXUI</span>
        </div>
      </NoiseBg>
    </div>
  ),
};

export const Opacities: Story = {
  render: () => (
    <div className="p-6 flex gap-4 flex-wrap">
      {[0.1, 0.25, 0.45, 0.65].map((opacity) => (
        <Card key={opacity} label={`opacity: ${opacity}`}>
          <NoiseBg opacity={opacity} className="h-full w-full bg-fx-yellow flex items-center justify-center">
            <span className="font-display font-black text-xl text-fx-black">{opacity}</span>
          </NoiseBg>
        </Card>
      ))}
    </div>
  ),
};

export const Frequencies: Story = {
  render: () => (
    <div className="p-6 flex gap-4 flex-wrap">
      {[0.2, 0.5, 0.9, 1.6].map((freq) => (
        <Card key={freq} color="bg-fx-green" label={`freq: ${freq}`}>
          <NoiseBg baseFrequency={freq} opacity={0.4} className="h-full w-full bg-fx-green flex items-center justify-center">
            <span className="font-mono text-sm font-black">{freq}</span>
          </NoiseBg>
        </Card>
      ))}
    </div>
  ),
};

export const BlendModes: Story = {
  render: () => (
    <div className="p-6 flex gap-4 flex-wrap">
      {(['normal', 'multiply', 'overlay', 'screen', 'soft-light'] as const).map((blendMode) => (
        <Card key={blendMode} color="bg-fx-yellow" label={blendMode}>
          <NoiseBg opacity={0.45} blendMode={blendMode} className="h-full w-full bg-fx-yellow flex items-center justify-center">
            <span className="font-mono text-[10px] font-black text-fx-black">{blendMode}</span>
          </NoiseBg>
        </Card>
      ))}
    </div>
  ),
};

export const ColorBackgrounds: Story = {
  render: () => (
    <div className="p-6 flex gap-4 flex-wrap">
      {[
        { bg: 'bg-fx-yellow', label: 'Yellow' },
        { bg: 'bg-fx-pink', label: 'Pink' },
        { bg: 'bg-fx-green', label: 'Green' },
        { bg: 'bg-fx-blue', label: 'Blue' },
        { bg: 'bg-fx-black', label: 'Black' },
        { bg: 'bg-fx-purple', label: 'Purple' },
      ].map(({ bg, label }) => (
        <Card key={label} color={bg} label={label}>
          <NoiseBg opacity={0.35} blendMode="multiply" className={`h-full w-full ${bg} flex items-center justify-center`}>
            <span className="font-display font-black text-xl text-fx-white mix-blend-difference">{label[0]}</span>
          </NoiseBg>
        </Card>
      ))}
    </div>
  ),
};

export const HeroCard: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <NoiseBg
        opacity={0.2}
        baseFrequency={0.65}
        blendMode="screen"
        className="bg-fx-black border-2 border-fx-black rounded-[4px] shadow-fx-xl p-8 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-fx-green" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Online</span>
        </div>
        <h2 className="font-display font-black text-4xl text-fx-white leading-none">
          FXUI<br />
          <span className="text-fx-yellow">PRO</span>
        </h2>
        <p className="font-sans text-sm text-gray-400 leading-relaxed">
          Premium neo-brutalist components for production applications.
        </p>
        <button className="mt-2 w-full py-2.5 bg-fx-yellow border-2 border-fx-black rounded-[4px] font-bold font-sans text-sm text-fx-black shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          Get Started →
        </button>
      </NoiseBg>
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div className="p-6 flex gap-6 flex-wrap">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-mono text-gray-400">animated — pulse</span>
        <NoiseBg
          animated
          opacity={0.5}
          className="h-48 w-48 bg-fx-purple border-2 border-fx-black rounded-[4px] flex items-center justify-center"
        >
          <span className="font-display font-black text-3xl text-fx-white">PULSE</span>
        </NoiseBg>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-mono text-gray-400">static — for comparison</span>
        <NoiseBg
          opacity={0.5}
          className="h-48 w-48 bg-fx-purple border-2 border-fx-black rounded-[4px] flex items-center justify-center"
        >
          <span className="font-display font-black text-3xl text-fx-white">STATIC</span>
        </NoiseBg>
      </div>
    </div>
  ),
};
