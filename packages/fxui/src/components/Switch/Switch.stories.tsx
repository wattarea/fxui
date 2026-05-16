import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    description: 'Switch between light and dark theme.',
  },
};

export const Checked: Story = {
  args: {
    label: 'Already enabled',
    defaultChecked: true,
  },
};

export const NoLabel: Story = {
  args: {},
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <Switch label="Default off" />
      <Switch label="Default on" defaultChecked />
      <Switch
        label="With description"
        description="This switch has a supporting description below the label."
        defaultChecked
      />
      <Switch label="Disabled" disabled />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    label: 'Interactive switch',
    description: 'Toggle me!',
    disabled: false,
    defaultChecked: false,
  },
};
