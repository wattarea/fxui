import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: 'Volume',
    defaultValue: [40],
    showValue: true,
  },
  decorators: [(Story) => <div className="p-6 w-80"><Story /></div>],
};

export const WithHint: Story = {
  args: {
    label: 'Brightness',
    defaultValue: [70],
    showValue: true,
    hint: 'Adjust display brightness.',
    formatValue: (v) => `${v}%`,
  },
  decorators: [(Story) => <div className="p-6 w-80"><Story /></div>],
};

export const Range: Story = {
  args: {
    label: 'Price range',
    defaultValue: [20, 80],
    showValue: true,
    formatValue: (v) => `$${v}`,
  },
  decorators: [(Story) => <div className="p-6 w-80"><Story /></div>],
};

export const WithStep: Story = {
  args: {
    label: 'Rating',
    defaultValue: [3],
    min: 1,
    max: 5,
    step: 1,
    showValue: true,
  },
  decorators: [(Story) => <div className="p-6 w-80"><Story /></div>],
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    defaultValue: [50],
    showValue: true,
    disabled: true,
  },
  decorators: [(Story) => <div className="p-6 w-80"><Story /></div>],
};

export const Interactive: Story = {
  args: {
    label: 'Value',
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    disabled: false,
  },
  decorators: [(Story) => <div className="p-6 w-80"><Story /></div>],
};
