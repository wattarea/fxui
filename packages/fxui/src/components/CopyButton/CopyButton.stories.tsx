import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CopyButton } from './CopyButton';
import { Code } from '../Code/Code';

const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'ghost', 'icon'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: { value: 'pnpm add fxui-core', label: 'Copy' },
  decorators: [(S) => <div className="p-6"><S /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6">
      <CopyButton value="copy me" variant="default" label="Default" />
      <CopyButton value="copy me" variant="ghost" label="Ghost" />
      <CopyButton value="copy me" iconOnly />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-6">
      <CopyButton value="copy" size="sm" />
      <CopyButton value="copy" size="md" />
      <CopyButton value="copy" size="lg" />
    </div>
  ),
};

export const WithCode: Story = {
  render: () => {
    const snippet = "pnpm add fxui-core";
    return (
      <div className="p-6 max-w-md">
        <div className="flex items-center justify-between gap-3 border-2 border-fx-black rounded-[4px] shadow-fx px-4 py-2 bg-gray-50">
          <Code>{snippet}</Code>
          <CopyButton value={snippet} iconOnly />
        </div>
      </div>
    );
  },
};

export const InstallBlock: Story = {
  render: () => {
    const commands = [
      { pkg: 'pnpm', cmd: 'pnpm add fxui-core' },
      { pkg: 'npm',  cmd: 'npm install fxui-core' },
      { pkg: 'yarn', cmd: 'yarn add fxui-core' },
    ];
    return (
      <div className="p-6 max-w-sm space-y-2">
        {commands.map(({ pkg, cmd }) => (
          <div key={pkg} className="flex items-center justify-between border-2 border-fx-black rounded-[4px] px-3 py-2">
            <span className="font-mono text-sm">{cmd}</span>
            <CopyButton value={cmd} iconOnly size="sm" />
          </div>
        ))}
      </div>
    );
  },
};
