import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated', 'neon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>Card Title</Card.Header>
      <Card.Body>
        <p>This is the card body content. It can contain any elements.</p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">Action</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
      </Card.Footer>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-6">
      {(['default', 'bordered', 'elevated', 'neon'] as const).map((variant) => (
        <Card key={variant} variant={variant} className="w-64">
          <Card.Header>{variant}</Card.Header>
          <Card.Body>
            <p className="text-sm">Card with {variant} variant</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    className: 'w-80',
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>Interactive Card</Card.Header>
      <Card.Body>
        <p>Change variant in the controls panel below.</p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">Confirm</Button>
      </Card.Footer>
    </Card>
  ),
};
