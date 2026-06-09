import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProgressRing } from './ProgressRing';

const meta: Meta<typeof ProgressRing> = {
  title: 'Components/MediaChart/ProgressRing',
  component: ProgressRing,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Default: Story = {
  render: () => (
    <div className="p-6 flex gap-6 items-center flex-wrap">
      <ProgressRing value={75} color="yellow" label="Quality" />
      <ProgressRing value={42} color="pink" label="Risk" />
      <ProgressRing value={90} color="green" label="Performance" />
      <ProgressRing value={30} color="blue" label="Coverage" />
      <ProgressRing value={65} color="purple" label="Progress" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 flex gap-6 items-center flex-wrap">
      <ProgressRing value={70} size={48} strokeWidth={5} />
      <ProgressRing value={70} size={80} strokeWidth={8} />
      <ProgressRing value={70} size={120} strokeWidth={12} />
      <ProgressRing value={70} size={160} strokeWidth={14} />
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    function Demo() {
      const [val, setVal] = React.useState(25);
      React.useEffect(() => {
        const ids = [
          setTimeout(() => setVal(50), 1000),
          setTimeout(() => setVal(80), 2000),
          setTimeout(() => setVal(100), 3000),
        ];
        return () => ids.forEach(clearTimeout);
      }, []);
      return (
        <div className="p-6 flex gap-6 items-center">
          <ProgressRing value={val} color="yellow" size={100} strokeWidth={10} />
          <ProgressRing value={val} color="green" size={80} strokeWidth={8} />
          <p className="font-sans text-sm text-gray-400">Animating from 25% → 100%</p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const CustomFormat: Story = {
  render: () => (
    <div className="p-6 flex gap-6 flex-wrap">
      <ProgressRing value={45} max={60} format={(v, m) => `${v}m`} color="blue" label="Time" size={90} />
      <ProgressRing value={3400} max={5000} format={(v) => `${(v/1000).toFixed(1)}k`} color="purple" label="Tokens" size={90} />
    </div>
  ),
};
