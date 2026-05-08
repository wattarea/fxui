import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Core/Chip',
  component: Chip,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: () => (
    <div className="p-6 flex flex-wrap gap-3">
      <Chip>Design</Chip>
      <Chip variant="filled">Development</Chip>
      <Chip variant="yellow">Marketing</Chip>
      <Chip variant="pink">Sales</Chip>
      <Chip variant="green">Support</Chip>
      <Chip variant="blue">Engineering</Chip>
      <Chip variant="purple">Product</Chip>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="p-6 flex flex-wrap gap-3">
      <Chip icon="🎨">Design</Chip>
      <Chip icon="⚡" variant="yellow">Fast</Chip>
      <Chip icon="🔒" variant="filled">Secure</Chip>
      <Chip icon="✅" variant="green">Verified</Chip>
    </div>
  ),
};

export const Closeable: Story = {
  render: () => {
    function Demo() {
      const [chips, setChips] = React.useState(['React', 'TypeScript', 'Tailwind', 'Neo-Brutalism', 'FXUI']);
      return (
        <div className="p-6 flex flex-wrap gap-2">
          {chips.map((c) => (
            <Chip key={c} onClose={() => setChips((prev) => prev.filter((x) => x !== c))}>
              {c}
            </Chip>
          ))}
          {chips.length === 0 && <p className="text-sm text-gray-400 font-sans">All chips removed</p>}
        </div>
      );
    }
    return <Demo />;
  },
};

export const Selectable: Story = {
  render: () => {
    function Demo() {
      const [selected, setSelected] = React.useState<string[]>(['Design']);
      const tags = ['Design', 'Code', 'Marketing', 'Data', 'DevOps'];
      const toggle = (t: string) => setSelected((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
      return (
        <div className="p-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Chip
              key={t}
              onClick={() => toggle(t)}
              selected={selected.includes(t)}
              variant={selected.includes(t) ? 'filled' : 'default'}
              interactive
            >
              {t}
            </Chip>
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 flex flex-wrap items-center gap-3">
      <Chip size="sm" variant="yellow">Small</Chip>
      <Chip size="md" variant="green">Medium</Chip>
      <Chip size="lg" variant="blue">Large</Chip>
    </div>
  ),
};
