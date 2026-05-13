import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components/Typography/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: 'Email address' },
  decorators: [(S) => <div className="p-6"><S /></div>],
};

export const Required: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-3">
      <Label required htmlFor="email">Email address</Label>
      <input id="email" type="email" className="border-2 border-fx-black rounded-[4px] px-3 py-2 text-sm font-sans w-64" placeholder="you@example.com" />
    </div>
  ),
};

export const Optional: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-3">
      <Label optional htmlFor="bio">Bio</Label>
      <textarea id="bio" className="border-2 border-fx-black rounded-[4px] px-3 py-2 text-sm font-sans w-64" rows={3} placeholder="Tell us about yourself…" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-6 space-y-3">
      <Label size="sm" required>Small label</Label>
      <Label size="md" required>Medium label</Label>
      <Label size="lg" required>Large label</Label>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="p-6 max-w-sm space-y-4">
      <div className="space-y-1.5">
        <Label required htmlFor="name">Full name</Label>
        <input id="name" className="w-full border-2 border-fx-black rounded-[4px] px-3 py-2 text-sm font-sans" placeholder="Alice Johnson" />
      </div>
      <div className="space-y-1.5">
        <Label required htmlFor="email2">Email</Label>
        <input id="email2" type="email" className="w-full border-2 border-fx-black rounded-[4px] px-3 py-2 text-sm font-sans" placeholder="alice@example.com" />
      </div>
      <div className="space-y-1.5">
        <Label optional htmlFor="phone">Phone</Label>
        <input id="phone" type="tel" className="w-full border-2 border-fx-black rounded-[4px] px-3 py-2 text-sm font-sans" placeholder="+1 (555) 000-0000" />
      </div>
    </div>
  ),
};
