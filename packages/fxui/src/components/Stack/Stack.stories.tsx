import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'col', 'row-reverse', 'col-reverse'] },
    gap: { control: 'select', options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
  },
};
export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({ color = 'bg-fx-yellow', label }: { color?: string; label: string }) => (
  <div className={`${color} border-2 border-fx-black p-4 font-bold font-sans text-sm rounded-[4px] text-center`}>
    {label}
  </div>
);

export const Vertical: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <Stack gap="3">
        <Box label="Item 1" />
        <Box color="bg-fx-pink text-white" label="Item 2" />
        <Box color="bg-fx-green" label="Item 3" />
      </Stack>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="p-6">
      <Stack direction="row" gap="3" align="center">
        <Box label="A" />
        <Box color="bg-fx-pink text-white" label="B" />
        <Box color="bg-fx-green" label="C" />
      </Stack>
    </div>
  ),
};

export const AllGaps: Story = {
  render: () => (
    <div className="p-6 max-w-xs space-y-6">
      {(['0', '2', '4', '8'] as const).map((gap) => (
        <div key={gap}>
          <p className="font-mono text-xs mb-1">gap="{gap}"</p>
          <Stack gap={gap} direction="row">
            <Box label="A" /><Box color="bg-fx-pink text-white" label="B" /><Box color="bg-fx-green" label="C" />
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const Centered: Story = {
  render: () => (
    <div className="p-6">
      <Stack direction="row" align="center" justify="center" gap="4" className="h-32 border-2 border-dashed border-gray-300">
        <Box label="Centered" />
        <Box color="bg-fx-blue text-white" label="Content" />
      </Stack>
    </div>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Stack direction="row" align="center" justify="between">
        <Box label="Logo" />
        <Stack direction="row" gap="2">
          <Box color="bg-transparent" label="Home" />
          <Box color="bg-transparent" label="About" />
          <Box color="bg-fx-black text-white" label="Sign in" />
        </Stack>
      </Stack>
    </div>
  ),
};
