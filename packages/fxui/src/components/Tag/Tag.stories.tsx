import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline', 'neon', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: { children: 'React' },
  decorators: [(S) => <div className="p-6"><S /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6">
      <Tag variant="default">Default</Tag>
      <Tag variant="outline">Outline</Tag>
      <Tag variant="neon">Neon</Tag>
      <Tag variant="ghost">Ghost</Tag>
    </div>
  ),
};

export const Closeable: Story = {
  render: () => {
    function Demo() {
      const [tags, setTags] = React.useState(['React', 'TypeScript', 'Tailwind', 'FXUI', 'Radix']);
      return (
        <div className="flex flex-wrap gap-2 p-6">
          {tags.map((tag) => (
            <Tag key={tag} variant="outline" onClose={() => setTags((t) => t.filter((x) => x !== tag))}>
              {tag}
            </Tag>
          ))}
          {tags.length === 0 && <p className="text-sm text-gray-400">All tags removed</p>}
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6">
      <Tag leftIcon="🚀" variant="neon">New feature</Tag>
      <Tag leftIcon="🐛" variant="outline">Bug</Tag>
      <Tag leftIcon="⚡" variant="ghost">Performance</Tag>
      <Tag leftIcon="✓" variant="default">Done</Tag>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-6">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
    </div>
  ),
};

export const NeonColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6">
      {(['default', 'success', 'warning', 'error', 'info'] as const).map((color) => (
        <Tag key={color} variant="neon" color={color}>{color}</Tag>
      ))}
    </div>
  ),
};
