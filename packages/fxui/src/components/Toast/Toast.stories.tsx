import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj;

function ToastDemo({ variant, title, description }: { variant?: 'default' | 'success' | 'error' | 'warning' | 'info'; title: string; description?: string }) {
  const { toast } = useToast();
  return (
    <Button
      variant={variant === 'error' ? 'destructive' : variant === 'success' ? 'neon' : 'default'}
      onClick={() => toast({ variant, title, description })}
    >
      Show {variant ?? 'default'} toast
    </Button>
  );
}

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <ToastDemo title="Notification" description="This is a default toast message." />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6">
      <ToastDemo variant="default" title="Default" description="Default toast." />
      <ToastDemo variant="success" title="Success!" description="Your changes were saved." />
      <ToastDemo variant="error" title="Error" description="Something went wrong." />
      <ToastDemo variant="warning" title="Warning" description="Please review your input." />
      <ToastDemo variant="info" title="Info" description="A new version is available." />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => {
    function Demo() {
      const { toast } = useToast();
      return (
        <Button onClick={() =>
          toast({
            variant: 'default',
            title: 'File deleted',
            description: 'report-2024.pdf was deleted.',
            action: { label: 'Undo', onClick: () => alert('Undone!') },
          })
        }>
          Delete file
        </Button>
      );
    }
    return <div className="p-6"><Demo /></div>;
  },
};

export const TitleOnly: Story = {
  render: () => (
    <div className="p-6">
      <ToastDemo variant="success" title="Copied to clipboard!" />
    </div>
  ),
};
