import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HighlightText } from './HighlightText';

const meta: Meta<typeof HighlightText> = {
  title: 'Components/Utility/HighlightText',
  component: HighlightText,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HighlightText>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-lg font-sans text-base">
      <HighlightText
        text="FXUI is a Neo-brutalist React component library with TypeScript and Tailwind CSS support."
        highlight="component"
      />
    </div>
  ),
};

export const MultipleTerms: Story = {
  render: () => (
    <div className="p-6 max-w-lg font-sans text-base">
      <HighlightText
        text="FXUI is a Neo-brutalist React component library with TypeScript and Tailwind CSS support."
        highlight={['React', 'TypeScript', 'Tailwind']}
      />
    </div>
  ),
};

export const SearchResult: Story = {
  render: () => {
    function Demo() {
      const [query, setQuery] = React.useState('component');
      const texts = [
        'Button component with neo-brutalist shadow effect',
        'Card component using compound pattern with slots',
        'DataTable component with sorting and filtering',
        'ColorPicker component with native browser support',
      ];
      return (
        <div className="p-6 flex flex-col gap-4 max-w-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="px-3 py-2 text-sm border-2 border-fx-black rounded-[4px] focus:outline-none focus:ring-2 focus:ring-fx-black font-sans"
          />
          <ul className="flex flex-col gap-2">
            {texts.map((t, i) => (
              <li key={i} className="p-3 border-2 border-fx-black rounded-[4px] font-sans text-sm">
                <HighlightText text={t} highlight={query} />
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <Demo />;
  },
};

export const CustomHighlightStyle: Story = {
  render: () => (
    <div className="p-6 max-w-lg font-sans text-base">
      <HighlightText
        text="The quick brown fox jumps over the lazy dog"
        highlight={['fox', 'dog']}
        highlightClassName="bg-fx-pink text-white px-1 rounded-[4px] font-bold"
      />
    </div>
  ),
};
