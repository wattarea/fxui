import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'flushed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-sm">
      <Input variant="default" label="Default" placeholder="Default variant" />
      <Input variant="filled" label="Filled" placeholder="Filled variant" />
      <Input variant="flushed" label="Flushed" placeholder="Flushed variant" />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'Username is already taken',
    defaultValue: 'john_doe',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    hint: 'Must be at least 8 characters',
  },
};

export const WithAddons: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-sm">
      <Input label="Website" leftAddon="https://" placeholder="example.com" />
      <Input label="Price" leftAddon="$" rightAddon="USD" placeholder="0.00" type="number" />
      <Input label="Search" rightAddon="⌘K" placeholder="Search..." />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    label: 'Interactive Input',
    placeholder: 'Type something...',
    variant: 'default',
  },
};
