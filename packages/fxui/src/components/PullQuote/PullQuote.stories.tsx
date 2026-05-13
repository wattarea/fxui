import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PullQuote } from './PullQuote';

const meta: Meta<typeof PullQuote> = {
  title: 'Components/Typography/PullQuote',
  component: PullQuote,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PullQuote>;

export const Default: Story = {
  render: () => (
    <div className="p-8 max-w-xl">
      <PullQuote author="Dieter Rams" source="10 Principles of Good Design">
        Good design is as little design as possible.
      </PullQuote>
    </div>
  ),
};

export const AccentColors: Story = {
  render: () => (
    <div className="p-8 flex flex-col gap-8 max-w-xl">
      {(['yellow', 'pink', 'green', 'blue', 'purple', 'black'] as const).map((accent) => (
        <PullQuote key={accent} accent={accent} author="Designer">
          Design is intelligence made visible.
        </PullQuote>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-8 flex flex-col gap-8 max-w-2xl">
      <PullQuote size="sm" accent="pink" author="Author">
        Small pull quote for inline emphasis.
      </PullQuote>
      <PullQuote size="md" accent="yellow" author="Author">
        Medium pull quote — balanced and impactful.
      </PullQuote>
      <PullQuote size="lg" accent="green" author="Author">
        Large pull quote for section headers.
      </PullQuote>
    </div>
  ),
};

export const NoAttribution: Story = {
  render: () => (
    <div className="p-8 max-w-xl">
      <PullQuote accent="blue">
        Simplicity is the ultimate sophistication.
      </PullQuote>
    </div>
  ),
};
