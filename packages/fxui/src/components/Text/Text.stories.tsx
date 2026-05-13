import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Typography/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'base', 'lg', 'xl'] },
    weight: { control: 'select', options: ['normal', 'medium', 'semibold', 'bold', 'black'] },
    color: { control: 'select', options: ['default', 'muted', 'primary', 'success', 'warning', 'error'] },
    align: { control: 'select', options: ['left', 'center', 'right', 'justify'] },
    leading: { control: 'select', options: ['tight', 'normal', 'relaxed', 'loose'] },
  },
};
export default meta;
type Story = StoryObj<typeof Text>;

const sample = 'FXUI is a neo-brutalist React component library built with TypeScript, Tailwind CSS, and Radix UI primitives.';

export const Default: Story = {
  args: { children: sample },
  decorators: [(S) => <div className="p-6 max-w-lg"><S /></div>],
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-6 max-w-lg space-y-3">
      {(['xs', 'sm', 'base', 'lg', 'xl'] as const).map((size) => (
        <Text key={size} size={size}><strong className="font-black">{size}:</strong> {sample}</Text>
      ))}
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="p-6 max-w-sm space-y-2">
      <Text color="default">Default text</Text>
      <Text color="muted">Muted text</Text>
      <Text color="primary">Primary (blue)</Text>
      <Text color="success">Success (green)</Text>
      <Text color="warning">Warning (amber)</Text>
      <Text color="error">Error (red)</Text>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="p-6 max-w-sm space-y-2">
      {(['normal', 'medium', 'semibold', 'bold', 'black'] as const).map((weight) => (
        <Text key={weight} weight={weight}>{weight}: The quick brown fox</Text>
      ))}
    </div>
  ),
};

export const Monospace: Story = {
  render: () => (
    <div className="p-6 max-w-sm space-y-2">
      <Text mono>const answer = 42;</Text>
      <Text mono color="muted" size="sm">// This is a comment</Text>
      <Text mono color="success" size="sm">✓ Build succeeded in 1.2s</Text>
    </div>
  ),
};

export const Leading: Story = {
  render: () => (
    <div className="p-6 max-w-md space-y-6">
      {(['tight', 'normal', 'relaxed', 'loose'] as const).map((leading) => (
        <div key={leading}>
          <Text size="xs" color="muted" weight="bold" className="mb-1 uppercase tracking-widest">{leading}</Text>
          <Text leading={leading}>{sample}</Text>
        </div>
      ))}
    </div>
  ),
};

export const AsSpan: Story = {
  render: () => (
    <div className="p-6">
      <Text>
        Normal paragraph with{' '}
        <Text as="span" weight="bold">bold text</Text>,{' '}
        <Text as="span" color="primary">blue link text</Text>, and{' '}
        <Text as="span" mono size="sm">inline code</Text>.
      </Text>
    </div>
  ),
};
