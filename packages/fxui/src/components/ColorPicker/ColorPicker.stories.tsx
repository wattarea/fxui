import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/FormAdvanced/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <ColorPicker label="Brand Color" defaultValue="#FFE500" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    function Demo() {
      const [color, setColor] = React.useState('#0066FF');
      return (
        <div className="p-6 max-w-xs flex flex-col gap-4">
          <ColorPicker label="Pick a color" value={color} onChange={(hex) => setColor(hex)} />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[4px] border-2 border-fx-black shadow-fx-sm" style={{ backgroundColor: color }} />
            <code className="text-sm font-mono">{color}</code>
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

export const RGBFormat: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <ColorPicker label="Color (RGB)" defaultValue="#FF2D78" format="rgb" />
    </div>
  ),
};

export const NoPresets: Story = {
  render: () => (
    <div className="p-6 max-w-xs">
      <ColorPicker label="Custom Color" defaultValue="#7C3AED" showPresets={false} />
    </div>
  ),
};
