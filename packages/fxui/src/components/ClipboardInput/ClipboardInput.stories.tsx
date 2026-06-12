import type { Meta, StoryObj } from '@storybook/react';
import { ClipboardInput } from './ClipboardInput';

const meta: Meta<typeof ClipboardInput> = {
  title: 'Components/Utility/ClipboardInput',
  component: ClipboardInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ClipboardInput>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <ClipboardInput value="https://fxui.dev/components/button" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <ClipboardInput label="Share link" value="https://fxui.dev/components/button" />
    </div>
  ),
};

export const Masked: Story = {
  render: () => (
    <div className="p-6 max-w-md flex flex-col gap-4">
      <ClipboardInput
        label="API Key"
        value="sk-fxui_live_abc123xyz456def789"
        masked
      />
      <ClipboardInput
        label="Secret Token"
        value="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        masked
      />
    </div>
  ),
};

export const WithPrefix: Story = {
  render: () => (
    <div className="p-6 max-w-md flex flex-col gap-4">
      <ClipboardInput
        label="Install command"
        prefix="$"
        value="pnpm add @fxui/core"
      />
      <ClipboardInput
        label="Import path"
        prefix="→"
        value="import { Button } from '@fxui/core'"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="p-6 max-w-md flex flex-col gap-4">
      <ClipboardInput size="sm" value="small size input" />
      <ClipboardInput size="md" value="medium size input (default)" />
      <ClipboardInput size="lg" value="large size input" />
    </div>
  ),
};

export const InstallCommands: Story = {
  render: () => (
    <div className="p-6 max-w-lg flex flex-col gap-3">
      <h3 className="font-display font-black text-lg text-fx-black">Installation</h3>
      {[
        { prefix: 'npm',  value: 'npm install @fxui/core' },
        { prefix: 'pnpm', value: 'pnpm add @fxui/core' },
        { prefix: 'yarn', value: 'yarn add @fxui/core' },
        { prefix: 'bun',  value: 'bun add @fxui/core' },
      ].map(({ prefix, value }) => (
        <ClipboardInput key={prefix} prefix={prefix} value={value} />
      ))}
    </div>
  ),
};

export const APIKeysPanel: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <div className="border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
        <div className="px-5 py-3 border-b-2 border-fx-black bg-fx-black">
          <span className="text-xs font-black uppercase tracking-widest font-sans text-fx-white">API Keys</span>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <ClipboardInput
            label="Publishable key"
            prefix="pk_"
            value="live_xxxxxxxxxxxxxxxxxxxxxxxx"
          />
          <ClipboardInput
            label="Secret key"
            prefix="sk_"
            value="live_yyyyyyyyyyyyyyyyyyyyyyyy"
            masked
          />
          <ClipboardInput
            label="Webhook secret"
            prefix="whsec_"
            value="zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
            masked
          />
        </div>
      </div>
    </div>
  ),
};
