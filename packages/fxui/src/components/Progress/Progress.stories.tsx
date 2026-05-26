import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: ['default', 'success', 'warning', 'error', 'info', 'neon'] },
    showValue: { control: 'boolean' },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60, label: 'Upload progress', showValue: true },
  decorators: [(S) => <div className="p-6 w-80"><S /></div>],
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 w-80">
      {(['default', 'success', 'warning', 'error', 'info', 'neon'] as const).map((color) => (
        <Progress key={color} value={65} color={color} label={color} showValue />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 w-80">
      <Progress value={70} size="sm" label="Small" showValue />
      <Progress value={70} size="md" label="Medium" showValue />
      <Progress value={70} size="lg" label="Large" showValue />
    </div>
  ),
};

export const Animated: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState(0);
      React.useEffect(() => {
        const t = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 5)), 200);
        return () => clearInterval(t);
      }, []);
      return <Progress value={value} label="Loading..." showValue color="info" />;
    }
    return <div className="p-6 w-80"><Demo /></div>;
  },
};

export const CustomFormat: Story = {
  args: {
    value: 3,
    max: 10,
    label: 'Steps completed',
    showValue: true,
    formatValue: (v, m) => `${v} / ${m}`,
    color: 'success',
  },
  decorators: [(S) => <div className="p-6 w-80"><S /></div>],
};
