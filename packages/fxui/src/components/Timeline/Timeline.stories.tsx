import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Timeline>;

const deploymentItems = [
  { title: 'Deployment started', date: '10:00 AM', variant: 'info' as const, description: 'Build triggered by push to main.' },
  { title: 'Tests passed', date: '10:02 AM', variant: 'success' as const, description: '148 tests passed, 0 failed.' },
  { title: 'Build failed', date: '10:04 AM', variant: 'error' as const, description: 'TypeScript error in Button.tsx:42.' },
  { title: 'Fix pushed', date: '10:08 AM', variant: 'default' as const, description: 'Commit abc1234 fixes the type error.' },
  { title: 'Deployed to production', date: '10:12 AM', variant: 'success' as const, description: 'v2.3.1 is live at fxui.dev.' },
];

const activityItems = [
  { title: 'Alice commented on PR #42', date: 'Just now' },
  { title: 'Bob merged feature/navigation', date: '5 min ago', variant: 'success' as const },
  { title: 'CI pipeline failed', date: '12 min ago', variant: 'error' as const },
  { title: 'New release drafted', date: '1 hour ago', variant: 'info' as const },
  { title: 'Repository created', date: '2 days ago' },
];

export const Default: Story = {
  args: { items: deploymentItems },
  decorators: [(S) => <div className="p-6 max-w-sm"><S /></div>],
};

export const WithVariants: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <Timeline items={deploymentItems} />
    </div>
  ),
};

export const ActivityFeed: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <Timeline items={activityItems} />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <Timeline
        items={[
          { title: 'Order placed', date: 'Jan 10', icon: '🛒', description: 'Order #4521 confirmed.' },
          { title: 'Processing', date: 'Jan 11', icon: '⚙️', variant: 'info' },
          { title: 'Shipped', date: 'Jan 12', icon: '📦', variant: 'success', description: 'Tracking: TR123456789.' },
          { title: 'Out for delivery', date: 'Jan 14', icon: '🚚', variant: 'warning' },
          { title: 'Delivered', date: 'Jan 14', icon: '✓', variant: 'success', description: 'Package left at front door.' },
        ]}
      />
    </div>
  ),
};
