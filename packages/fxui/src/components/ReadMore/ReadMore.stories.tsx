import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ReadMore } from './ReadMore';

const meta: Meta<typeof ReadMore> = {
  title: 'Components/Utility/ReadMore',
  component: ReadMore,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ReadMore>;

const longText = 'FXUI is a neo-brutalist React UI library. It leans into the aesthetic hard — thick borders, hard drop shadows, almost no border-radius, and hover states that actually move. Built with Tailwind, Radix UI primitives for accessibility, and CVA for clean variant APIs. Dark mode is handled by ThemeProvider, which also lets you swap out design tokens at runtime.';

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <ReadMore maxChars={150}>{longText}</ReadMore>
    </div>
  ),
};

export const ShortText: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <ReadMore maxChars={500}>
        Short text — no truncation needed.
      </ReadMore>
    </div>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <ReadMore maxChars={100} moreLabel="Continue reading →" lessLabel="← Collapse">
        {longText}
      </ReadMore>
    </div>
  ),
};
