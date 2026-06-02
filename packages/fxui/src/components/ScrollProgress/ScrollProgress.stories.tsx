import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ScrollProgress } from './ScrollProgress';

const meta: Meta<typeof ScrollProgress> = {
  title: 'Components/Navigation/ScrollProgress',
  component: ScrollProgress,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ScrollProgress>;

function Demo({ color }: { color: 'yellow' | 'pink' | 'green' | 'blue' | 'purple' | 'black' }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="relative border-2 border-fx-black rounded-[4px] overflow-hidden h-48">
      <div ref={containerRef} className="h-full overflow-y-auto" style={{ overflowY: 'scroll' }}>
        <ScrollProgress color={color} position="top" height={4} target={containerRef as React.RefObject<HTMLElement>} zIndex={10} />
        <div className="p-4">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="text-sm font-sans text-gray-400 mb-2">
              Scroll down to see the {color} progress bar at the top... Line {i + 1}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Yellow: Story = { render: () => <div className="p-6 max-w-sm"><Demo color="yellow" /></div> };
export const Blue: Story = { render: () => <div className="p-6 max-w-sm"><Demo color="blue" /></div> };
export const Pink: Story = { render: () => <div className="p-6 max-w-sm"><Demo color="pink" /></div> };
export const Green: Story = { render: () => <div className="p-6 max-w-sm"><Demo color="green" /></div> };
export const AllColors: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-4 max-w-sm">
      {(['yellow', 'pink', 'green', 'blue', 'purple', 'black'] as const).map((c) => (
        <div key={c} className="flex items-center gap-3">
          <span className="w-16 text-xs font-mono text-gray-400">{c}</span>
          <Demo color={c} />
        </div>
      ))}
    </div>
  ),
};
