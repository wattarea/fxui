import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppSidebar } from './AppSidebar';

const meta: Meta<typeof AppSidebar> = {
  title: 'Components/Navigation/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AppSidebar>;

const sections = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', icon: '📊', active: true },
      { label: 'Inbox', icon: '📬', badge: 12 },
      { label: 'Projects', icon: '📁' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { label: 'Members', icon: '👥' },
      { label: 'Settings', icon: '⚙️' },
      { label: 'Billing', icon: '💳' },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div className="h-96 flex border-2 border-fx-black rounded-[4px] overflow-hidden">
      <AppSidebar
        sections={sections}
        logo={<span className="font-display font-black text-lg text-fx-black dark:text-fx-white">FXUI</span>}
        footer={<p className="text-xs text-gray-400 font-sans">v0.1.0 · MIT</p>}
      />
      <div className="flex-1 p-6 font-sans text-gray-400 text-sm">Main content area</div>
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <div className="h-96 flex border-2 border-fx-black rounded-[4px] overflow-hidden">
      <AppSidebar
        sections={sections}
        logo={<span className="font-display font-black text-lg text-fx-black dark:text-fx-white">FXUI</span>}
        collapsible
      />
      <div className="flex-1 p-6 font-sans text-gray-400 text-sm">Click the arrow to collapse</div>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="h-96 flex border-2 border-fx-black rounded-[4px] overflow-hidden">
      <AppSidebar
        sections={sections}
        logo={<span className="font-display font-black text-lg text-fx-black dark:text-fx-white">FXUI</span>}
        collapsible
        defaultCollapsed
      />
      <div className="flex-1 p-6 font-sans text-gray-400 text-sm">Click the arrow to expand</div>
    </div>
  ),
};
