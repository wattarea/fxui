import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Components/DataDisplay/List',
  component: List,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof List>;

const techItems = [
  'TypeScript strict mode — typed props, no any',
  'Radix UI primitives for accessibility',
  'CVA for variant management',
  'Tailwind CSS for styling',
];

export const Bullet: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <List variant="bullet" items={techItems} />
    </div>
  ),
};

export const Numbered: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <List variant="numbered" items={['Install fxui-core', 'Add Tailwind plugin', 'Import components', 'Build something brutal']} />
    </div>
  ),
};

export const Checkmarks: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <List variant="check" items={techItems} />
    </div>
  ),
};

export const NeoStyle: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <List
        variant="neo"
        items={[
          { children: 'Free & Open Source', description: 'MIT license, contribute freely', icon: '✅' },
          { children: '100+ Components', description: 'Covering all common UI patterns', icon: '⚡' },
          { children: 'Dark Mode', description: 'Built-in via Tailwind dark: prefix', icon: '🌙' },
          { children: 'TypeScript', description: 'Full type coverage, no any', icon: '🔒' },
        ] as Parameters<typeof List>[0]['items']}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6">
      <List variant="bullet" size="sm" items={['Small item one', 'Small item two']} />
      <List variant="bullet" size="md" items={['Medium item one', 'Medium item two']} />
      <List variant="bullet" size="lg" items={['Large item one', 'Large item two']} />
    </div>
  ),
};
