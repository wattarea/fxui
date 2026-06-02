import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Stepper } from './Stepper';
import { Button } from '../Button/Button';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const checkoutSteps = [
  { title: 'Cart', description: 'Review your items' },
  { title: 'Shipping', description: 'Enter your address' },
  { title: 'Payment', description: 'Confirm & pay' },
  { title: 'Confirmation', description: 'Order placed!' },
];

const simpleSteps = [
  { title: 'Account' },
  { title: 'Profile' },
  { title: 'Review' },
];

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-xl">
      <Stepper steps={checkoutSteps} currentStep={1} />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6 max-w-xl">
      {[0, 1, 2, 3].map((step) => (
        <div key={step}>
          <p className="text-xs font-bold tracking-widest text-gray-400 mb-3">currentStep={step}</p>
          <Stepper steps={simpleSteps} currentStep={step} />
        </div>
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <Stepper steps={checkoutSteps} currentStep={2} orientation="vertical" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    function Demo() {
      const [step, setStep] = React.useState(0);
      return (
        <div className="flex flex-col gap-6 p-6 max-w-xl">
          <Stepper steps={checkoutSteps} currentStep={step} />
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              ← Back
            </Button>
            <span className="text-sm font-mono text-gray-500">Step {step + 1} / {checkoutSteps.length}</span>
            <Button onClick={() => setStep(Math.min(checkoutSteps.length - 1, step + 1))} disabled={step === checkoutSteps.length - 1}>
              Next →
            </Button>
          </div>
          <div className="p-4 border-2 border-fx-black rounded-[4px]">
            <p className="font-bold">{checkoutSteps[step].title}</p>
            <p className="text-sm text-gray-500 mt-1">{checkoutSteps[step].description}</p>
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

export const Completed: Story = {
  render: () => (
    <div className="p-6 max-w-xl">
      <Stepper steps={checkoutSteps} currentStep={checkoutSteps.length} />
    </div>
  ),
};
