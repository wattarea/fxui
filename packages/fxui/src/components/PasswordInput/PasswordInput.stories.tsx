import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PasswordInput } from './PasswordInput';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Form/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <PasswordInput label="Password" placeholder="Enter your password" />
    </div>
  ),
};

export const WithHint: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <PasswordInput
        label="New Password"
        placeholder="Min 8 characters"
        hint="Must include uppercase, number, and symbol"
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <PasswordInput
        label="Password"
        defaultValue="weak"
        error="Password is too weak. Try adding numbers and symbols."
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [val, setVal] = React.useState('');
      const strength = val.length === 0 ? '' : val.length < 6 ? 'Weak' : val.length < 10 ? 'Fair' : 'Strong';
      const color = strength === 'Strong' ? 'text-fx-green' : strength === 'Fair' ? 'text-fx-yellow' : 'text-fx-pink';
      return (
        <div className="p-6 max-w-sm flex flex-col gap-2">
          <PasswordInput
            label="Password"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Type your password..."
          />
          {strength && <p className={`text-xs font-bold ${color}`}>Strength: {strength}</p>}
        </div>
      );
    }
    return <Demo />;
  },
};
