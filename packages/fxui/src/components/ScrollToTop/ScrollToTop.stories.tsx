import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ScrollToTop } from './ScrollToTop';

const meta: Meta<typeof ScrollToTop> = {
  title: 'Components/Utility/ScrollToTop',
  component: ScrollToTop,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ScrollToTop>;

// Scrollable container helper for Storybook iframe
function ScrollDemo({ children, content = true }: { children: React.ReactNode; content?: boolean }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative h-80 overflow-y-auto border-2 border-fx-black rounded-[4px]">
      {content && (
        <div className="p-6 flex flex-col gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 dark:bg-gray-800 rounded-[4px] border border-gray-200 dark:border-gray-700 flex items-center px-3">
              <span className="text-xs font-mono text-gray-400">Content block {i + 1}</span>
            </div>
          ))}
        </div>
      )}
      {React.cloneElement(children as React.ReactElement, { scrollTarget: containerRef, threshold: 80 })}
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ScrollDemo>
      <ScrollToTop />
    </ScrollDemo>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['bottom-right', 'bottom-left', 'bottom-center'] as const).map((position) => (
        <div key={position} className="flex flex-col gap-1">
          <span className="text-xs font-mono text-gray-400">{position}</span>
          <ScrollDemo>
            <ScrollToTop position={position} />
          </ScrollDemo>
        </div>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-6">
      {(['circle', 'square'] as const).map((shape) => (
        <div key={shape} className="flex-1 flex flex-col gap-1">
          <span className="text-xs font-mono text-gray-400">{shape}</span>
          <ScrollDemo>
            <ScrollToTop shape={shape} />
          </ScrollDemo>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex-1 flex flex-col gap-1">
          <span className="text-xs font-mono text-gray-400">{size}</span>
          <ScrollDemo>
            <ScrollToTop size={size} />
          </ScrollDemo>
        </div>
      ))}
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <ScrollDemo>
      <ScrollToTop showLabel />
    </ScrollDemo>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <ScrollDemo>
      <ScrollToTop
        label={
          <span className="font-display font-black text-xs">↑ TOP</span>
        }
        shape="square"
        className="!w-auto px-3 gap-1"
      />
    </ScrollDemo>
  ),
};
