import type { Meta, StoryObj } from '@storybook/react';
import { DonutChart } from './DonutChart';

const meta: Meta<typeof DonutChart> = {
  title: 'Components/Chart/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DonutChart>;

const data = [
  { label: 'Direct', value: 4200, color: '#0066FF' },
  { label: 'Organic', value: 3100, color: '#FFE500' },
  { label: 'Social', value: 1800, color: '#FF2D78' },
  { label: 'Email', value: 1200, color: '#00FF94' },
  { label: 'Referral', value: 700, color: '#7C3AED' },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-sm p-6">
      <DonutChart data={data} />
    </div>
  ),
};

export const WithCenterLabel: Story = {
  render: () => (
    <div className="max-w-sm p-6 relative">
      <DonutChart
        data={data}
        centerValue="11K"
        centerLabel="Total visits"
      />
    </div>
  ),
};

export const PieVariant: Story = {
  render: () => (
    <div className="max-w-sm p-6">
      <DonutChart data={data} variant="pie" />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="max-w-md p-6">
      <DonutChart data={data} variant="pie" showLabels showLegend={false} height={320} />
    </div>
  ),
};

export const NoLegend: Story = {
  render: () => (
    <div className="max-w-xs p-6 relative">
      <DonutChart
        data={data}
        showLegend={false}
        centerValue={data.reduce((s, d) => s + d.value, 0).toLocaleString()}
        centerLabel="total"
        height={220}
      />
    </div>
  ),
};
