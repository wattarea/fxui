import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const items = [
  { value: 'item-1', trigger: 'What is FXUI?', content: 'FXUI is a Neo-brutalist React UI component library built with TypeScript, Tailwind CSS, and Radix UI primitives.' },
  { value: 'item-2', trigger: 'Is it accessible?', content: 'Yes. All components are built on Radix UI primitives which provide full keyboard navigation and ARIA compliance.' },
  { value: 'item-3', trigger: 'Can I customize the styles?', content: 'Absolutely. Pass any Tailwind class via className. The brutalist aesthetic is a starting point, not a constraint.' },
];

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Accordion type="single" collapsible>
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Trigger>{item.trigger}</Accordion.Trigger>
            <Accordion.Content>{item.content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};

export const Separated: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Accordion type="single" collapsible variant="separated">
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value} variant="separated">
            <Accordion.Trigger>{item.trigger}</Accordion.Trigger>
            <Accordion.Content>{item.content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Accordion type="multiple">
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Trigger>{item.trigger}</Accordion.Trigger>
            <Accordion.Content>{item.content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Accordion type="single" defaultValue="item-1" collapsible>
        {items.map((item) => (
          <Accordion.Item key={item.value} value={item.value}>
            <Accordion.Trigger>{item.trigger}</Accordion.Trigger>
            <Accordion.Content>{item.content}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  ),
};
