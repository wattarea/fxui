import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Callout } from './Callout';

const meta: Meta<typeof Callout> = {
  title: 'Components/Feedback/Callout',
  component: Callout,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Callout>;

export const Variants: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-4 max-w-lg">
      <Callout variant="tip" title="Pro Tip">
        Use the <code className="text-xs font-mono bg-fx-black/10 px-1 rounded">cn()</code> utility to merge class names with automatic conflict resolution.
      </Callout>
      <Callout variant="warning" title="Heads Up">
        This component is in beta — the API may change in the next major release.
      </Callout>
      <Callout variant="danger" title="Danger Zone">
        Deleting a workspace cannot be undone. All data will be permanently removed.
      </Callout>
      <Callout variant="info" title="Good to Know">
        FXUI uses Tailwind CSS v3. Ensure you have the correct PostCSS configuration set up.
      </Callout>
      <Callout variant="note" title="Note">
        This feature is only available on the Pro plan.
      </Callout>
    </div>
  ),
};

export const NoTitle: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Callout variant="info">
        You can also use Callout without a title for shorter inline hints.
      </Callout>
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Callout variant="tip" title="Did you know?" icon="🚀">
        FXUI ships with 100+ components, all with Storybook stories and MDX documentation.
      </Callout>
    </div>
  ),
};
