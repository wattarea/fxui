import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'info', 'success', 'warning', 'error'] },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    title: 'Heads up!',
    children: 'You can change your email in account settings.',
  },
  decorators: [(S) => <div className="p-6 max-w-md"><S /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-md">
      <Alert variant="default" title="Default">Something to know about.</Alert>
      <Alert variant="info" title="Info">Your session will expire in 10 minutes.</Alert>
      <Alert variant="success" title="Success!">Your profile has been updated.</Alert>
      <Alert variant="warning" title="Warning">Disk space is running low (90% used).</Alert>
      <Alert variant="error" title="Error">Failed to connect to the server.</Alert>
    </div>
  ),
};

export const WithClose: Story = {
  render: () => {
    function Demo() {
      const [visible, setVisible] = React.useState(true);
      if (!visible) return (
        <button className="text-sm underline" onClick={() => setVisible(true)}>Show alert</button>
      );
      return (
        <Alert variant="warning" title="Unsaved changes" onClose={() => setVisible(false)}>
          You have unsaved changes. They will be lost if you navigate away.
        </Alert>
      );
    }
    return <div className="p-6 max-w-md"><Demo /></div>;
  },
};

export const DescriptionOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 max-w-md">
      <Alert variant="info">No title, just description text goes here.</Alert>
      <Alert variant="success">Profile saved successfully.</Alert>
    </div>
  ),
};
