import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

const planOptions = [
  { value: 'free', label: 'Free', description: 'Up to 3 projects, community support.' },
  { value: 'pro', label: 'Pro', description: 'Unlimited projects, priority support.' },
  { value: 'enterprise', label: 'Enterprise', description: 'Custom limits, dedicated support.' },
];

const sizeOptions = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

export const Default: Story = {
  args: {
    label: 'Plan',
    options: planOptions,
    defaultValue: 'free',
  },
  decorators: [(Story) => <div className="p-6 max-w-sm"><Story /></div>],
};

export const Horizontal: Story = {
  args: {
    label: 'Size',
    options: sizeOptions,
    orientation: 'horizontal',
    defaultValue: 'md',
  },
  decorators: [(Story) => <div className="p-6"><Story /></div>],
};

export const WithError: Story = {
  args: {
    label: 'Plan',
    options: sizeOptions,
    error: 'Please select a plan to continue.',
  },
  decorators: [(Story) => <div className="p-6 max-w-sm"><Story /></div>],
};

export const WithHint: Story = {
  args: {
    label: 'Notification preference',
    options: [
      { value: 'all', label: 'All notifications' },
      { value: 'mentions', label: 'Mentions only' },
      { value: 'none', label: 'None', description: 'You will not receive any notifications.' },
    ],
    hint: 'You can change this later in settings.',
    defaultValue: 'mentions',
  },
  decorators: [(Story) => <div className="p-6 max-w-sm"><Story /></div>],
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Role',
    options: [
      { value: 'viewer', label: 'Viewer' },
      { value: 'editor', label: 'Editor' },
      { value: 'admin', label: 'Admin', description: 'Contact support to upgrade.', disabled: true },
    ],
    defaultValue: 'viewer',
  },
  decorators: [(Story) => <div className="p-6 max-w-sm"><Story /></div>],
};
