import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CommandPalette, CommandPaletteProvider, useCommandPalette, type CommandItem } from './CommandPalette';

const meta: Meta = {
  title: 'Components/Overlay/CommandPalette',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const allItems: CommandItem[] = [
  { id: '1', label: 'Go to Dashboard', icon: '🏠', group: 'Navigation', action: () => alert('Dashboard'), shortcut: 'G D' },
  { id: '2', label: 'Go to Settings', icon: '⚙️', group: 'Navigation', action: () => alert('Settings'), shortcut: 'G S' },
  { id: '3', label: 'Go to Profile', icon: '👤', group: 'Navigation', action: () => alert('Profile') },
  { id: '4', label: 'New Document', icon: '📄', group: 'Actions', action: () => alert('New doc'), shortcut: '⌘N', description: 'Create a blank document' },
  { id: '5', label: 'New Folder', icon: '📂', group: 'Actions', action: () => alert('New folder'), shortcut: '⌘⇧N' },
  { id: '6', label: 'Invite Team Member', icon: '👥', group: 'Actions', action: () => alert('Invite'), description: 'Send an invitation via email' },
  { id: '7', label: 'Toggle Dark Mode', icon: '🌙', group: 'Preferences', action: () => alert('Theme'), keywords: ['theme', 'light', 'dark'] },
  { id: '8', label: 'Keyboard Shortcuts', icon: '⌨️', group: 'Help', action: () => alert('Shortcuts'), shortcut: '?' },
  { id: '9', label: 'Documentation', icon: '📚', group: 'Help', action: () => alert('Docs'), description: 'Open FXUI documentation' },
  { id: '10', label: 'Report a Bug', icon: '🐛', group: 'Help', action: () => alert('Bug report') },
];

export const WithProvider: Story = {
  render: () => {
    function Demo() {
      const { setOpen } = useCommandPalette();
      return (
        <div className="p-6 flex flex-col items-center gap-4">
          <CommandPalette items={allItems} />
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-fx-black bg-fx-white font-bold text-sm rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 font-sans"
          >
            Open Command Palette
          </button>
          <p className="text-sm text-gray-400 font-sans">or press <kbd className="px-1.5 py-0.5 border border-gray-200 rounded text-xs font-mono">⌘K</kbd></p>
        </div>
      );
    }
    return (
      <CommandPaletteProvider>
        <Demo />
      </CommandPaletteProvider>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(false);
      const [lastAction, setLastAction] = React.useState<string | null>(null);

      const items: CommandItem[] = allItems.map((item) => ({
        ...item,
        action: () => {
          setLastAction(item.label);
          setOpen(false);
        },
      }));

      return (
        <div className="p-6 flex flex-col items-center gap-4">
          <CommandPalette items={items} open={open} onOpenChange={setOpen} />
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-fx-black bg-fx-black text-fx-white font-bold text-sm rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 font-sans"
          >
            ⌘ Open Palette
          </button>
          {lastAction && (
            <p className="text-sm font-sans">
              Last action: <strong>{lastAction}</strong>
            </p>
          )}
        </div>
      );
    }
    return <Demo />;
  },
};

export const EmptyState: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = React.useState(true);
      return (
        <div className="p-6">
          <CommandPalette
            items={[]}
            open={open}
            onOpenChange={setOpen}
            emptyText="No commands available"
            placeholder="Try searching…"
          />
          <button onClick={() => setOpen(true)} className="text-sm font-sans underline">Reopen</button>
        </div>
      );
    }
    return <Demo />;
  },
};
