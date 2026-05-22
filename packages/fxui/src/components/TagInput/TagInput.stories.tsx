import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TagInput } from './TagInput';

const meta: Meta<typeof TagInput> = {
  title: 'Components/Form/TagInput',
  component: TagInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <TagInput label="Skills" placeholder="Add skill…" hint="Press Enter or comma to add" />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <TagInput
        label="Technologies"
        defaultValue={['React', 'TypeScript', 'Tailwind']}
        placeholder="Add more…"
        hint="Press Enter or comma to add"
      />
    </div>
  ),
};

export const MaxTags: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <TagInput
        label="Labels (max 3)"
        defaultValue={['bug', 'urgent']}
        max={3}
        placeholder="Add label…"
      />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <TagInput
        label="Email recipients"
        placeholder="Enter email…"
        hint="Only valid emails are accepted"
        validate={(tag) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag)}
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [tags, setTags] = React.useState(['design', 'code']);
      return (
        <div className="p-6 max-w-sm space-y-3">
          <TagInput
            label="Tags"
            value={tags}
            onChange={setTags}
            placeholder="Add tag…"
          />
          <p className="text-xs font-mono text-gray-400">
            Value: [{tags.map(t => `"${t}"`).join(', ')}]
          </p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithError: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <TagInput
        label="Required tags"
        error="At least one tag is required"
        invalid
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <TagInput
        label="Read-only tags"
        defaultValue={['locked', 'immutable']}
        disabled
      />
    </div>
  ),
};
