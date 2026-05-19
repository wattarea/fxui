import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InputGroup } from './InputGroup';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/Form/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <InputGroup placeholder="Enter value…" />
    </div>
  ),
};

export const WithPrefix: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <InputGroup prefix="https://" placeholder="yoursite.com" />
      <InputGroup prefix="$" placeholder="0.00" type="number" />
      <InputGroup prefix="@" placeholder="username" />
    </div>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <InputGroup suffix=".com" placeholder="yoursite" />
      <InputGroup suffix="USD" placeholder="0.00" type="number" />
      <InputGroup suffix="kg" placeholder="0" type="number" />
    </div>
  ),
};

export const WithBoth: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <InputGroup prefix="$" suffix="USD" placeholder="0.00" type="number" />
      <InputGroup prefix="https://" suffix="/path" placeholder="example.com" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <InputGroup
        prefix={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        }
        placeholder="Search…"
      />
      <InputGroup
        prefix={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
          </svg>
        }
        type="email"
        placeholder="you@example.com"
      />
      <InputGroup
        suffix={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        }
        type="password"
        placeholder="Password"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <InputGroup size="sm" prefix="$" placeholder="Small" />
      <InputGroup size="md" prefix="$" placeholder="Medium (default)" />
      <InputGroup size="lg" prefix="$" placeholder="Large" />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <InputGroup prefix="@" placeholder="username" error defaultValue="taken_name" />
      <InputGroup prefix="https://" placeholder="site.com" error />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <InputGroup prefix="$" placeholder="Disabled" disabled defaultValue="100" />
      <InputGroup suffix=".com" placeholder="site" disabled />
    </div>
  ),
};

export const APIKeyInput: Story = {
  render: () => {
    function Demo() {
      const [visible, setVisible] = React.useState(false);
      return (
        <div className="p-6 max-w-md flex flex-col gap-2">
          <label className="text-sm font-bold font-sans text-fx-black">API Key</label>
          <div className="flex gap-2">
            <InputGroup
              prefix="sk-"
              type={visible ? 'text' : 'password'}
              defaultValue="fxui_live_abc123xyz456"
              readOnly
              className="font-mono"
            />
            <button
              onClick={() => setVisible((v) => !v)}
              className="shrink-0 px-3 h-10 border-2 border-fx-black rounded-[4px] text-sm font-bold font-sans hover:bg-gray-100 transition-colors"
            >
              {visible ? 'Hide' : 'Show'}
            </button>
          </div>
          <p className="text-xs text-gray-400 font-sans">Keep your API key private.</p>
        </div>
      );
    }
    return <Demo />;
  },
};
