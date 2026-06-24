import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ContextMenu } from './ContextMenu';

const meta: Meta = {
  title: 'Components/Overlay/ContextMenu',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const Area = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <div
      ref={ref}
      className="flex items-center justify-center h-40 border-2 border-dashed border-fx-black dark:border-fx-white rounded-[4px] bg-gray-50 dark:bg-gray-900 text-sm font-sans text-gray-400 select-none"
      {...props}
    >
      {children}
    </div>
  )
);

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <ContextMenu>
        <ContextMenu.Trigger asChild>
          <Area>Right-click here</Area>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item icon="✂️" shortcut="⌘X">Cut</ContextMenu.Item>
          <ContextMenu.Item icon="📋" shortcut="⌘C">Copy</ContextMenu.Item>
          <ContextMenu.Item icon="📌" shortcut="⌘V">Paste</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item icon="🗑️" destructive>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </div>
  ),
};

export const FileExplorer: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <ContextMenu>
        <ContextMenu.Trigger asChild>
          <div className="border-2 border-fx-black rounded-[4px] shadow-fx">
            <div className="p-3 border-b-2 border-fx-black bg-fx-black text-fx-white">
              <span className="text-xs font-black tracking-widest uppercase font-sans">Explorer</span>
            </div>
            <div className="p-2 space-y-1">
              {['src/', 'package.json', 'tailwind.config.ts', 'README.md'].map((f) => (
                <div key={f} className="flex items-center gap-2 px-2 py-1.5 rounded-[4px] hover:bg-gray-100 cursor-pointer text-sm font-mono">
                  {f.endsWith('/') ? '📂' : '📄'} {f}
                </div>
              ))}
            </div>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item icon="📄">New file</ContextMenu.Item>
          <ContextMenu.Item icon="📂">New folder</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item icon="✂️" shortcut="⌘X">Cut</ContextMenu.Item>
          <ContextMenu.Item icon="📋" shortcut="⌘C">Copy</ContextMenu.Item>
          <ContextMenu.Item icon="📌" shortcut="⌘V">Paste</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item icon="✏️">Rename</ContextMenu.Item>
          <ContextMenu.Item icon="🗑️" destructive shortcut="⌫">Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </div>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    function Demo() {
      const [bold, setBold] = React.useState(false);
      const [italic, setItalic] = React.useState(false);
      const [underline, setUnderline] = React.useState(true);
      return (
        <div className="p-6 max-w-md">
          <ContextMenu>
            <ContextMenu.Trigger asChild>
              <Area>Right-click for text formatting</Area>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Label>Formatting</ContextMenu.Label>
              <ContextMenu.CheckboxItem checked={bold} onCheckedChange={setBold}>Bold</ContextMenu.CheckboxItem>
              <ContextMenu.CheckboxItem checked={italic} onCheckedChange={setItalic}>Italic</ContextMenu.CheckboxItem>
              <ContextMenu.CheckboxItem checked={underline} onCheckedChange={setUnderline}>Underline</ContextMenu.CheckboxItem>
            </ContextMenu.Content>
          </ContextMenu>
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithSubmenu: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <ContextMenu>
        <ContextMenu.Trigger asChild>
          <Area>Right-click for more options</Area>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item icon="✏️">Edit</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>🔗 Share</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item icon="🐦">Twitter</ContextMenu.Item>
              <ContextMenu.Item icon="💼">LinkedIn</ContextMenu.Item>
              <ContextMenu.Item icon="📧">Email</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
          <ContextMenu.Separator />
          <ContextMenu.Item icon="🗑️" destructive>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </div>
  ),
};
