import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Components/Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    color: { control: 'select', options: ['default', 'muted', 'yellow', 'pink', 'green', 'blue', 'purple'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
  },
};
export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: { children: 'The quick brown fox', size: 'h2' },
  decorators: [(S) => <div className="p-6"><S /></div>],
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-6 space-y-4 max-w-2xl">
      <Heading size="display">Display</Heading>
      <Heading size="h1">Heading 1</Heading>
      <Heading size="h2">Heading 2</Heading>
      <Heading size="h3">Heading 3</Heading>
      <Heading size="h4">Heading 4</Heading>
      <Heading size="h5">Heading 5</Heading>
      <Heading size="h6">Heading 6</Heading>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="p-6 space-y-3 max-w-xl">
      <Heading size="h3" color="default">Default</Heading>
      <Heading size="h3" color="muted">Muted</Heading>
      <Heading size="h3" color="yellow">Yellow</Heading>
      <Heading size="h3" color="pink">Pink</Heading>
      <Heading size="h3" color="green">Green</Heading>
      <Heading size="h3" color="blue">Blue</Heading>
      <Heading size="h3" color="purple">Purple</Heading>
    </div>
  ),
};

export const Highlighted: Story = {
  render: () => (
    <div className="p-6 max-w-xl">
      <Heading size="h1" highlight>
        Brutal by design.
      </Heading>
    </div>
  ),
};

export const HeroSection: Story = {
  render: () => (
    <div className="p-8 max-w-2xl space-y-4">
      <Heading size="display" align="center">FXUI</Heading>
      <Heading size="h3" color="muted" align="center" as="p">
        Neo-brutalist React component library
      </Heading>
    </div>
  ),
};

export const ArticleHeader: Story = {
  render: () => (
    <div className="p-6 max-w-xl space-y-2">
      <Heading size="h1">Building a Design System from Scratch</Heading>
      <Heading size="h4" color="muted" as="p">
        A practical guide to structuring tokens, components, and documentation.
      </Heading>
    </div>
  ),
};
