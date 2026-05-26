import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Avatar fallback="Alice Johnson" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-6">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Avatar key={size} size={size} fallback="AJ" />
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6">
      <Avatar src="https://i.pravatar.cc/150?img=1" alt="Alice" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="Bob" size="lg" />
      <Avatar src="https://broken-url.xyz/img.jpg" alt="Broken" fallback="Error" size="lg" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar shape="circle" fallback="AJ" size="xl" />
        <span className="text-xs font-mono">circle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar shape="square" fallback="AJ" size="xl" />
        <span className="text-xs font-mono">square</span>
      </div>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <Avatar.Group>
        <Avatar fallback="Alice" />
        <Avatar fallback="Bob" />
        <Avatar fallback="Carol" />
      </Avatar.Group>
      <Avatar.Group max={3}>
        <Avatar fallback="Alice" />
        <Avatar fallback="Bob" />
        <Avatar fallback="Carol" />
        <Avatar fallback="David" />
        <Avatar fallback="Eve" />
      </Avatar.Group>
    </div>
  ),
};
