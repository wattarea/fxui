import type { Meta, StoryObj } from '@storybook/react';
import { Blockquote } from './Blockquote';

const meta: Meta<typeof Blockquote> = {
  title: 'Components/Typography/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'yellow', 'pink', 'green', 'blue', 'purple'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {
  args: {
    children: 'Design is not just what it looks like and feels like. Design is how it works.',
    author: 'Steve Jobs',
  },
  decorators: [(S) => <div className="p-6 max-w-md"><S /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div className="p-6 max-w-md space-y-4">
      {(['default', 'yellow', 'pink', 'green', 'blue', 'purple'] as const).map((variant) => (
        <Blockquote key={variant} variant={variant}>
          This is a {variant} blockquote with a thick left border accent.
        </Blockquote>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-6 max-w-md space-y-6">
      <Blockquote size="sm" author="Anonymous">Small: Less is more.</Blockquote>
      <Blockquote size="md" author="Anonymous">Medium: Simplicity is the ultimate sophistication.</Blockquote>
      <Blockquote size="lg" author="Anonymous">Large: Good design is obvious. Great design is transparent.</Blockquote>
    </div>
  ),
};

export const WithAuthorAndCite: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <Blockquote
        variant="blue"
        size="lg"
        author="Donald Knuth"
        cite="https://www.azquotes.com/quote/627745"
      >
        Programs are meant to be read by humans and only incidentally for computers to execute.
      </Blockquote>
    </div>
  ),
};

export const InArticle: Story = {
  render: () => (
    <div className="p-6 max-w-prose space-y-4 font-sans text-base leading-relaxed">
      <p>Neo-brutalism in UI design emerged as a reaction to the polished, minimalist aesthetic that dominated the 2010s.</p>
      <Blockquote variant="yellow" size="lg">
        Brutal interfaces are honest interfaces — they don't pretend to be something they're not.
      </Blockquote>
      <p>This philosophy manifests in thick borders, raw shadows, and high-contrast color palettes that refuse to fade into the background.</p>
    </div>
  ),
};
