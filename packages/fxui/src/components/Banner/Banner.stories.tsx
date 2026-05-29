import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Components/Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Banner>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-0 border-2 border-fx-black rounded-[4px] overflow-hidden">
      <Banner variant="yellow" icon="✨">New features available! Check out what's new in v0.2.0</Banner>
      <Banner variant="success">Your account has been verified successfully.</Banner>
      <Banner variant="warning">Your trial expires in 3 days.</Banner>
      <Banner variant="error">Payment failed. Please update your billing information.</Banner>
      <Banner variant="info">Scheduled maintenance on Sunday 02:00–04:00 UTC.</Banner>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Banner
      variant="yellow"
      icon="⚡"
      action={
        <button className="px-3 py-1 text-xs font-bold border-2 border-fx-black rounded-[4px] bg-fx-black text-fx-white hover:opacity-80 transition-opacity">
          Upgrade Now
        </button>
      }
    >
      You're on the free plan — upgrade to unlock unlimited components.
    </Banner>
  ),
};

export const Dismissible: Story = {
  render: () => {
    function Demo() {
      const [show, setShow] = React.useState(true);
      return (
        <div className="p-6">
          {show ? (
            <Banner variant="info" closeable onClose={() => setShow(false)}>
              Click the ✕ to dismiss this banner.
            </Banner>
          ) : (
            <button
              onClick={() => setShow(true)}
              className="text-sm font-sans border-2 border-fx-black px-3 py-1 rounded-[4px]"
            >
              Show Banner
            </button>
          )}
        </div>
      );
    }
    return <Demo />;
  },
};
