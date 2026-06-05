import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SheetDialog } from './SheetDialog';

const meta: Meta<typeof SheetDialog> = {
  title: 'Components/Overlay/SheetDialog',
  component: SheetDialog,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SheetDialog>;

const OpenBtn = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string }>(
  ({ label = 'Open Sheet', ...props }, ref) => (
    <button ref={ref} className="px-4 py-2 text-sm font-bold border-2 border-fx-black rounded-[4px] bg-fx-black text-fx-white shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all" {...props}>
      {label}
    </button>
  )
);

export const RightPanel: Story = {
  render: () => (
    <div className="p-6">
      <SheetDialog
        title="Edit Profile"
        description="Make changes to your account settings here."
        side="right"
        trigger={<OpenBtn label="Open Right Sheet" />}
        footer={
          <>
            <button className="px-4 py-2 text-sm font-bold border-2 border-fx-black rounded-[4px] hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-bold border-2 border-fx-black rounded-[4px] bg-fx-black text-fx-white shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              Save Changes
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold mb-1.5 font-sans">Name</label>
            <input type="text" defaultValue="Alex Johnson" className="w-full px-3 py-2 text-sm border-2 border-fx-black rounded-[4px] focus:outline-none focus:ring-2 focus:ring-fx-black" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5 font-sans">Email</label>
            <input type="email" defaultValue="selman@example.com" className="w-full px-3 py-2 text-sm border-2 border-fx-black rounded-[4px] focus:outline-none focus:ring-2 focus:ring-fx-black" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1.5 font-sans">Bio</label>
            <textarea rows={3} className="w-full px-3 py-2 text-sm border-2 border-fx-black rounded-[4px] focus:outline-none focus:ring-2 focus:ring-fx-black resize-none" defaultValue="Building FXUI, a neo-brutalist React component library." />
          </div>
        </div>
      </SheetDialog>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="p-6 flex flex-wrap gap-3">
      {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
        <SheetDialog
          key={side}
          title={`${side.charAt(0).toUpperCase() + side.slice(1)} Sheet`}
          side={side}
          trigger={<OpenBtn label={`${side} →`} />}
        >
          <p className="font-sans text-sm text-gray-500">Content slides in from the {side}.</p>
        </SheetDialog>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 flex flex-wrap gap-3">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <SheetDialog
          key={size}
          title={`Size: ${size}`}
          side="right"
          size={size}
          trigger={<OpenBtn label={size} />}
        >
          <p className="font-sans text-sm text-gray-500">This sheet uses size="{size}"</p>
        </SheetDialog>
      ))}
    </div>
  ),
};
