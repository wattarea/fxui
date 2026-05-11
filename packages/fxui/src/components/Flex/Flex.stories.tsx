import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
  title: 'Components/Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['row', 'col', 'row-reverse', 'col-reverse'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
    wrap: { control: 'select', options: ['wrap', 'nowrap', 'wrap-reverse'] },
    gap: { control: 'select', options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'] },
  },
};
export default meta;
type Story = StoryObj<typeof Flex>;

const Box = ({ label, wide }: { label: string; wide?: boolean }) => (
  <div className={`bg-fx-yellow border-2 border-fx-black p-3 font-bold font-sans text-sm rounded-[4px] text-center ${wide ? 'min-w-[120px]' : ''}`}>
    {label}
  </div>
);

export const Default: Story = {
  args: { direction: 'row', align: 'center', gap: '4' },
  render: (args) => (
    <div className="p-6">
      <Flex {...args}>
        <Box label="Alpha" /><Box label="Beta" /><Box label="Gamma" />
      </Flex>
    </div>
  ),
};

export const Wrapping: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <Flex wrap="wrap" gap="2">
        {['React', 'TypeScript', 'Tailwind', 'Radix', 'FXUI', 'Storybook', 'Turborepo', 'pnpm'].map((t) => (
          <div key={t} className="px-3 py-1 border-2 border-fx-black rounded-[4px] text-sm font-bold font-sans">
            {t}
          </div>
        ))}
      </Flex>
    </div>
  ),
};

export const AlignVariants: Story = {
  render: () => (
    <div className="p-6 space-y-4 max-w-lg">
      {(['start', 'center', 'end'] as const).map((align) => (
        <div key={align}>
          <p className="font-mono text-xs mb-1">align="{align}"</p>
          <Flex direction="row" align={align} gap="3" className="h-16 border border-dashed border-gray-300 p-2">
            <div className="bg-fx-yellow border-2 border-fx-black p-2 font-bold text-xs rounded-[4px]">A</div>
            <div className="bg-fx-pink text-white border-2 border-fx-black p-2 font-bold text-xs rounded-[4px] h-10">B taller</div>
            <div className="bg-fx-green border-2 border-fx-black p-2 font-bold text-xs rounded-[4px]">C</div>
          </Flex>
        </div>
      ))}
    </div>
  ),
};

export const Column: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <Flex direction="col" gap="3">
        <Box label="Top" /><Box label="Middle" /><Box label="Bottom" />
      </Flex>
    </div>
  ),
};
