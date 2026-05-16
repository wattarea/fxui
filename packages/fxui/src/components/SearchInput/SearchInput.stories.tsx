import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/Form/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <SearchInput placeholder="Search..." />
    </div>
  ),
};

export const WithCallback: Story = {
  render: () => {
    function Demo() {
      const [results, setResults] = React.useState<string[]>([]);
      const items = ['Button', 'Card', 'Input', 'Badge', 'Modal', 'Tooltip', 'Accordion', 'Select', 'Slider'];
      const search = (q: string) => {
        setResults(q ? items.filter((i) => i.toLowerCase().includes(q.toLowerCase())) : []);
      };
      return (
        <div className="p-6 max-w-sm flex flex-col gap-3">
          <SearchInput placeholder="Search components..." onSearch={search} debounceMs={200} />
          {results.length > 0 && (
            <ul className="border-2 border-fx-black rounded-[4px] divide-y-2 divide-fx-black">
              {results.map((r) => (
                <li key={r} className="px-3 py-2 text-sm font-sans">{r}</li>
              ))}
            </ul>
          )}
          {results.length === 0 && <p className="text-xs text-gray-400 font-sans">Type to search</p>}
        </div>
      );
    }
    return <Demo />;
  },
};

export const Loading: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <SearchInput placeholder="Searching..." defaultValue="React" isLoading />
    </div>
  ),
};
