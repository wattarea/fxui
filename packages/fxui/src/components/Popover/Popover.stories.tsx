import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';

const meta: Meta = {
  title: 'Components/Popover',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Popover>
        <Popover.Trigger><Button>Open Popover</Button></Popover.Trigger>
        <Popover.Content>
          <p className="font-bold text-sm mb-1">Popover title</p>
          <p className="text-sm text-gray-500">Add any content here — forms, info, actions.</p>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-16 place-items-center">
      {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
        <Popover key={side}>
          <Popover.Trigger><Button variant="outline">{side}</Button></Popover.Trigger>
          <Popover.Content side={side}>
            <p className="text-sm font-medium">Opens to the {side}</p>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Popover>
        <Popover.Trigger><Button variant="neon">With Arrow</Button></Popover.Trigger>
        <Popover.Content showArrow>
          <p className="text-sm">This popover has an arrow pointing to the trigger.</p>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Popover>
        <Popover.Trigger><Button>Edit dimensions</Button></Popover.Trigger>
        <Popover.Content className="w-64">
          <p className="font-bold text-sm mb-3">Dimensions</p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold">Width</label>
              <input defaultValue="320" className="border-2 border-fx-black rounded-[4px] px-2 py-1 text-sm font-mono focus:outline-none focus:shadow-fx-sm w-full" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold">Height</label>
              <input defaultValue="240" className="border-2 border-fx-black rounded-[4px] px-2 py-1 text-sm font-mono focus:outline-none focus:shadow-fx-sm w-full" />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Popover.Close asChild>
              <Button size="sm">Apply</Button>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  ),
};
