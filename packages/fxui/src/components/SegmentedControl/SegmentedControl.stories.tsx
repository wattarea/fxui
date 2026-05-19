import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/Form/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [view, setView] = React.useState('grid');
      return (
        <div className="p-6 flex flex-col gap-4">
          <SegmentedControl
            options={[
              { value: 'grid', label: 'Grid' },
              { value: 'list', label: 'List' },
              { value: 'table', label: 'Table' },
            ]}
            value={view}
            onChange={setView}
          />
          <p className="text-sm font-sans text-gray-400">View: {view}</p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="p-6">
      <SegmentedControl
        options={[
          { value: 'day', label: 'Day', icon: '☀' },
          { value: 'week', label: 'Week', icon: '📅' },
          { value: 'month', label: 'Month', icon: '📆' },
          { value: 'year', label: 'Year', icon: '🗓' },
        ]}
        defaultValue="week"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-4">
      <SegmentedControl
        size="sm"
        options={[{ value: 'a', label: 'Small' }, { value: 'b', label: 'Control' }, { value: 'c', label: 'Size' }]}
        defaultValue="a"
      />
      <SegmentedControl
        size="md"
        options={[{ value: 'a', label: 'Medium' }, { value: 'b', label: 'Control' }, { value: 'c', label: 'Size' }]}
        defaultValue="b"
      />
      <SegmentedControl
        size="lg"
        options={[{ value: 'a', label: 'Large' }, { value: 'b', label: 'Control' }, { value: 'c', label: 'Size' }]}
        defaultValue="c"
      />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <SegmentedControl
        fullWidth
        options={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'annually', label: 'Annually' },
        ]}
        defaultValue="monthly"
      />
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <div className="p-6">
      <SegmentedControl
        options={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise', disabled: true },
        ]}
        defaultValue="pro"
      />
    </div>
  ),
};
