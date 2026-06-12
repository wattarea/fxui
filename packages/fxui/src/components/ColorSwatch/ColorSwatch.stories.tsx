import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatch } from './ColorSwatch';

const meta: Meta<typeof ColorSwatch> = {
  title: 'Components/ColorSwatch',
  component: ColorSwatch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['square', 'circle'] },
  },
};
export default meta;
type Story = StoryObj<typeof ColorSwatch>;

export const Default: Story = {
  args: { color: '#FFE500', name: 'FX Yellow' },
  decorators: [(S) => <div className="p-6"><S /></div>],
};

export const FXUIpalette: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6">
      <ColorSwatch color="#0a0a0a" name="FX Black" />
      <ColorSwatch color="#fafafa" name="FX White" />
      <ColorSwatch color="#FFE500" name="FX Yellow" />
      <ColorSwatch color="#FF2D78" name="FX Pink" />
      <ColorSwatch color="#00FF94" name="FX Green" />
      <ColorSwatch color="#0066FF" name="FX Blue" />
      <ColorSwatch color="#7C3AED" name="FX Purple" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-6">
      <ColorSwatch color="#FFE500" name="Yellow" size="sm" />
      <ColorSwatch color="#FF2D78" name="Pink" size="md" />
      <ColorSwatch color="#0066FF" name="Blue" size="lg" />
    </div>
  ),
};

export const CircleShape: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6">
      <ColorSwatch color="#0a0a0a" name="FX Black" shape="circle" size="sm" />
      <ColorSwatch color="#FFE500" name="FX Yellow" shape="circle" size="md" />
      <ColorSwatch color="#FF2D78" name="FX Pink" shape="circle" size="lg" />
    </div>
  ),
};

export const DesignSystem: Story = {
  render: () => (
    <div className="p-6 max-w-xl">
      <h3 className="font-display font-black text-xl mb-4">Brand Colors</h3>
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { color: '#0a0a0a', name: 'Black' },
          { color: '#fafafa', name: 'White' },
          { color: '#FFE500', name: 'Yellow' },
          { color: '#FF2D78', name: 'Pink' },
          { color: '#00FF94', name: 'Green' },
          { color: '#0066FF', name: 'Blue' },
          { color: '#7C3AED', name: 'Purple' },
        ].map((c) => (
          <ColorSwatch key={c.name} color={c.color} name={c.name} size="sm" />
        ))}
      </div>

      <h3 className="font-display font-black text-xl mb-4">Shadows</h3>
      <div className="flex flex-wrap gap-3">
        {[
          { color: 'rgba(10,10,10,0.2)', name: 'shadow-sm' },
          { color: 'rgba(10,10,10,0.4)', name: 'shadow' },
          { color: 'rgba(10,10,10,0.6)', name: 'shadow-lg' },
        ].map((c) => (
          <ColorSwatch key={c.name} color={c.color} name={c.name} size="sm" />
        ))}
      </div>
    </div>
  ),
};
