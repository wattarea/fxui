import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AutoComplete } from './AutoComplete';
import type { AutoCompleteOption } from './AutoComplete';

const meta: Meta<typeof AutoComplete> = {
  title: 'Components/Form/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AutoComplete>;

const fruits: AutoCompleteOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
  { value: 'orange', label: 'Orange' },
  { value: 'peach', label: 'Peach' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'watermelon', label: 'Watermelon' },
];

const frameworks: AutoCompleteOption[] = [
  { value: 'next', label: 'Next.js', description: 'React framework for production' },
  { value: 'nuxt', label: 'Nuxt', description: 'Vue framework for production' },
  { value: 'remix', label: 'Remix', description: 'Full stack web framework' },
  { value: 'astro', label: 'Astro', description: 'Build faster websites' },
  { value: 'svelte', label: 'SvelteKit', description: 'Cybernetically enhanced web apps' },
  { value: 'solid', label: 'SolidStart', description: 'Solid.js meta-framework' },
];

export const Default: Story = {
  render: () => {
    function Demo() {
      const [options, setOptions] = React.useState<AutoCompleteOption[]>([]);
      const [selected, setSelected] = React.useState('');

      const handleSearch = (q: string) => {
        if (!q) { setOptions([]); return; }
        setOptions(fruits.filter((f) => f.label.toLowerCase().includes(q.toLowerCase())));
      };

      return (
        <div className="p-6 max-w-sm">
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            onSelect={(o) => setSelected(o.label)}
            placeholder="Search fruits…"
          />
          {selected && (
            <p className="mt-3 text-sm font-sans text-gray-500">
              Selected: <strong className="text-fx-black">{selected}</strong>
            </p>
          )}
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithDescriptions: Story = {
  render: () => {
    function Demo() {
      const [options, setOptions] = React.useState<AutoCompleteOption[]>([]);

      const handleSearch = (q: string) => {
        if (!q) { setOptions([]); return; }
        setOptions(frameworks.filter((f) => f.label.toLowerCase().includes(q.toLowerCase())));
      };

      return (
        <div className="p-6 max-w-sm">
          <AutoComplete
            options={options}
            onSearch={handleSearch}
            placeholder="Search frameworks…"
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const AsyncSimulated: Story = {
  render: () => {
    function Demo() {
      const [options, setOptions] = React.useState<AutoCompleteOption[]>([]);
      const [loading, setLoading] = React.useState(false);

      const handleSearch = (q: string) => {
        if (!q) { setOptions([]); setLoading(false); return; }
        setLoading(true);
        setOptions([]);
        setTimeout(() => {
          setOptions(fruits.filter((f) => f.label.toLowerCase().includes(q.toLowerCase())));
          setLoading(false);
        }, 600);
      };

      return (
        <div className="p-6 max-w-sm">
          <p className="text-xs font-sans text-gray-400 mb-3">Simulates 600ms network delay</p>
          <AutoComplete
            options={options}
            loading={loading}
            onSearch={handleSearch}
            placeholder="Type to search…"
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const LoadingState: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <AutoComplete
        options={[]}
        loading
        placeholder="Always loading…"
        onSearch={() => {}}
        defaultValue="react"
      />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => {
    function Demo() {
      const [options, setOptions] = React.useState<AutoCompleteOption[]>([]);
      return (
        <div className="p-6 max-w-sm">
          <AutoComplete
            options={options}
            onSearch={(q) => {
              if (q) setOptions([]);
            }}
            emptyText="No matching results found."
            placeholder="Type anything…"
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const ErrorState: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <AutoComplete
        options={[]}
        onSearch={() => {}}
        error
        placeholder="Invalid input…"
      />
    </div>
  ),
};

export const AllCountries: Story = {
  render: () => {
    const countries: AutoCompleteOption[] = [
      { value: 'us', label: 'United States', description: '+1' },
      { value: 'tr', label: 'Turkey', description: '+90' },
      { value: 'gb', label: 'United Kingdom', description: '+44' },
      { value: 'de', label: 'Germany', description: '+49' },
      { value: 'fr', label: 'France', description: '+33' },
      { value: 'jp', label: 'Japan', description: '+81' },
      { value: 'au', label: 'Australia', description: '+61' },
      { value: 'ca', label: 'Canada', description: '+1' },
      { value: 'br', label: 'Brazil', description: '+55' },
      { value: 'in', label: 'India', description: '+91' },
    ];

    function Demo() {
      const [options, setOptions] = React.useState<AutoCompleteOption[]>([]);

      return (
        <div className="p-6 max-w-sm">
          <AutoComplete
            options={options}
            onSearch={(q) => {
              if (!q) { setOptions([]); return; }
              setOptions(countries.filter((c) =>
                c.label.toLowerCase().includes(q.toLowerCase())
              ));
            }}
            placeholder="Search country…"
          />
        </div>
      );
    }
    return <Demo />;
  },
};
