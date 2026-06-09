import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Components/Chart/LineChart',
  component: LineChart,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof LineChart>;

const monthlyData = [
  { label: 'Jan', revenue: 4200, profit: 1800, expenses: 2400 },
  { label: 'Feb', revenue: 3800, profit: 1500, expenses: 2300 },
  { label: 'Mar', revenue: 5100, profit: 2300, expenses: 2800 },
  { label: 'Apr', revenue: 4700, profit: 2100, expenses: 2600 },
  { label: 'May', revenue: 6200, profit: 3000, expenses: 3200 },
  { label: 'Jun', revenue: 5800, profit: 2700, expenses: 3100 },
  { label: 'Jul', revenue: 7100, profit: 3400, expenses: 3700 },
  { label: 'Aug', revenue: 6500, profit: 3100, expenses: 3400 },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <LineChart
        data={monthlyData}
        series={[{ key: 'revenue', label: 'Revenue' }]}
      />
    </div>
  ),
};

export const MultiSeries: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <LineChart
        data={monthlyData}
        series={[
          { key: 'revenue', label: 'Revenue' },
          { key: 'profit', label: 'Profit' },
          { key: 'expenses', label: 'Expenses' },
        ]}
      />
    </div>
  ),
};

export const Curved: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <LineChart
        data={monthlyData}
        series={[
          { key: 'revenue', label: 'Revenue' },
          { key: 'profit', label: 'Profit' },
        ]}
        curved
      />
    </div>
  ),
};

export const NoDots: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <LineChart
        data={monthlyData}
        series={[
          { key: 'revenue', label: 'Revenue' },
          { key: 'profit', label: 'Profit' },
        ]}
        showDots={false}
        curved
      />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <LineChart
        data={monthlyData}
        series={[
          { key: 'revenue', label: 'Revenue', color: '#FFE500' },
          { key: 'profit', label: 'Profit', color: '#00FF94' },
          { key: 'expenses', label: 'Expenses', color: '#FF2D78' },
        ]}
      />
    </div>
  ),
};
