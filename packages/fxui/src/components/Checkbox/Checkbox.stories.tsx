import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Already checked',
    defaultChecked: true,
  },
};

export const NoLabel: Story = {
  args: {},
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled + checked" disabled defaultChecked />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    label: 'Interactive checkbox',
    disabled: false,
    defaultChecked: false,
  },
};
