import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delayDuration: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-16 place-items-center">
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip key={placement} content={`Placement: ${placement}`} placement={placement}>
          <Button variant="outline">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip
        content={
          <span>
            <strong>FXUI</strong> — Neo-brutalist UI
          </span>
        }
      >
        <Button variant="neon">Rich tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const NoDelay: Story = {
  render: () => (
    <div className="flex items-center justify-center p-16">
      <Tooltip content="Instant!" delayDuration={0}>
        <Button variant="ghost">No delay</Button>
      </Tooltip>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    content: 'Tooltip content',
    placement: 'top',
    delayDuration: 300,
    children: <Button>Hover me</Button>,
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <Story />
      </div>
    ),
  ],
};
