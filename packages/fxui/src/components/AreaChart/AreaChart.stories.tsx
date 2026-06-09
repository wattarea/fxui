import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart } from './AreaChart';

const meta: Meta<typeof AreaChart> = {
  title: 'Components/Chart/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AreaChart>;

const data = [
  { label: 'Jan', web: 4200, mobile: 2400, desktop: 1800 },
  { label: 'Feb', web: 3800, mobile: 2800, desktop: 1600 },
  { label: 'Mar', web: 5100, mobile: 3200, desktop: 2100 },
  { label: 'Apr', web: 4700, mobile: 3000, desktop: 2000 },
  { label: 'May', web: 6200, mobile: 3800, desktop: 2400 },
  { label: 'Jun', web: 5800, mobile: 3600, desktop: 2200 },
  { label: 'Jul', web: 7100, mobile: 4200, desktop: 2700 },
  { label: 'Aug', web: 6500, mobile: 4000, desktop: 2500 },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <AreaChart data={data} series={[{ key: 'web', label: 'Web' }]} />
    </div>
  ),
};

export const MultiSeries: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <AreaChart
        data={data}
        series={[
          { key: 'web', label: 'Web' },
          { key: 'mobile', label: 'Mobile' },
          { key: 'desktop', label: 'Desktop' },
        ]}
      />
    </div>
  ),
};

export const Stacked: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <AreaChart
        data={data}
        series={[
          { key: 'web', label: 'Web' },
          { key: 'mobile', label: 'Mobile' },
          { key: 'desktop', label: 'Desktop' },
        ]}
        stacked
        fillOpacity={0.4}
      />
    </div>
  ),
};

export const Linear: Story = {
  render: () => (
    <div className="max-w-2xl p-6">
      <AreaChart
        data={data}
        series={[
          { key: 'web', label: 'Web' },
          { key: 'mobile', label: 'Mobile' },
        ]}
        curved={false}
      />
    </div>
  ),
};
