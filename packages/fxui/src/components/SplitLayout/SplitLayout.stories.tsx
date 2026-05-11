import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SplitLayout } from './SplitLayout';

const meta: Meta<typeof SplitLayout> = {
  title: 'Components/Layout/SplitLayout',
  component: SplitLayout,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SplitLayout>;

const Panel = ({ label, color }: { label: string; color: string }) => (
  <div className={`h-full min-h-[200px] flex items-center justify-center font-display font-black text-2xl ${color}`}>
    {label}
  </div>
);

export const Horizontal: Story = {
  render: () => (
    <div className="border-2 border-fx-black rounded-[4px] overflow-hidden" style={{ height: 300 }}>
      <SplitLayout direction="horizontal" defaultSplit={40}>
        <Panel label="Left Panel" color="bg-fx-yellow" />
        <Panel label="Right Panel" color="bg-fx-green" />
      </SplitLayout>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="border-2 border-fx-black rounded-[4px] overflow-hidden" style={{ height: 400 }}>
      <SplitLayout direction="vertical" defaultSplit={40}>
        <Panel label="Top Panel" color="bg-fx-pink" />
        <Panel label="Bottom Panel" color="bg-fx-blue" />
      </SplitLayout>
    </div>
  ),
};

export const CodeEditor: Story = {
  render: () => (
    <div className="border-2 border-fx-black rounded-[4px] overflow-hidden" style={{ height: 400 }}>
      <SplitLayout direction="horizontal" defaultSplit={50} minSize={20} maxSize={80}>
        <div className="h-full bg-gray-900 p-4 font-mono text-sm text-fx-green">
          <pre>{`function hello() {
  console.log('FXUI');
  return <Button
    variant="yellow"
    size="lg"
  >
    Click me
  </Button>;
}`}</pre>
        </div>
        <div className="h-full bg-fx-white p-6 flex flex-col gap-3">
          <h3 className="font-display font-black text-xl">Preview</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="px-6 py-3 bg-fx-yellow border-2 border-fx-black shadow-fx font-bold text-lg rounded-[4px]">
              Click me
            </div>
          </div>
        </div>
      </SplitLayout>
    </div>
  ),
};
