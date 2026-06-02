import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const noNav = (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault();

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Breadcrumb items={[
        { label: 'Home', href: '/', onClick: noNav },
        { label: 'Docs', href: '/docs', onClick: noNav },
        { label: 'Button' },
      ]} />
    </div>
  ),
};

export const TwoLevels: Story = {
  render: () => (
    <div className="p-6">
      <Breadcrumb items={[
        { label: 'Home', href: '/', onClick: noNav },
        { label: 'Components' },
      ]} />
    </div>
  ),
};

export const DeepNesting: Story = {
  render: () => (
    <div className="p-6">
      <Breadcrumb items={[
        { label: 'Home', href: '/', onClick: noNav },
        { label: 'Products', href: '/products', onClick: noNav },
        { label: 'Electronics', href: '/products/electronics', onClick: noNav },
        { label: 'Laptops', href: '/products/electronics/laptops', onClick: noNav },
        { label: 'MacBook Pro 16"' },
      ]} />
    </div>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/', onClick: noNav },
          { label: 'Docs', href: '/docs', onClick: noNav },
          { label: 'Breadcrumb' },
        ]}
        separator="›"
      />
    </div>
  ),
};

export const ArrowSeparator: Story = {
  render: () => (
    <div className="p-6">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard', onClick: noNav },
          { label: 'Settings', href: '/settings', onClick: noNav },
          { label: 'Profile' },
        ]}
        separator="→"
      />
    </div>
  ),
};
