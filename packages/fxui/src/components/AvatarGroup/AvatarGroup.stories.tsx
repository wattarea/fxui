import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from './AvatarGroup';
import type { AvatarItem } from './AvatarGroup';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/Data Display/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AvatarGroup>;

const team: AvatarItem[] = [
  { name: 'Alice Kim',    color: 'yellow' },
  { name: 'Bob Chen',    color: 'pink' },
  { name: 'Cara Davis',  color: 'green' },
  { name: 'Dan Park',    color: 'blue' },
  { name: 'Eva Moore',   color: 'purple' },
  { name: 'Frank Lee',   color: 'black' },
  { name: 'Grace Wu',    color: 'yellow' },
  { name: 'Hank Scott',  color: 'pink' },
];

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <AvatarGroup avatars={team.slice(0, 5)} />
    </div>
  ),
};

export const WithOverflow: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6">
      <AvatarGroup avatars={team} max={4} />
      <AvatarGroup avatars={team} max={3} />
      <AvatarGroup avatars={team} max={2} />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-8 text-xs font-mono text-gray-400">{size}</span>
          <AvatarGroup avatars={team.slice(0, 5)} size={size} />
        </div>
      ))}
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="p-6">
      <AvatarGroup avatars={team} />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6">
      {(['tight', 'normal', 'loose'] as const).map((spacing) => (
        <div key={spacing} className="flex items-center gap-4">
          <span className="w-16 text-xs font-mono text-gray-400">{spacing}</span>
          <AvatarGroup avatars={team.slice(0, 5)} spacing={spacing} />
        </div>
      ))}
    </div>
  ),
};

export const SquareShape: Story = {
  render: () => (
    <div className="p-6">
      <AvatarGroup avatars={team.slice(0, 5)} shape="square" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <div className="border-2 border-fx-black rounded-[4px] p-4 shadow-fx">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display font-black text-fx-black">Design Sprint</span>
          <span className="text-xs font-sans px-2 py-1 bg-fx-yellow border border-fx-black rounded-[4px] font-bold">Active</span>
        </div>
        <p className="text-sm font-sans text-gray-500 mb-4">Redesigning the onboarding flow for Q3 launch.</p>
        <div className="flex items-center justify-between">
          <AvatarGroup avatars={team} max={4} size="sm" />
          <span className="text-xs font-sans text-gray-400">{team.length} members</span>
        </div>
      </div>

      <div className="border-2 border-fx-black rounded-[4px] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display font-black text-fx-black">Engineering</span>
          <span className="text-xs font-sans px-2 py-1 bg-fx-green border border-fx-black rounded-[4px] font-bold">Done</span>
        </div>
        <p className="text-sm font-sans text-gray-500 mb-4">Backend API migration to v2.</p>
        <div className="flex items-center justify-between">
          <AvatarGroup avatars={team.slice(0, 3)} size="sm" />
          <span className="text-xs font-sans text-gray-400">3 members</span>
        </div>
      </div>
    </div>
  ),
};
