import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Form/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const options = [
  { value: 'react', label: 'React', description: 'A JavaScript library for building UIs' },
  { value: 'vue', label: 'Vue', description: 'The progressive JavaScript framework' },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { value: 'angular', label: 'Angular', description: 'Platform for building web apps' },
];

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <CheckboxGroup
        label="Favorite Frameworks"
        options={options}
        defaultValue={['react']}
      />
    </div>
  ),
};

export const WithSelectAll: Story = {
  render: () => {
    function Demo() {
      const [val, setVal] = React.useState(['react']);
      return (
        <div className="p-6 max-w-sm">
          <CheckboxGroup
            label="Choose Frameworks"
            options={options}
            value={val}
            onChange={setVal}
            selectAll
          />
          <p className="mt-3 text-xs text-gray-400 font-sans">Selected: {val.join(', ') || 'none'}</p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const Horizontal: Story = {
  render: () => (
    <div className="p-6">
      <CheckboxGroup
        label="Notifications"
        options={[
          { value: 'email', label: 'Email' },
          { value: 'sms', label: 'SMS' },
          { value: 'push', label: 'Push' },
          { value: 'slack', label: 'Slack' },
        ]}
        orientation="horizontal"
        defaultValue={['email', 'push']}
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <CheckboxGroup
        label="Required Selection"
        options={options.slice(0, 3)}
        error="Please select at least one option."
      />
    </div>
  ),
};
