import type { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Components/Media/VideoPlayer',
  component: VideoPlayer,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof VideoPlayer>;

// Big Buck Bunny — free test video
const SRC = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const POSTER = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/320px-Camponotus_flavomarginatus_ant.jpg';

export const Default: Story = {
  render: () => (
    <div className="max-w-lg">
      <VideoPlayer src={SRC} />
    </div>
  ),
};

export const WithPoster: Story = {
  render: () => (
    <div className="max-w-lg">
      <VideoPlayer src={SRC} poster={POSTER} />
    </div>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <div className="max-w-lg">
      <VideoPlayer
        src={SRC}
        caption="Big Buck Bunny — Blender Foundation open source short film"
      />
    </div>
  ),
};

export const MutedAutoPlay: Story = {
  render: () => (
    <div className="max-w-lg">
      <VideoPlayer src={SRC} autoPlay muted loop caption="Muted autoplay with loop" />
    </div>
  ),
};
