import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { OTPInput } from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Components/Misc/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [v, setV] = React.useState('');
      return (
        <div className="p-6 space-y-3">
          <OTPInput value={v} onChange={setV} label="Verification code" autoFocus />
          <p className="text-sm font-sans text-gray-500">Value: <code className="font-mono">{v || '—'}</code></p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const OnComplete: Story = {
  render: () => {
    function Demo() {
      const [status, setStatus] = React.useState('Waiting…');
      return (
        <div className="p-6 space-y-3">
          <OTPInput
            label="Enter OTP"
            onComplete={(v) => setStatus(`✅ Complete: ${v}`)}
            onChange={() => setStatus('Typing…')}
          />
          <p className="text-sm font-sans font-bold">{status}</p>
        </div>
      );
    }
    return <Demo />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <OTPInput key={s} length={4} size={s} label={s} groupSize={0} />
      ))}
    </div>
  ),
};

export const Alphanumeric: Story = {
  render: () => (
    <div className="p-6">
      <OTPInput type="alphanumeric" length={8} groupSize={4} label="License key" />
    </div>
  ),
};

export const NoSeparator: Story = {
  render: () => (
    <div className="p-6">
      <OTPInput length={4} groupSize={0} label="PIN" />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="p-6">
      <OTPInput
        value="12345 "
        label="Verification code"
        error="Invalid code. Please try again."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="p-6">
      <OTPInput value="123456" disabled label="Disabled" />
    </div>
  ),
};
