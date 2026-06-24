import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FloatingActionButton } from './FloatingActionButton';

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Components/Core/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

export const Circle: Story = {
  render: () => (
    <div className="p-12 flex flex-wrap gap-6 items-center">
      <FloatingActionButton icon="+" label="Add" />
      <FloatingActionButton icon="✎" label="Edit" variant="yellow" />
      <FloatingActionButton icon="↑" label="Scroll top" variant="blue" />
      <FloatingActionButton icon="✉" label="Message" variant="pink" />
    </div>
  ),
};

export const Pill: Story = {
  render: () => (
    <div className="p-12 flex flex-wrap gap-6 items-center">
      <FloatingActionButton icon="+" label="New Item" shape="pill" />
      <FloatingActionButton icon="✎" label="Edit Mode" shape="pill" variant="yellow" />
      <FloatingActionButton icon="⬆" label="Upload" shape="pill" variant="green" />
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="p-12 flex flex-wrap gap-6 items-center">
      <FloatingActionButton icon="☰" label="Menu" shape="square" />
      <FloatingActionButton icon="⚙" label="Settings" shape="square" variant="blue" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-12 flex flex-wrap gap-6 items-center">
      <FloatingActionButton icon="+" label="Small" size="sm" variant="yellow" />
      <FloatingActionButton icon="+" label="Medium" size="md" />
      <FloatingActionButton icon="+" label="Large" size="lg" variant="pink" />
    </div>
  ),
};

export const FixedPosition: Story = {
  render: () => (
    <div className="relative h-64 border-2 border-fx-black rounded-[4px] overflow-hidden bg-gray-50 p-4">
      <p className="text-sm font-sans text-gray-400">FAB renders fixed in real usage. Static here for preview.</p>
      <div className="absolute bottom-4 right-4">
        <FloatingActionButton icon="+" label="Add" position="static" />
      </div>
    </div>
  ),
};
