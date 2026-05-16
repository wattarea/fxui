import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
const countries = [
  { value: 'tr', label: 'Turkey' },
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
];

export const Default: Story = {
  render: () => (
    <div className="w-64 p-6">
      <Select label="Fruit" placeholder="Select a fruit...">
        {fruits.map((f) => (
          <Select.Item key={f} value={f.toLowerCase()}>{f}</Select.Item>
        ))}
      </Select>
    </div>
  ),
};

export const WithHint: Story = {
  render: () => (
    <div className="w-64 p-6">
      <Select label="Country" placeholder="Select country..." hint="Choose your country of residence.">
        {countries.map((c) => (
          <Select.Item key={c.value} value={c.value}>{c.label}</Select.Item>
        ))}
      </Select>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-64 p-6">
      <Select label="Category" placeholder="Select..." error="Please select a category.">
        <Select.Item value="a">Option A</Select.Item>
        <Select.Item value="b">Option B</Select.Item>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div className="w-64 p-6">
      <Select label="Location" placeholder="Select location...">
        <Select.Group label="Europe">
          <Select.Item value="tr">Turkey</Select.Item>
          <Select.Item value="de">Germany</Select.Item>
          <Select.Item value="fr">France</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group label="Asia">
          <Select.Item value="jp">Japan</Select.Item>
          <Select.Item value="cn">China</Select.Item>
        </Select.Group>
      </Select>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 w-64">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Select key={size} placeholder={`Size: ${size}`} size={size}>
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64 p-6">
      <Select label="Disabled" placeholder="Can't touch this" disabled>
        <Select.Item value="a">Option A</Select.Item>
      </Select>
    </div>
  ),
};
