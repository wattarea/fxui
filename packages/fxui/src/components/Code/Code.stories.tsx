import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
  title: 'Components/Code',
  component: Code,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'highlight', 'error', 'success'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof Code>;

export const Inline: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <p className="font-sans text-sm leading-relaxed">
        Import the component using <Code>import {'{ Button }'} from 'fxui-core'</Code> and
        apply the <Code>variant="neon"</Code> prop for the yellow variant.
        The <Code>className</Code> prop overrides are always supported.
      </p>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Code variant="default">default</Code>
      <Code variant="highlight">highlight</Code>
      <Code variant="error">error</Code>
      <Code variant="success">success</Code>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-6">
      <Code size="sm">small</Code>
      <Code size="md">medium</Code>
      <Code size="lg">large</Code>
    </div>
  ),
};

export const Block: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <Code block>
{`import React from 'react';
import { Button } from 'fxui-core';

export function App() {
  return (
    <Button variant="neon" size="lg">
      Click me
    </Button>
  );
}`}
      </Code>
    </div>
  ),
};

export const InProse: Story = {
  render: () => (
    <div className="p-6 max-w-md space-y-4 font-sans text-sm">
      <p>
        To install, run <Code>pnpm add fxui-core</Code>.
        Then wrap your app with <Code>ToastProvider</Code>.
      </p>
      <p>
        If you see a <Code variant="error">Cannot find module 'fxui-core'</Code> error,
        make sure you've run <Code variant="highlight">pnpm install</Code> first.
      </p>
    </div>
  ),
};
