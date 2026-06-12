import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Marquee } from './Marquee';

const meta: Meta<typeof Marquee> = {
  title: 'Components/Utility/Marquee',
  component: Marquee,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Marquee>;

const tags = ['React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Neo-Brutalism', 'FXUI', 'Open Source', 'CVA', 'DX First'];
const colors = ['bg-fx-yellow', 'bg-fx-pink', 'bg-fx-green', 'bg-fx-blue', 'bg-fx-purple'];

export const Default: Story = {
  render: () => (
    <div className="py-6">
      <Marquee speed={30} pauseOnHover gap={16}>
        {tags.map((t, i) => (
          <span key={t} className={`${colors[i % colors.length]} text-fx-black font-bold text-sm px-4 py-2 border-2 border-fx-black rounded-full shadow-fx-sm whitespace-nowrap`}>
            {t}
          </span>
        ))}
      </Marquee>
    </div>
  ),
};

export const Reverse: Story = {
  render: () => (
    <div className="py-6 flex flex-col gap-4">
      <Marquee speed={25} gap={12}>
        {tags.map((t, i) => (
          <span key={t} className={`${colors[i % colors.length]} text-fx-black font-bold text-sm px-4 py-2 border-2 border-fx-black rounded-[4px] shadow-fx-sm whitespace-nowrap`}>
            {t}
          </span>
        ))}
      </Marquee>
      <Marquee speed={25} direction="right" gap={12}>
        {tags.slice().reverse().map((t, i) => (
          <span key={t} className={`${colors[(i + 2) % colors.length]} text-fx-black font-bold text-sm px-4 py-2 border-2 border-fx-black rounded-[4px] shadow-fx-sm whitespace-nowrap`}>
            {t}
          </span>
        ))}
      </Marquee>
    </div>
  ),
};

export const LogoStrip: Story = {
  render: () => (
    <div className="py-6 border-t-2 border-b-2 border-fx-black">
      <Marquee speed={20} gap={48} gradient={false}>
        {['Vercel', 'Supabase', 'GitHub', 'Figma', 'Linear', 'Notion', 'Stripe', 'AWS'].map((logo) => (
          <span key={logo} className="font-display font-black text-xl text-gray-300 whitespace-nowrap">
            {logo}
          </span>
        ))}
      </Marquee>
    </div>
  ),
};
