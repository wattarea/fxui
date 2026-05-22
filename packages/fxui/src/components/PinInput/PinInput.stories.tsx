import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PinInput } from './PinInput';

const meta: Meta<typeof PinInput> = {
  title: 'Components/FormAdvanced/PinInput',
  component: PinInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PinInput>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <PinInput label="Enter PIN" length={4} />
    </div>
  ),
};

export const Masked: Story = {
  render: () => (
    <div className="p-6">
      <PinInput label="Secure PIN" length={4} masked hint="Your PIN is hidden as you type" />
    </div>
  ),
};

export const SixDigit: Story = {
  render: () => (
    <div className="p-6">
      <PinInput label="Verification Code" length={6} hint="Check your email for the 6-digit code" />
    </div>
  ),
};

export const WithCompletion: Story = {
  render: () => {
    function Demo() {
      const [status, setStatus] = React.useState('');
      return (
        <div className="p-6 flex flex-col gap-3">
          <PinInput
            label="Enter Code"
            length={6}
            onComplete={(v) => setStatus(`Submitted: ${v}`)}
            onChange={(v, complete) => !complete && setStatus('')}
          />
          {status && <p className="text-sm font-bold text-fx-green font-sans">{status}</p>}
        </div>
      );
    }
    return <Demo />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6">
      <PinInput label="Small (sm)" length={4} size="sm" />
      <PinInput label="Medium (md)" length={4} size="md" />
      <PinInput label="Large (lg)" length={4} size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-6">
      <PinInput label="Default" length={4} variant="default" defaultValue="12" />
      <PinInput label="Filled" length={4} variant="filled" defaultValue="12" />
      <PinInput label="Flushed" length={4} variant="flushed" defaultValue="12" />
    </div>
  ),
};
