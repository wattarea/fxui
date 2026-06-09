import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Components/Chart/BarChart',
  component: BarChart,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BarChart>;

const data = [
  { label: 'Mon', sales: 240, returns: 40 },
  { label: 'Tue', sales: 380, returns: 60 },
  { label: 'Wed', sales: 290, returns: 35 },
  { label: 'Thu', sales: 520, returns: 80 },
  { label: 'Fri', sales: 610, returns: 95 },
  { label: 'Sat', sales: 740, returns: 120 },
  { label: 'Sun', sales: 480, returns: 70 },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <BarChart data={data} series={[{ key: 'sales', label: 'Sales' }]} />
    </div>
  ),
};

export const Grouped: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <BarChart
        data={data}
        series={[
          { key: 'sales', label: 'Sales' },
          { key: 'returns', label: 'Returns' },
        ]}
      />
    </div>
  ),
};

export const Stacked: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <BarChart
        data={data}
        series={[
          { key: 'sales', label: 'Sales' },
          { key: 'returns', label: 'Returns' },
        ]}
        stacked
      />
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <BarChart
        data={data}
        series={[{ key: 'sales', label: 'Sales' }]}
        orientation="horizontal"
        height={280}
      />
    </div>
  ),
};

export const HorizontalGrouped: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <BarChart
        data={data}
        series={[
          { key: 'sales', label: 'Sales' },
          { key: 'returns', label: 'Returns' },
        ]}
        orientation="horizontal"
        height={320}
      />
    </div>
  ),
};
