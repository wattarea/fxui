import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ComboBox } from './ComboBox';

const meta: Meta<typeof ComboBox> = {
  title: 'Components/Form/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ComboBox>;

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'angular', label: 'Angular' },
  { value: 'qwik', label: 'Qwik' },
];

const countries = [
  { value: 'tr', label: 'Turkey', group: 'Asia' },
  { value: 'jp', label: 'Japan', group: 'Asia' },
  { value: 'kr', label: 'South Korea', group: 'Asia' },
  { value: 'de', label: 'Germany', group: 'Europe' },
  { value: 'fr', label: 'France', group: 'Europe' },
  { value: 'gb', label: 'United Kingdom', group: 'Europe' },
  { value: 'us', label: 'United States', group: 'Americas' },
  { value: 'br', label: 'Brazil', group: 'Americas' },
];

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <ComboBox label="Framework" options={frameworks} placeholder="Select framework…" />
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <ComboBox
        label="Country"
        options={countries}
        placeholder="Select country…"
        hint="Options are grouped by region"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [value, setValue] = React.useState<string | null>(null);
      return (
        <div className="p-6 max-w-xs space-y-3">
          <ComboBox
            label="Framework"
            options={frameworks}
            value={value}
            onChange={setValue}
            clearable
            placeholder="Select framework…"
          />
          <p className="text-xs font-mono text-gray-400">Value: {value ?? 'null'}</p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <ComboBox
        label="Framework"
        options={frameworks}
        defaultValue="react"
        clearable
        placeholder="Select framework…"
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <ComboBox
        label="Country"
        options={countries}
        placeholder="Select country…"
        invalid
        error="Please select a country"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <ComboBox
        label="Framework"
        options={frameworks}
        defaultValue="react"
        disabled
        placeholder="Select framework…"
      />
    </div>
  ),
};
