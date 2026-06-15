import type { Meta, StoryObj } from '@storybook/react';
import { BrutalistCard } from './BrutalistCard';

const meta: Meta<typeof BrutalistCard> = {
  title: 'Components/Special/BrutalistCard',
  component: BrutalistCard,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BrutalistCard>;

export const Default: Story = {
  render: () => (
    <div className="p-8">
      <BrutalistCard className="max-w-sm">
        <h3 className="font-display font-black text-xl text-fx-black mb-2">Default Card</h3>
        <p className="font-sans text-sm text-gray-500 leading-relaxed">
          A clean neo-brutalist card with border and shadow. Ready for any content.
        </p>
      </BrutalistCard>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-8">
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((shadow) => (
        <BrutalistCard key={shadow} shadow={shadow} className="w-40">
          <p className="font-mono text-xs text-center font-bold">{shadow}</p>
        </BrutalistCard>
      ))}
    </div>
  ),
};

export const TopAccents: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-6">
      {(['yellow', 'pink', 'green', 'blue', 'purple', 'black'] as const).map((accent) => (
        <BrutalistCard key={accent} accent={accent} className="w-36">
          <p className="font-mono text-xs text-center font-bold">{accent}</p>
        </BrutalistCard>
      ))}
    </div>
  ),
};

export const LeftAccents: Story = {
  render: () => (
    <div className="p-8 flex flex-col gap-4 max-w-sm">
      {(['left_yellow', 'left_pink', 'left_green', 'left_blue'] as const).map((accent) => (
        <BrutalistCard key={accent} accent={accent}>
          <p className="font-sans font-bold text-sm text-fx-black">Left border accent — <code className="font-mono text-xs">{accent}</code></p>
        </BrutalistCard>
      ))}
    </div>
  ),
};

export const FilledVariants: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-6">
      {(['yellow', 'pink', 'green', 'blue', 'black'] as const).map((filled) => (
        <BrutalistCard key={filled} filled={filled} className="w-40">
          <p className="font-display font-black text-sm text-center">{filled.toUpperCase()}</p>
        </BrutalistCard>
      ))}
    </div>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <div className="p-8 flex gap-6 flex-wrap">
      <BrutalistCard hoverable className="w-40">
        <p className="font-bold font-sans text-sm text-center text-fx-black">Hover me</p>
      </BrutalistCard>
      <BrutalistCard hoverable pressable className="w-40">
        <p className="font-bold font-sans text-sm text-center text-fx-black">Hover + Press</p>
      </BrutalistCard>
    </div>
  ),
};

export const WithStamp: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-8">
      <BrutalistCard
        accent="yellow"
        stamp={
          <span className="bg-fx-yellow border-2 border-fx-black font-display font-black text-xs px-2 py-0.5 rounded-[4px] shadow-fx-sm">
            NEW
          </span>
        }
        className="max-w-xs"
      >
        <h4 className="font-display font-black text-lg mb-1">Feature Release</h4>
        <p className="font-sans text-sm text-gray-500">Top-right stamp — perfect for badges and labels.</p>
      </BrutalistCard>

      <BrutalistCard
        accent="pink"
        stampPosition="top-left"
        stamp={
          <span className="bg-fx-pink border-2 border-fx-black font-display font-black text-xs text-white px-2 py-0.5 rounded-[4px] shadow-fx-sm">
            HOT
          </span>
        }
        className="max-w-xs"
      >
        <h4 className="font-display font-black text-lg mb-1">Top Seller</h4>
        <p className="font-sans text-sm text-gray-500">Top-left stamp position variant.</p>
      </BrutalistCard>
    </div>
  ),
};

export const PricingCards: Story = {
  render: () => (
    <div className="p-8 flex flex-wrap gap-6 items-start">
      {[
        {
          name: 'Starter',
          price: 'Free',
          accent: 'none' as const,
          filled: 'none' as const,
          features: ['50 components', 'Storybook', 'MIT license'],
          cta: 'Get started',
        },
        {
          name: 'Pro',
          price: '$49',
          accent: 'yellow' as const,
          filled: 'none' as const,
          stamp: '★ POPULAR',
          features: ['130+ components', 'Pro templates', 'Source code', 'Priority support'],
          cta: 'Buy Pro',
        },
        {
          name: 'Team',
          price: '$149',
          accent: 'none' as const,
          filled: 'black' as const,
          features: ['Everything in Pro', 'Unlimited seats', 'Custom themes', 'SLA'],
          cta: 'Contact us',
        },
      ].map(({ name, price, accent, filled, stamp, features, cta }) => (
        <BrutalistCard
          key={name}
          accent={accent}
          filled={filled}
          shadow="lg"
          className="w-52"
          stamp={stamp ? (
            <span className="bg-fx-yellow border-2 border-fx-black font-display font-black text-[10px] px-2 py-0.5 rounded-[4px] shadow-fx-sm text-fx-black">
              {stamp}
            </span>
          ) : undefined}
        >
          <p className={`font-mono text-xs uppercase tracking-widest mb-1 ${filled === 'black' ? 'text-gray-400' : 'text-gray-400'}`}>{name}</p>
          <p className={`font-display font-black text-4xl mb-4 ${filled === 'black' ? 'text-fx-white' : 'text-fx-black'}`}>{price}</p>
          <ul className="flex flex-col gap-1.5 mb-4">
            {features.map((f) => (
              <li key={f} className={`text-xs font-sans flex items-center gap-1.5 ${filled === 'black' ? 'text-gray-300' : 'text-gray-500'}`}>
                <span className="text-fx-green font-bold">✓</span> {f}
              </li>
            ))}
          </ul>
          <button className={`w-full py-2 border-2 rounded-[4px] font-bold font-sans text-xs shadow-fx-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${filled === 'black' ? 'border-fx-white text-fx-white' : 'border-fx-black text-fx-black'}`}>
            {cta}
          </button>
        </BrutalistCard>
      ))}
    </div>
  ),
};
