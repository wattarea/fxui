import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';

const meta: Meta<typeof Image> = {
  title: 'Components/Media/Image',
  component: Image,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Image>;

const PIC = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Image src={PIC} alt="Mountain landscape" ratio="video" bordered rounded />
    </div>
  ),
};

export const AllRatios: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
      {(['square', 'video', 'photo', 'wide', 'portrait'] as const).map((r) => (
        <div key={r}>
          <Image src={PIC} alt={r} ratio={r} bordered rounded />
          <p className="text-xs text-center font-mono mt-1 text-gray-400">{r}</p>
        </div>
      ))}
    </div>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <div className="w-72">
      <Image
        src={PIC}
        alt="Mountain landscape"
        ratio="photo"
        bordered
        rounded
        caption="Morning light over the mountain peaks — Photo by someone cool"
      />
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div className="w-72">
      <Image
        src="https://dummyimage.com/very-slow-loading-image.jpg"
        alt="Slow loading image"
        ratio="video"
        bordered
        rounded
      />
    </div>
  ),
};

export const ErrorFallback: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-48">
        <Image src="https://broken-url.example/image.jpg" alt="Broken image" ratio="video" bordered rounded />
        <p className="text-xs text-center font-sans mt-1 text-gray-400">Default fallback</p>
      </div>
      <div className="w-48">
        <Image
          src="https://broken-url.example/image.jpg"
          alt="Custom fallback"
          ratio="video"
          bordered
          rounded
          fallback={<span className="text-3xl">🖼️</span>}
        />
        <p className="text-xs text-center font-sans mt-1 text-gray-400">Custom fallback</p>
      </div>
    </div>
  ),
};

export const ObjectFitVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-sm">
      {(['cover', 'contain', 'fill', 'scale-down'] as const).map((fit) => (
        <div key={fit}>
          <Image src={PIC} alt={fit} ratio="square" objectFit={fit} bordered rounded />
          <p className="text-xs text-center font-mono mt-1 text-gray-400">{fit}</p>
        </div>
      ))}
    </div>
  ),
};
