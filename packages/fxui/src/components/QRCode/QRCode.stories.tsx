import type { Meta, StoryObj } from '@storybook/react';
import { QRCode } from './QRCode';

const meta: Meta<typeof QRCode> = {
  title: 'Components/Utility/QRCode',
  component: QRCode,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof QRCode>;

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <QRCode value="https://fxui.dev" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="p-6">
      <QRCode value="https://fxui.dev" label="fxui.dev" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 flex items-end gap-6 flex-wrap">
      {[100, 150, 200, 250].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <QRCode value="https://fxui.dev" size={size} />
          <span className="text-xs font-mono text-gray-400">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const ErrorLevels: Story = {
  render: () => (
    <div className="p-6 flex gap-6 flex-wrap">
      {(['L', 'M', 'Q', 'H'] as const).map((level) => (
        <div key={level} className="flex flex-col items-center gap-2">
          <QRCode value="https://fxui.dev" errorLevel={level} size={150} />
          <span className="text-xs font-mono text-gray-400">Level {level}</span>
        </div>
      ))}
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="p-6 flex gap-6 flex-wrap">
      <div className="flex flex-col items-center gap-2">
        <QRCode value="https://fxui.dev" foreground="#0a0a0a" background="#FFE500" label="Yellow" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <QRCode value="https://fxui.dev" foreground="#fafafa" background="#0a0a0a" label="Inverted" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <QRCode value="https://fxui.dev" foreground="#FF2D78" background="#fafafa" label="Pink" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <QRCode value="https://fxui.dev" foreground="#0066FF" background="#fafafa" label="Blue" />
      </div>
    </div>
  ),
};

export const NoBorder: Story = {
  render: () => (
    <div className="p-6">
      <QRCode value="https://fxui.dev" bordered={false} />
    </div>
  ),
};

export const ContactCard: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <div className="border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
        <div className="bg-fx-black p-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-fx-yellow border-2 border-fx-yellow flex items-center justify-center font-display font-black text-xl text-fx-black">
            FX
          </div>
          <div>
            <p className="font-display font-black text-fx-white">FXUI</p>
            <p className="text-xs font-sans text-gray-400">Component Library</p>
          </div>
        </div>
        <div className="p-4 flex flex-col items-center gap-3">
          <QRCode value="https://fxui.dev" size={160} label="Scan to visit fxui.dev" />
          <p className="text-xs font-sans text-gray-400 text-center">
            Scan with your phone camera to open
          </p>
        </div>
      </div>
    </div>
  ),
};

export const DynamicValue: Story = {
  render: () => {
    const values = [
      'https://fxui.dev',
      'https://github.com/fxui',
      'mailto:hello@fxui.dev',
      'BEGIN:VCARD\nFN:FXUI\nURL:https://fxui.dev\nEND:VCARD',
    ];
    let i = 0;
    return (
      <div className="p-6 flex flex-col items-center gap-4">
        <QRCode value={values[i % values.length]} label="Dynamic QR" />
        <p className="text-xs font-sans text-gray-400">Change value prop to update QR code</p>
      </div>
    );
  },
};
