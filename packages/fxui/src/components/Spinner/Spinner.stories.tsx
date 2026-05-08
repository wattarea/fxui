import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['default', 'white', 'neon', 'primary'] },
  },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: 'md', variant: 'default' },
  decorators: [(S) => <div className="p-6"><S /></div>],
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <div className="p-3 border-2 border-fx-black rounded-[4px]">
        <Spinner variant="default" size="lg" />
      </div>
      <div className="p-3 bg-fx-black border-2 border-fx-black rounded-[4px]">
        <Spinner variant="white" size="lg" />
      </div>
      <div className="p-3 border-2 border-fx-black rounded-[4px]">
        <Spinner variant="neon" size="lg" />
      </div>
      <div className="p-3 border-2 border-fx-black rounded-[4px]">
        <Spinner variant="primary" size="lg" />
      </div>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6">
      <button className="inline-flex items-center gap-2 px-4 py-2 bg-fx-black text-fx-white font-bold border-2 border-fx-black rounded-[4px] shadow-fx cursor-not-allowed opacity-70">
        <Spinner size="sm" variant="white" />
        Saving...
      </button>
    </div>
  ),
};
