import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Misc/Rating',
  component: Rating,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [v, setV] = React.useState(3);
      return (
        <div className="p-6 space-y-2">
          <Rating value={v} onChange={setV} label="Product rating" />
          <p className="text-sm font-sans text-gray-500">Value: <strong>{v}</strong></p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const HalfStar: Story = {
  render: () => {
    function Demo() {
      const [v, setV] = React.useState(3.5);
      return (
        <div className="p-6 space-y-2">
          <Rating value={v} onChange={setV} precision="half" label="Half-star precision" />
          <p className="text-sm font-sans text-gray-500">Value: <strong>{v}</strong></p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 space-y-4">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Rating key={s} defaultValue={3} size={s} label={s} />
      ))}
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className="p-6 space-y-3">
      <Rating value={4} readOnly label="4 / 5 — Excellent" />
      <Rating value={3.5} readOnly precision="half" label="3.5 / 5 — Good" />
      <Rating value={1} readOnly label="1 / 5 — Poor" />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="p-6 space-y-4">
      <Rating defaultValue={4} color="#FF2D78" label="Pink" />
      <Rating defaultValue={3} color="#0066FF" label="Blue" />
      <Rating defaultValue={5} color="#00FF94" label="Green" />
    </div>
  ),
};

export const CustomMax: Story = {
  render: () => {
    function Demo() {
      const [v, setV] = React.useState(6);
      return (
        <div className="p-6 space-y-2">
          <Rating value={v} onChange={setV} max={10} label="Out of 10" />
          <p className="text-sm font-sans text-gray-500">Value: <strong>{v}</strong> / 10</p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const Disabled: Story = {
  render: () => <div className="p-6"><Rating defaultValue={3} disabled label="Disabled" /></div>,
};
