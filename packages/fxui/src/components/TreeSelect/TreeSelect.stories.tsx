import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TreeSelect } from './TreeSelect';

const meta: Meta<typeof TreeSelect> = {
  title: 'Components/FormAdvanced/TreeSelect',
  component: TreeSelect,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TreeSelect>;

const options = [
  {
    value: 'frontend',
    label: 'Frontend',
    children: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  {
    value: 'backend',
    label: 'Backend',
    children: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      {
        value: 'java',
        label: 'Java',
        children: [
          { value: 'spring', label: 'Spring Boot' },
          { value: 'quarkus', label: 'Quarkus' },
        ],
      },
    ],
  },
  { value: 'devops', label: 'DevOps' },
];

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <TreeSelect label="Select Team" options={options} placeholder="Choose a team..." />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [val, setVal] = React.useState('');
      return (
        <div className="p-6 max-w-xs flex flex-col gap-3">
          <TreeSelect
            label="Stack"
            options={options}
            value={val}
            onChange={(v) => setVal(v)}
          />
          <p className="text-xs font-sans text-gray-400">Selected: {val || 'none'}</p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithError: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <TreeSelect options={options} label="Required Field" error="Please select an option." />
    </div>
  ),
};
