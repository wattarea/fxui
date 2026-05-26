import type { Meta, StoryObj } from '@storybook/react';
import { Stat } from './Stat';

const meta: Meta<typeof Stat> = {
  title: 'Components/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
  },
};
export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$48,295',
    change: '+12.5%',
    trend: 'up',
    description: 'vs last month',
  },
  decorators: [(S) => <div className="p-6 w-64"><S /></div>],
};

export const AllTrends: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-6">
      <Stat label="Revenue" value="$48k" change="+12%" trend="up" description="vs last month" />
      <Stat label="Churn" value="2.4%" change="-0.3%" trend="down" description="vs last month" />
      <Stat label="Active Users" value="1,204" change="0%" trend="neutral" description="no change" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-6 max-w-lg">
      <Stat label="Users" value="12,453" change="+8.2%" trend="up" icon="👥" description="this week" />
      <Stat label="Orders" value="3,821" change="+4.1%" trend="up" icon="📦" description="this week" />
      <Stat label="Revenue" value="$94.2k" change="-2.3%" trend="down" icon="💰" description="this week" />
      <Stat label="Uptime" value="99.9%" trend="neutral" icon="⚡" description="last 30 days" />
    </div>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-6">
      <Stat label="MRR" value="$12.4k" change="+18%" trend="up" description="vs last month" />
      <Stat label="ARR" value="$148k" change="+18%" trend="up" description="annualized" />
      <Stat label="Churn" value="1.2%" change="-0.5%" trend="down" description="vs last month" />
      <Stat label="NPS" value="72" change="+4" trend="up" description="last survey" />
    </div>
  ),
};
