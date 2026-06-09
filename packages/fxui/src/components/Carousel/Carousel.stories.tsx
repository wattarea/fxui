import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Media/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Carousel>;

const colors = [
  { bg: 'bg-fx-yellow', label: 'Yellow' },
  { bg: 'bg-fx-pink', label: 'Pink' },
  { bg: 'bg-fx-green', label: 'Green' },
  { bg: 'bg-fx-blue', label: 'Blue' },
  { bg: 'bg-fx-purple', label: 'Purple' },
];

const slides = colors.map(({ bg, label }) => (
  <div key={label} className={`${bg} h-48 flex items-center justify-center`}>
    <span className="font-display text-4xl font-black text-fx-black">{label}</span>
  </div>
));

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-lg border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
      <Carousel items={slides} />
    </div>
  ),
};

export const AutoPlay: Story = {
  render: () => (
    <div className="w-full max-w-lg border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
      <Carousel items={slides} autoPlay autoPlayInterval={2000} />
    </div>
  ),
};

export const NoArrows: Story = {
  render: () => (
    <div className="w-full max-w-lg border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
      <Carousel items={slides} showArrows={false} />
    </div>
  ),
};

export const NoDots: Story = {
  render: () => (
    <div className="w-full max-w-lg border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
      <Carousel items={slides} showDots={false} />
    </div>
  ),
};

export const NoLoop: Story = {
  render: () => (
    <div className="w-full max-w-lg border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
      <Carousel items={slides} loop={false} />
    </div>
  ),
};

export const CardContent: Story = {
  render: () => {
    const cards = [
      { title: 'Design Systems', body: 'Build scalable, consistent UIs with tokens and components.', accent: 'bg-fx-yellow' },
      { title: 'Accessibility', body: 'ARIA-compliant, keyboard-navigable, screen-reader friendly.', accent: 'bg-fx-green' },
      { title: 'Dark Mode', body: 'First-class dark support via Tailwind dark: prefix.', accent: 'bg-fx-blue' },
    ];
    const cardSlides = cards.map((c) => (
      <div key={c.title} className="p-8">
        <div className="border-2 border-fx-black rounded-[4px] shadow-fx p-6 bg-fx-white">
          <div className={`w-10 h-10 ${c.accent} border-2 border-fx-black rounded-[4px] mb-4`} />
          <h3 className="font-display text-2xl font-black mb-2">{c.title}</h3>
          <p className="text-gray-600 font-sans text-sm">{c.body}</p>
        </div>
      </div>
    ));
    return (
      <div className="w-full max-w-lg">
        <Carousel items={cardSlides} />
      </div>
    );
  },
};
