import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'Components/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'] },
  },
};
export default meta;
type Story = StoryObj<typeof Container>;

const Box = ({ label }: { label: string }) => (
  <div className="bg-fx-yellow border-2 border-fx-black p-3 font-bold font-sans text-sm text-center rounded-[4px]">
    {label}
  </div>
);

export const Default: Story = {
  args: { size: 'xl' },
  render: (args) => (
    <div className="bg-gray-100 py-6">
      <Container {...args}>
        <Box label={`Container size="${args.size}"`} />
      </Container>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="bg-gray-100 py-4 space-y-3">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Container key={size} size={size}>
          <Box label={`size="${size}"`} />
        </Container>
      ))}
    </div>
  ),
};

export const Boxed: Story = {
  render: () => (
    <div className="bg-gray-100 py-6">
      <Container size="md" boxed className="p-8">
        <p className="font-sans font-bold text-center">Boxed container with border & shadow</p>
      </Container>
    </div>
  ),
};

export const NestingExample: Story = {
  render: () => (
    <div className="bg-gray-100 py-6">
      <Container size="xl">
        <div className="space-y-4">
          <Box label="Full width section header" />
          <Container size="md">
            <Box label="Narrower content area (md)" />
          </Container>
        </div>
      </Container>
    </div>
  ),
};
