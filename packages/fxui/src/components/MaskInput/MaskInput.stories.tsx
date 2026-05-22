import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MaskInput } from './MaskInput';

const meta: Meta<typeof MaskInput> = {
  title: 'Components/FormAdvanced/MaskInput',
  component: MaskInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MaskInput>;

export const CreditCard: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <MaskInput label="Card Number" preset="credit-card" />
    </div>
  ),
};

export const PhoneUS: Story = {
  render: () => (
    <div className="p-6 max-w-sm">
      <MaskInput label="Phone" preset="phone-us" />
    </div>
  ),
};

export const Date: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <MaskInput label="Date of Birth" preset="date" />
    </div>
  ),
};

export const CustomMask: Story = {
  render: () => (
    <div className="p-6 max-w-sm flex flex-col gap-4">
      <MaskInput label="Time (HH:MM)" preset="time" />
      <MaskInput label="ZIP Code" preset="zip" />
      <MaskInput label="SSN" preset="ssn" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [raw, setRaw] = React.useState('');
      const [fmt, setFmt] = React.useState('');
      return (
        <div className="p-6 max-w-sm flex flex-col gap-3">
          <MaskInput
            label="Credit Card"
            preset="credit-card"
            onChange={(r, f) => { setRaw(r); setFmt(f); }}
          />
          <p className="text-xs font-mono text-gray-400">raw: "{raw}"</p>
          <p className="text-xs font-mono text-gray-400">formatted: "{fmt}"</p>
        </div>
      );
    }
    return <Demo />;
  },
};
