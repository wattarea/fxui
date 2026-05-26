import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataList } from './DataList';

const meta: Meta<typeof DataList> = {
  title: 'Components/DataDisplay/DataList',
  component: DataList,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataList>;

const userItems = [
  { label: 'Full Name', value: 'Alex Johnson' },
  { label: 'Email', value: 'alex@example.com' },
  { label: 'Role', value: 'Senior Engineer' },
  { label: 'Location', value: 'Istanbul, Turkey' },
  { label: 'Status', value: <span className="px-2 py-0.5 text-xs font-bold bg-fx-green text-fx-black border border-fx-black rounded-full">Active</span> },
];

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <DataList items={userItems} />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <DataList items={userItems.slice(0, 3)} orientation="vertical" />
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <DataList items={userItems} striped />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-8 max-w-lg">
      <DataList items={userItems.slice(0, 2)} size="sm" />
      <DataList items={userItems.slice(0, 2)} size="md" />
      <DataList items={userItems.slice(0, 2)} size="lg" />
    </div>
  ),
};
