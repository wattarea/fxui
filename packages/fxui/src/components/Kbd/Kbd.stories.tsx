import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd';

const meta: Meta = {
  title: 'Components/Kbd',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Kbd>⌘</Kbd>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6">
      <Kbd size="sm">⌘</Kbd>
      <Kbd size="md">⌘</Kbd>
      <Kbd size="lg">⌘</Kbd>
    </div>
  ),
};

export const Combos: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-6">
        <Kbd.Combo keys={['⌘', 'K']} />
        <span className="text-sm text-gray-500 font-sans">Open command palette</span>
      </div>
      <div className="flex items-center gap-6">
        <Kbd.Combo keys={['⌘', 'Shift', 'P']} />
        <span className="text-sm text-gray-500 font-sans">Command palette (VS Code)</span>
      </div>
      <div className="flex items-center gap-6">
        <Kbd.Combo keys={['Ctrl', 'C']} />
        <span className="text-sm text-gray-500 font-sans">Copy</span>
      </div>
      <div className="flex items-center gap-6">
        <Kbd.Combo keys={['Alt', 'F4']} />
        <span className="text-sm text-gray-500 font-sans">Close window</span>
      </div>
    </div>
  ),
};

export const ShortcutTable: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <table className="w-full text-sm font-sans border-collapse">
        <tbody className="divide-y-2 divide-gray-100">
          {[
            { keys: ['⌘', 'K'], desc: 'Open search' },
            { keys: ['⌘', 'S'], desc: 'Save file' },
            { keys: ['⌘', 'Z'], desc: 'Undo' },
            { keys: ['⌘', 'Shift', 'Z'], desc: 'Redo' },
            { keys: ['?'], desc: 'Show shortcuts' },
          ].map(({ keys, desc }) => (
            <tr key={desc}>
              <td className="py-2 pr-6"><Kbd.Combo keys={keys} /></td>
              <td className="py-2 text-gray-500">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const InlineProse: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <p className="text-sm font-sans text-fx-black leading-relaxed">
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette,
        or use <Kbd.Combo keys={['⌘', 'Shift', 'P']} /> for advanced options.
        Hit <Kbd>Esc</Kbd> to close.
      </p>
    </div>
  ),
};
