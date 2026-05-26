import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta = {
  title: 'Components/Skeleton',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

// ─── Primitives ──────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div className="p-6 w-80">
      <Skeleton className="h-40 w-full" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-6">
      <Skeleton shape="circle" className="h-16 w-16" />
      <Skeleton shape="rect" className="h-16 w-32" />
      <div className="flex flex-col gap-2 w-40">
        <Skeleton shape="text" />
        <Skeleton shape="text" className="w-3/4" />
      </div>
    </div>
  ),
};

// ─── Animations ──────────────────────────────────────────────────────────────

export const Animations: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6 max-w-sm">
      {(['shimmer', 'pulse', 'wave', 'none'] as const).map((anim) => (
        <div key={anim} className="flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-widest font-sans text-gray-400">{anim}</span>
          <Skeleton animation={anim} className="h-12 w-full" />
        </div>
      ))}
    </div>
  ),
};

// ─── Sub-components ──────────────────────────────────────────────────────────

export const TextLines: Story = {
  render: () => (
    <div className="p-6 w-80 flex flex-col gap-6">
      <Skeleton.Text lines={2} />
      <Skeleton.Text lines={4} lastLineWidth="50%" />
      <Skeleton.Text lines={3} animation="pulse" lastLineWidth="70%" />
    </div>
  ),
};

export const AvatarVariants: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6 max-w-xs">
      <Skeleton.Avatar size="sm" lines={1} />
      <Skeleton.Avatar size="md" lines={2} />
      <Skeleton.Avatar size="lg" lines={2} />
      <Skeleton.Avatar size="md" lines={2} animation="pulse" />
    </div>
  ),
};

export const Buttons: Story = {
  render: () => (
    <div className="p-6 flex items-center gap-4">
      <Skeleton.Button size="sm" />
      <Skeleton.Button size="md" />
      <Skeleton.Button size="lg" />
    </div>
  ),
};

export const Images: Story = {
  render: () => (
    <div className="p-6 grid grid-cols-3 gap-3 max-w-lg">
      <Skeleton.Image aspectRatio="1/1" />
      <Skeleton.Image aspectRatio="4/3" />
      <Skeleton.Image aspectRatio="16/9" className="col-span-1" />
      <Skeleton.Image aspectRatio="2/3" />
      <Skeleton.Image aspectRatio="3/2" />
    </div>
  ),
};

// ─── Composite patterns ──────────────────────────────────────────────────────

export const CardSkeleton: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <div className="border-2 border-fx-black rounded-[4px] overflow-hidden">
        <Skeleton.Image aspectRatio="16/9" className="rounded-none border-0 border-b-2 border-fx-black" />
        <div className="p-4 flex flex-col gap-3">
          <Skeleton.Text lines={1} />
          <Skeleton.Text lines={3} lastLineWidth="70%" />
          <div className="flex gap-3 pt-1">
            <Skeleton.Button size="md" />
            <Skeleton.Button size="sm" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ArticleSkeleton: Story = {
  render: () => (
    <div className="p-6 max-w-xl">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-[4px]" />
          <Skeleton className="h-5 w-20 rounded-[4px]" />
        </div>
        <Skeleton className="h-10 w-full rounded-[4px]" />
        <Skeleton className="h-6 w-3/4 rounded-[4px]" />
        <Skeleton.Avatar size="sm" lines={1} />
        <Skeleton.Image aspectRatio="16/9" />
        <Skeleton.Text lines={5} lastLineWidth="80%" />
        <Skeleton.Text lines={4} lastLineWidth="55%" />
      </div>
    </div>
  ),
};

export const DashboardSkeleton: Story = {
  render: () => (
    <div className="p-6 max-w-2xl flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border-2 border-fx-black rounded-[4px] p-4 flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 border-2 border-fx-black rounded-[4px] p-4 flex flex-col gap-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="border-2 border-fx-black rounded-[4px] p-4 flex flex-col gap-3">
          <Skeleton className="h-4 w-20" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton.Avatar key={i} size="sm" lines={1} />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="p-6 max-w-2xl">
      <div className="border-2 border-fx-black rounded-[4px] overflow-hidden">
        <div className="grid grid-cols-4 gap-4 px-4 py-3 border-b-2 border-fx-black bg-gray-50 dark:bg-gray-900">
          {['Name', 'Status', 'Role', 'Action'].map((h) => (
            <Skeleton key={h} className="h-3 w-16" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="grid grid-cols-4 gap-4 items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <Skeleton.Avatar size="sm" lines={1} />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-3 w-20" />
            <Skeleton.Button size="sm" />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FeedSkeleton: Story = {
  render: () => (
    <div className="p-6 max-w-md flex flex-col gap-5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border-2 border-fx-black rounded-[4px] p-4 flex flex-col gap-3">
          <Skeleton.Avatar size="md" lines={1} />
          <Skeleton.Text lines={3} lastLineWidth="65%" />
          <Skeleton.Image aspectRatio="4/3" />
          <div className="flex gap-4">
            <Skeleton className="h-7 w-14" />
            <Skeleton className="h-7 w-14" />
            <Skeleton className="h-7 w-14" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ProductGridSkeleton: Story = {
  render: () => (
    <div className="p-6 max-w-2xl">
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border-2 border-fx-black rounded-[4px] overflow-hidden flex flex-col">
            <Skeleton.Image aspectRatio="1/1" className="rounded-none border-0 border-b-2 border-fx-black" />
            <div className="p-3 flex flex-col gap-2">
              <Skeleton.Text lines={1} />
              <Skeleton className="h-5 w-16" />
              <Skeleton.Button size="sm" className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <div className="border-2 border-fx-black rounded-[4px] overflow-hidden">
        <Skeleton className="h-28 w-full rounded-none border-0 border-b-2 border-fx-black" />
        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <Skeleton shape="circle" className="h-16 w-16 border-4 border-fx-white dark:border-fx-black" />
            <Skeleton.Button size="sm" />
          </div>
          <Skeleton className="h-5 w-36 mb-1" />
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton.Text lines={2} lastLineWidth="80%" className="mb-4" />
          <div className="flex gap-6">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex flex-col gap-1">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
