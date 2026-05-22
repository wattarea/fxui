import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PhoneInput } from './PhoneInput';

const meta: Meta<typeof PhoneInput> = {
  title: 'Components/FormAdvanced/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <PhoneInput label="Phone Number" />
    </div>
  ),
};

export const DefaultUS: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <PhoneInput label="Mobile" defaultCountry="US" hint="Enter your US phone number" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [val, setVal] = React.useState('');
      return (
        <div className="p-6 max-w-sm flex flex-col gap-3">
          <PhoneInput
            label="Contact Number"
            value={val}
            onChange={(full, dial, num) => setVal(num)}
          />
          <p className="text-xs font-mono text-gray-400">number: "{val}"</p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithError: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <PhoneInput label="Phone" defaultValue="123" error="Please enter a valid phone number" />
    </div>
  ),
};
