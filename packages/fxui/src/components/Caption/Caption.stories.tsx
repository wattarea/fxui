import type { Meta, StoryObj } from '@storybook/react';
import { Caption } from './Caption';

const meta: Meta<typeof Caption> = {
  title: 'Components/Typography/Caption',
  component: Caption,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'muted', 'error', 'success', 'warning'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
  },
};
export default meta;
type Story = StoryObj<typeof Caption>;

export const Default: Story = {
  args: { children: 'This field is required.' },
  decorators: [(S) => <div className="p-6"><S /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="p-6 space-y-2 max-w-xs">
      <Caption variant="default">Default caption text</Caption>
      <Caption variant="muted">Muted — less prominent</Caption>
      <Caption variant="error">Error — something went wrong</Caption>
      <Caption variant="success">Success — changes saved</Caption>
      <Caption variant="warning">Warning — check before continuing</Caption>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="p-6 space-y-2 max-w-xs">
      <Caption icon="ℹ️">Maximum 200 characters</Caption>
      <Caption variant="error" icon="✕">Email is already taken</Caption>
      <Caption variant="success" icon="✓">Password strength: strong</Caption>
    </div>
  ),
};

export const BelowInput: Story = {
  render: () => (
    <div className="p-6 max-w-xs space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-bold font-sans">Username</label>
        <input className="w-full border-2 border-fx-black rounded-[4px] px-3 py-2 text-sm font-sans" defaultValue="alice_j" />
        <Caption variant="success" icon="✓">Username is available</Caption>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-bold font-sans">Email</label>
        <input className="w-full border-2 border-[#FF1744] rounded-[4px] px-3 py-2 text-sm font-sans" defaultValue="bad-email" />
        <Caption variant="error" icon="✕">Please enter a valid email address</Caption>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-bold font-sans">Bio</label>
        <textarea className="w-full border-2 border-fx-black rounded-[4px] px-3 py-2 text-sm font-sans" rows={2} />
        <Caption>0 / 200 characters</Caption>
      </div>
    </div>
  ),
};

export const AsFigcaption: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <figure>
        <div className="border-2 border-fx-black rounded-[4px] shadow-fx bg-fx-yellow h-40 flex items-center justify-center font-bold font-sans">
          Image placeholder
        </div>
        <Caption as="figcaption" align="center" className="mt-2">
          Fig. 1 — Neo-brutalist component example from FXUI
        </Caption>
      </figure>
    </div>
  ),
};
