import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavMenu } from './NavMenu';

const meta: Meta<typeof NavMenu> = {
  title: 'Components/Navigation/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof NavMenu>;

const noNav = (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault();

export const Default: Story = {
  render: () => (
    <div className="p-6 border-2 border-fx-black rounded-[4px]">
      <NavMenu
        items={[
          { label: 'Home', href: '#', active: true, onClick: noNav },
          {
            label: 'Products',
            group: {
              trigger: 'Products',
              links: [
                { label: 'FXUI Core', href: '#', description: 'Open-source component library', icon: '⚡', onClick: noNav },
                { label: 'FXUI Pro', href: '#', description: '60 premium components', icon: '💎', onClick: noNav },
                { label: 'Templates', href: '#', description: 'Ready-to-use page templates', icon: '🎨', onClick: noNav },
              ],
            },
          },
          {
            label: 'Resources',
            group: {
              trigger: 'Resources',
              links: [
                { label: 'Documentation', href: '#', description: 'Guides and API reference', icon: '📖', onClick: noNav },
                { label: 'Storybook', href: '#', description: 'Interactive component demos', icon: '📚', onClick: noNav },
                { label: 'GitHub', href: '#', description: 'Source code and issues', icon: '🐙', onClick: noNav },
              ],
            },
          },
          { label: 'Blog', href: '#', onClick: noNav },
          { label: 'About', href: '#', onClick: noNav },
        ]}
      />
    </div>
  ),
};
