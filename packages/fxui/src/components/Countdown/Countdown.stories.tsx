import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Countdown } from './Countdown';

const meta: Meta<typeof Countdown> = {
  title: 'Components/Data Display/Countdown',
  component: Countdown,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Countdown>;

const inSeconds = (s: number) => s;
const future = (ms: number) => new Date(Date.now() + ms);

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Countdown seconds={inSeconds(3661)} />
    </div>
  ),
};

export const CardVariant: Story = {
  render: () => (
    <div className="p-6">
      <Countdown variant="card" seconds={inSeconds(90061)} />
    </div>
  ),
};

export const MinimalVariant: Story = {
  render: () => (
    <div className="p-6">
      <Countdown variant="minimal" seconds={inSeconds(3661)} separator=":" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-xs font-mono text-gray-400">{size}</span>
          <Countdown variant="card" size={size} seconds={inSeconds(90061)} />
        </div>
      ))}
    </div>
  ),
};

export const TargetDate: Story = {
  render: () => (
    <div className="p-6">
      <Countdown variant="card" targetDate={future(48 * 3600_000)} />
    </div>
  ),
};

export const HideUnits: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <p className="text-xs font-mono text-gray-400 mb-2">Minutes & seconds only</p>
        <Countdown showDays={false} showHours={false} seconds={inSeconds(125)} />
      </div>
      <div>
        <p className="text-xs font-mono text-gray-400 mb-2">Hours & minutes only</p>
        <Countdown showDays={false} showSeconds={false} seconds={inSeconds(7200)} />
      </div>
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6">
      <Countdown
        variant="card"
        seconds={inSeconds(90061)}
        labels={{ days: 'DAYS', hours: 'HRS', minutes: 'MIN', seconds: 'SEC' }}
      />
    </div>
  ),
};

export const Paused: Story = {
  render: () => {
    function Demo() {
      const [paused, setPaused] = React.useState(false);
      return (
        <div className="p-6 flex flex-col gap-4">
          <Countdown variant="card" seconds={inSeconds(3661)} paused={paused} />
          <button
            onClick={() => setPaused((p) => !p)}
            className="px-4 py-2 border-2 border-fx-black rounded-[4px] font-bold font-sans text-sm shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-32"
          >
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>
      );
    }
    return <Demo />;
  },
};

export const LaunchCountdown: Story = {
  render: () => {
    function Demo() {
      const [done, setDone] = React.useState(false);
      return (
        <div className="p-6 max-w-md border-2 border-fx-black rounded-[4px] shadow-fx-lg text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-fx-yellow border border-fx-black rounded-[4px] mb-4">
            <span className="text-xs font-black font-sans">🚀 LAUNCH IN</span>
          </div>
          <div className="flex justify-center mb-4">
            {done ? (
              <p className="font-display font-black text-4xl text-fx-black">🎉 LAUNCHED!</p>
            ) : (
              <Countdown
                variant="card"
                size="lg"
                seconds={inSeconds(7200)}
                onComplete={() => setDone(true)}
              />
            )}
          </div>
          <p className="text-sm font-sans text-gray-400">FXUI v2.0 — Wave 2 components</p>
        </div>
      );
    }
    return <Demo />;
  },
};
