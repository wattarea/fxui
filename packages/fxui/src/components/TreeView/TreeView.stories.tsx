import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TreeView } from './TreeView';
import type { TreeViewNode } from './TreeView';

const meta: Meta<typeof TreeView> = {
  title: 'Components/DataDisplay/TreeView',
  component: TreeView,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TreeView>;

const fileTree: TreeViewNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'Button.tsx', label: 'Button.tsx' },
          { id: 'Card.tsx', label: 'Card.tsx' },
          { id: 'Input.tsx', label: 'Input.tsx' },
        ],
      },
      {
        id: 'hooks',
        label: 'hooks',
        children: [
          { id: 'useTheme.ts', label: 'useTheme.ts' },
          { id: 'useMediaQuery.ts', label: 'useMediaQuery.ts' },
        ],
      },
      { id: 'index.ts', label: 'index.ts' },
      { id: 'styles.css', label: 'styles.css' },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [
      { id: 'favicon.ico', label: 'favicon.ico' },
      { id: 'logo.svg', label: 'logo.svg' },
    ],
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'README.md', label: 'README.md' },
];

export const FileExplorer: Story = {
  render: () => (
    <div className="p-6 max-w-xs border-2 border-fx-black rounded-[4px]">
      <TreeView
        nodes={fileTree}
        defaultExpanded={['src', 'components']}
        aria-label="File explorer"
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="p-6 max-w-xs border-2 border-fx-black rounded-[4px]">
      <TreeView
        nodes={[
          { id: 'design', label: 'Design System', icon: '🎨', children: [
            { id: 'colors', label: 'Colors', icon: '🎨' },
            { id: 'typography', label: 'Typography', icon: 'T' },
          ]},
          { id: 'docs', label: 'Documentation', icon: '📖', children: [
            { id: 'api', label: 'API Reference', icon: '📌' },
            { id: 'guide', label: 'Guides', icon: '📝' },
          ]},
        ]}
        defaultExpanded={['design']}
        aria-label="Navigation tree"
      />
    </div>
  ),
};

export const WithSelection: Story = {
  render: () => {
    function Demo() {
      const [sel, setSel] = React.useState('');
      return (
        <div className="p-6 max-w-xs">
          <div className="border-2 border-fx-black rounded-[4px] mb-3">
            <TreeView
              nodes={fileTree}
              defaultExpanded={['src']}
              onSelect={(id) => setSel(id)}
              aria-label="Selectable file tree"
            />
          </div>
          <p className="text-xs font-sans text-gray-400">Selected: {sel || 'none'}</p>
        </div>
      );
    }
    return <Demo />;
  },
};
