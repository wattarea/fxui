import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: { control: 'select', options: ['square', 'video', 'photo', 'wide', 'portrait', 'golden', 1, 4/3, 16/9] },
  },
};
export default meta;
type Story = StoryObj<typeof AspectRatio>;

const Placeholder = ({ label }: { label: string }) => (
  <div className="w-full h-full bg-fx-yellow border-2 border-fx-black flex items-center justify-center font-bold font-sans text-sm">
    {label}
  </div>
);

export const Default: Story = {
  args: { ratio: 'video' },
  render: (args) => (
    <div className="p-6 max-w-sm">
      <AspectRatio {...args}>
        <Placeholder label={`ratio="${args.ratio}"`} />
      </AspectRatio>
    </div>
  ),
};

export const AllPresets: Story = {
  render: () => (
    <div className="p-6 grid grid-cols-3 gap-4">
      {(['square', 'video', 'photo', 'wide', 'portrait', 'golden'] as const).map((ratio) => (
        <div key={ratio}>
          <AspectRatio ratio={ratio}>
            <div className="w-full h-full bg-fx-yellow border-2 border-fx-black flex items-center justify-center font-bold font-mono text-xs">
              {ratio}
            </div>
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <AspectRatio ratio="video" className="rounded-[4px] overflow-hidden border-2 border-fx-black shadow-fx">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format"
          alt="Abstract"
          className="w-full h-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

export const CustomRatio: Story = {
  render: () => (
    <div className="p-6 space-y-4 max-w-sm">
      {([1, 4/3, 16/9, 3/1] as number[]).map((r) => (
        <div key={r}>
          <p className="font-mono text-xs mb-1">ratio={r.toFixed(3)}</p>
          <AspectRatio ratio={r}>
            <div className="w-full h-full bg-fx-pink border-2 border-fx-black flex items-center justify-center font-bold font-mono text-xs text-white">
              {r.toFixed(2)}:1
            </div>
          </AspectRatio>
        </div>
      ))}
    </div>
  ),
};

export const VideoEmbed: Story = {
  render: () => (
    <div className="p-6 max-w-xl">
      <AspectRatio ratio="video" className="border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </AspectRatio>
    </div>
  ),
};
