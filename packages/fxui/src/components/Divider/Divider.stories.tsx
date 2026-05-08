import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'dashed', 'dotted'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    labelPlacement: { control: 'select', options: ['start', 'center', 'end'] },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  decorators: [(S) => <div className="p-6 w-80"><S /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 w-80">
      <Divider variant="solid" />
      <Divider variant="dashed" />
      <Divider variant="dotted" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 w-80">
      <Divider label="OR" />
      <Divider label="CONTINUE WITH" />
      <Divider label="TODAY" variant="dashed" />
    </div>
  ),
};

export const LabelPlacements: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 w-80">
      <Divider label="Start" labelPlacement="start" />
      <Divider label="Center" labelPlacement="center" />
      <Divider label="End" labelPlacement="end" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6 h-24">
      <span className="text-sm font-sans">Home</span>
      <Divider orientation="vertical" />
      <span className="text-sm font-sans">About</span>
      <Divider orientation="vertical" variant="dashed" />
      <span className="text-sm font-sans">Contact</span>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="p-6 max-w-sm border-2 border-fx-black rounded-[4px] shadow-fx">
      <p className="font-bold font-sans">Sign in with email</p>
      <div className="mt-4 space-y-3">
        <input className="w-full border-2 border-fx-black rounded-[4px] px-3 py-2 font-sans text-sm" placeholder="you@example.com" />
        <input className="w-full border-2 border-fx-black rounded-[4px] px-3 py-2 font-sans text-sm" type="password" placeholder="Password" />
      </div>
      <div className="my-5">
        <Divider label="OR" />
      </div>
      <button className="w-full border-2 border-fx-black rounded-[4px] px-4 py-2 font-bold font-sans text-sm shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
        Continue with GitHub
      </button>
    </div>
  ),
};
