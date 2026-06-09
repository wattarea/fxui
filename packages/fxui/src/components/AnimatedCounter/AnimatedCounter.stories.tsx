import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';

const meta: Meta<typeof AnimatedCounter> = {
  title: 'Components/MediaChart/AnimatedCounter',
  component: AnimatedCounter,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AnimatedCounter>;

export const Default: Story = {
  render: () => (
    <div className="p-6 flex gap-8 flex-wrap items-baseline">
      <AnimatedCounter value={1234567} separator="," className="text-4xl" />
      <AnimatedCounter value={99.9} decimals={1} suffix="%" className="text-4xl text-fx-green" />
      <AnimatedCounter value={4200} prefix="$" separator="," className="text-4xl text-fx-yellow" />
    </div>
  ),
};

export const KPICards: Story = {
  render: () => {
    const stats = [
      { label: 'Total Users', value: 12847, prefix: '', suffix: '', color: 'text-fx-black dark:text-fx-white' },
      { label: 'Revenue', value: 94521, prefix: '$', suffix: '', color: 'text-fx-green' },
      { label: 'Conversion', value: 3.42, prefix: '', suffix: '%', decimals: 2, color: 'text-fx-blue' },
      { label: 'Components', value: 103, prefix: '', suffix: '+', color: 'text-fx-yellow' },
    ];
    return (
      <div className="p-6 grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-4 border-2 border-fx-black rounded-[4px] shadow-fx">
            <p className="text-xs font-bold text-gray-400 font-sans mb-1">{s.label}</p>
            <AnimatedCounter
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              decimals={s.decimals ?? 0}
              className={`text-3xl ${s.color}`}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const Toggleable: Story = {
  render: () => {
    function Demo() {
      const [v, setV] = React.useState(0);
      return (
        <div className="p-6 flex flex-col gap-4 items-center">
          <AnimatedCounter value={v} prefix="$" separator="," className="text-5xl text-fx-yellow" />
          <div className="flex gap-2">
            <button onClick={() => setV(1000)} className="px-3 py-1.5 border-2 border-fx-black text-sm font-bold rounded-[4px] shadow-fx-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all">1K</button>
            <button onClick={() => setV(25000)} className="px-3 py-1.5 border-2 border-fx-black text-sm font-bold rounded-[4px] shadow-fx-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all">25K</button>
            <button onClick={() => setV(1000000)} className="px-3 py-1.5 border-2 border-fx-black text-sm font-bold rounded-[4px] shadow-fx-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all">1M</button>
            <button onClick={() => setV(0)} className="px-3 py-1.5 border-2 border-fx-black text-sm font-bold rounded-[4px] shadow-fx-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all">Reset</button>
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};
