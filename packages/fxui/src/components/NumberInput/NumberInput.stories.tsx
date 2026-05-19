import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    label: 'Quantity',
    defaultValue: 1,
    min: 0,
    max: 99,
  },
  decorators: [(Story) => <div className="p-6 w-48"><Story /></div>],
};

export const WithMinMax: Story = {
  args: {
    label: 'Score (0–100)',
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 5,
    hint: 'Use + / − to adjust in steps of 5.',
  },
  decorators: [(Story) => <div className="p-6 w-56"><Story /></div>],
};

export const WithError: Story = {
  args: {
    label: 'Age',
    defaultValue: 0,
    min: 18,
    error: 'You must be at least 18 years old.',
  },
  decorators: [(Story) => <div className="p-6 w-52"><Story /></div>],
};

export const Disabled: Story = {
  args: {
    label: 'Seats',
    defaultValue: 2,
    disabled: true,
  },
  decorators: [(Story) => <div className="p-6 w-48"><Story /></div>],
};

export const DecimalStep: Story = {
  args: {
    label: 'Price',
    defaultValue: 9.99,
    step: 0.01,
    min: 0,
    hint: 'Adjust in $0.01 increments.',
  },
  decorators: [(Story) => <div className="p-6 w-52"><Story /></div>],
};
