import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'filled', 'flushed'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    disabled: { control: 'boolean' },
    showCount: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
    rows: 4,
  },
  decorators: [(Story) => <div className="p-6 max-w-md"><Story /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-md">
      <Textarea variant="default" label="Default" placeholder="Default variant..." rows={3} />
      <Textarea variant="filled" label="Filled" placeholder="Filled variant..." rows={3} />
      <Textarea variant="flushed" label="Flushed" placeholder="Flushed variant..." rows={3} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Bio',
    defaultValue: 'Too short',
    error: 'Bio must be at least 20 characters.',
    rows: 4,
  },
  decorators: [(Story) => <div className="p-6 max-w-md"><Story /></div>],
};

export const WithHint: Story = {
  args: {
    label: 'Description',
    hint: 'Briefly describe what this project is about.',
    placeholder: 'This project is...',
    rows: 4,
  },
  decorators: [(Story) => <div className="p-6 max-w-md"><Story /></div>],
};

export const WithCharCount: Story = {
  args: {
    label: 'Tweet',
    placeholder: "What's happening?",
    showCount: true,
    maxLength: 280,
    rows: 4,
  },
  decorators: [(Story) => <div className="p-6 max-w-md"><Story /></div>],
};

export const NoResize: Story = {
  args: {
    label: 'Fixed size',
    placeholder: 'This cannot be resized...',
    resize: 'none',
    rows: 4,
  },
  decorators: [(Story) => <div className="p-6 max-w-md"><Story /></div>],
};

export const Interactive: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type here...',
    variant: 'default',
    resize: 'vertical',
    rows: 4,
    disabled: false,
    showCount: false,
  },
  decorators: [(Story) => <div className="p-6 max-w-md"><Story /></div>],
};
