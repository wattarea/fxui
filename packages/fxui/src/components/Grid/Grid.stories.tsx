import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta: Meta = {
  title: 'Components/Layout/Grid',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const colors = [
  'bg-fx-yellow', 'bg-fx-pink', 'bg-fx-green',
  'bg-fx-blue', 'bg-fx-purple', 'bg-fx-black',
  'bg-gray-200', 'bg-gray-400', 'bg-gray-600',
];

const Box = ({ i, label }: { i: number; label?: string }) => (
  <div className={`${colors[i % colors.length]} border-2 border-fx-black p-4 font-bold font-sans text-sm rounded-[4px] text-center ${i >= 5 ? 'text-white' : ''}`}>
    {label ?? `Item ${i + 1}`}
  </div>
);

export const ThreeColumns: Story = {
  render: () => (
    <div className="p-6">
      <Grid cols="3" gap="4">
        {Array.from({ length: 6 }, (_, i) => <Box key={i} i={i} />)}
      </Grid>
    </div>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <div className="p-6 max-w-2xl">
      <Grid cols="2" gap="4">
        {Array.from({ length: 4 }, (_, i) => <Box key={i} i={i} />)}
      </Grid>
    </div>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <div className="p-6">
      <Grid cols="4" gap="3">
        {Array.from({ length: 8 }, (_, i) => <Box key={i} i={i} />)}
      </Grid>
    </div>
  ),
};

export const WithColSpan: Story = {
  render: () => (
    <div className="p-6">
      <Grid cols="3" gap="4">
        <Grid.Item colSpan="2"><Box i={0} label="Wide item (colSpan=2)" /></Grid.Item>
        <Box i={1} />
        <Box i={2} />
        <Grid.Item colSpan="full"><Box i={3} label="Full width (colSpan=full)" /></Grid.Item>
        <Box i={4} />
        <Box i={5} />
      </Grid>
    </div>
  ),
};

export const MasonryLike: Story = {
  render: () => (
    <div className="p-6">
      <Grid cols="4" gap="4">
        <Grid.Item colSpan="2" rowSpan="2">
          <div className="bg-fx-yellow border-2 border-fx-black rounded-[4px] h-full min-h-[120px] flex items-center justify-center font-bold font-sans">
            Featured
          </div>
        </Grid.Item>
        <Box i={1} label="Small 1" />
        <Box i={2} label="Small 2" />
        <Box i={3} label="Small 3" />
        <Box i={4} label="Small 4" />
        <Grid.Item colSpan="4"><Box i={5} label="Footer row" /></Grid.Item>
      </Grid>
    </div>
  ),
};

export const AllGaps: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      {(['2', '4', '8'] as const).map((gap) => (
        <div key={gap}>
          <p className="font-mono text-xs mb-2">gap="{gap}"</p>
          <Grid cols="4" gap={gap}>
            {Array.from({ length: 4 }, (_, i) => <Box key={i} i={i} />)}
          </Grid>
        </div>
      ))}
    </div>
  ),
};
