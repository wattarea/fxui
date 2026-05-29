import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Notification } from './Notification';

const meta: Meta<typeof Notification> = {
  title: 'Components/Feedback/Notification',
  component: Notification,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Notification>;

export const Variants: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-3 max-w-sm">
      <Notification title="Success!" description="Your changes have been saved." variant="success" />
      <Notification title="Warning" description="Your storage is almost full." variant="warning" />
      <Notification title="Error" description="Failed to connect to the server." variant="error" />
      <Notification title="Info" description="A new version is available." variant="info" />
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <Notification
        title="Team invite"
        description="Alex invited you to join the FXUI team."
        timestamp="2 min ago"
        variant="info"
        unread
        actions={[
          { label: 'Accept', onClick: () => alert('Accepted') },
          { label: 'Decline', onClick: () => alert('Declined') },
        ]}
      />
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    function Demo() {
      const [items, setItems] = React.useState([
        { id: 1, title: 'Build complete', desc: 'Production build finished in 12s', variant: 'success' as const },
        { id: 2, title: 'PR Review', desc: 'Selman requested changes on #42', variant: 'warning' as const },
        { id: 3, title: 'Deployment failed', desc: 'Vercel build error on main branch', variant: 'error' as const },
      ]);
      return (
        <div className="p-6 flex flex-col gap-3 max-w-sm">
          {items.map((n) => (
            <Notification
              key={n.id}
              title={n.title}
              description={n.desc}
              variant={n.variant}
              closeable
              onClose={() => setItems((prev) => prev.filter((x) => x.id !== n.id))}
            />
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};
