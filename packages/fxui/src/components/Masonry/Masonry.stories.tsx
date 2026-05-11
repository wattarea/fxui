import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Masonry } from './Masonry';

const meta: Meta<typeof Masonry> = {
  title: 'Components/Layout/Masonry',
  component: Masonry,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Masonry>;

const colors = ['bg-fx-yellow', 'bg-fx-pink', 'bg-fx-green', 'bg-fx-blue', 'bg-fx-purple'];

const cards = [80, 140, 60, 180, 100, 120, 75, 160, 90, 110, 55, 130];

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Masonry columns={3} gap={16}>
        {cards.map((h, i) => (
          <div
            key={i}
            className={`${colors[i % colors.length]} border-2 border-fx-black rounded-[4px] shadow-fx-sm flex items-center justify-center font-display font-black text-fx-black`}
            style={{ height: h }}
          >
            {i + 1}
          </div>
        ))}
      </Masonry>
    </div>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <div className="p-6">
      <Masonry columns={2} gap={20}>
        {cards.slice(0, 8).map((h, i) => (
          <div
            key={i}
            className={`${colors[i % colors.length]} border-2 border-fx-black rounded-[4px] shadow-fx flex items-center justify-center font-display font-black text-fx-black`}
            style={{ height: h }}
          >
            Card {i + 1}
          </div>
        ))}
      </Masonry>
    </div>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <div className="p-6">
      <Masonry columns={4} gap={12}>
        {cards.map((h, i) => (
          <div
            key={i}
            className={`${colors[i % colors.length]} border-2 border-fx-black rounded-[4px] shadow-fx-sm flex items-center justify-center font-display font-black text-fx-black`}
            style={{ height: h * 0.7 }}
          >
            {i + 1}
          </div>
        ))}
      </Masonry>
    </div>
  ),
};
