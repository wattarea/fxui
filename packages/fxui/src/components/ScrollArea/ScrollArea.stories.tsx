import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Media/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ScrollArea>;

const tags = [
  'React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Neo-Brutalism',
  'Storybook', 'CVA', 'pnpm', 'Turborepo', 'Vite', 'ESBuild', 'tsup',
  'Node.js', 'Next.js', 'Remix', 'Astro', 'SvelteKit', 'Nuxt', 'Vue 3',
  'Solid.js', 'Qwik', 'Angular', 'Ember', 'Backbone', 'jQuery',
];

export const Vertical: Story = {
  render: () => (
    <div className="w-72 h-48 border-2 border-fx-black rounded-[4px] shadow-fx">
      <ScrollArea maxHeight={192}>
        <div className="p-4 space-y-2">
          {tags.map((t) => (
            <div key={t} className="text-sm font-sans py-1 border-b border-gray-100 last:border-0">{t}</div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-72 border-2 border-fx-black rounded-[4px] shadow-fx">
      <ScrollArea orientation="horizontal" maxWidth={288}>
        <div className="flex gap-3 p-3" style={{ width: 'max-content' }}>
          {tags.map((t) => (
            <div key={t} className="px-3 py-1.5 border-2 border-fx-black rounded-[4px] text-xs font-bold font-sans whitespace-nowrap bg-fx-yellow">
              {t}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

export const Both: Story = {
  render: () => (
    <div className="w-72 h-48 border-2 border-fx-black rounded-[4px] shadow-fx">
      <ScrollArea orientation="both" maxHeight={192} maxWidth={288}>
        <div className="p-4" style={{ width: 600 }}>
          <p className="text-sm font-sans leading-relaxed" style={{ whiteSpace: 'nowrap' }}>
            This content is wider and taller than the container, so both scrollbars appear.
            Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor.
          </p>
          <div className="mt-4 space-y-1">
            {tags.map((t) => (
              <div key={t} className="text-sm font-sans py-1">{t}</div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  ),
};

export const AlwaysVisible: Story = {
  render: () => (
    <div className="w-72 h-48 border-2 border-fx-black rounded-[4px] shadow-fx">
      <ScrollArea maxHeight={192} type="always">
        <div className="p-4 space-y-2">
          {tags.map((t) => (
            <div key={t} className="text-sm font-sans py-1 border-b border-gray-100 last:border-0">{t}</div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};
