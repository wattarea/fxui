import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HoverCard } from './HoverCard';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/Overlay/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HoverCard>;

export const UserProfile: Story = {
  render: () => (
    <div className="p-12 flex justify-center">
      <HoverCard
        trigger={
          <button className="flex items-center gap-2 px-3 py-1.5 border-2 border-fx-black rounded-full font-sans text-sm font-bold hover:bg-gray-100 transition-colors">
            <span className="w-7 h-7 rounded-full bg-fx-yellow border-2 border-fx-black flex items-center justify-center text-xs font-black">FX</span>
            @fxui
          </button>
        }
      >
        <div className="p-4 w-64">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-fx-yellow border-2 border-fx-black flex items-center justify-center font-display font-black text-xl">FX</div>
            <div>
              <p className="font-display font-black text-fx-black dark:text-fx-white">FXUI</p>
              <p className="text-xs text-gray-400 font-sans">@fxui</p>
            </div>
          </div>
          <p className="text-sm font-sans text-gray-600 dark:text-gray-300 mb-3">
            Neo-brutalist React component library. Bold borders, hard shadows, deliberate design. Open source.
          </p>
          <div className="flex gap-4 text-xs font-sans text-gray-400">
            <span><strong className="text-fx-black dark:text-fx-white">142</strong> Following</span>
            <span><strong className="text-fx-black dark:text-fx-white">2.1k</strong> Followers</span>
          </div>
        </div>
      </HoverCard>
    </div>
  ),
};

export const ProductPreview: Story = {
  render: () => (
    <div className="p-12 flex justify-center">
      <HoverCard
        trigger={
          <a href="#" onClick={(e) => e.preventDefault()} className="text-fx-blue font-bold font-sans text-sm underline hover:no-underline">
            FXUI Pro Components →
          </a>
        }
        side="right"
      >
        <div className="p-4 w-56">
          <div className="h-24 bg-fx-yellow border-2 border-fx-black rounded-[4px] mb-3 flex items-center justify-center font-display font-black text-2xl">
            PRO
          </div>
          <p className="font-bold font-sans text-sm text-fx-black dark:text-fx-white mb-1">60 Premium Components</p>
          <p className="text-xs font-sans text-gray-400">DataTable, RichTextEditor, Calendar, KanbanBoard, and more.</p>
        </div>
      </HoverCard>
    </div>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="p-16 flex items-center justify-center gap-8 flex-wrap">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <HoverCard
          key={side}
          side={side}
          trigger={
            <button className="px-3 py-1.5 border-2 border-fx-black rounded-[4px] text-sm font-bold hover:bg-gray-100 transition-colors">
              Hover ({side})
            </button>
          }
        >
          <div className="px-3 py-2 text-sm font-sans">Tooltip from {side}</div>
        </HoverCard>
      ))}
    </div>
  ),
};
