import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LoadingOverlay } from './LoadingOverlay';

const meta: Meta<typeof LoadingOverlay> = {
  title: 'Components/Feedback/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

export const Default: Story = {
  render: () => (
    <LoadingOverlay>
      <div className="h-48 border-2 border-fx-black rounded-[4px] flex items-center justify-center">
        <p className="font-sans text-gray-400">Content behind overlay</p>
      </div>
    </LoadingOverlay>
  ),
};

export const WithMessage: Story = {
  render: () => (
    <LoadingOverlay message="Saving changes...">
      <div className="h-48 border-2 border-fx-black rounded-[4px] p-6">
        <p className="font-sans text-gray-400">Card content</p>
      </div>
    </LoadingOverlay>
  ),
};

export const YellowVariant: Story = {
  render: () => (
    <LoadingOverlay message="Processing..." color="yellow">
      <div className="h-48 border-2 border-fx-black rounded-[4px] flex items-center justify-center bg-fx-black">
        <p className="font-sans text-fx-white">Dark background</p>
      </div>
    </LoadingOverlay>
  ),
};

export const BlurEffect: Story = {
  render: () => (
    <LoadingOverlay message="Uploading..." blur>
      <div className="h-48 border-2 border-fx-black rounded-[4px] p-6 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </LoadingOverlay>
  ),
};

export const Toggleable: Story = {
  render: () => {
    function Demo() {
      const [loading, setLoading] = React.useState(false);
      return (
        <div className="p-6 flex flex-col gap-4">
          <button
            onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2500); }}
            className="px-4 py-2 text-sm font-bold border-2 border-fx-black rounded-[4px] bg-fx-black text-fx-white shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-fit"
          >
            Start Loading (2.5s)
          </button>
          <LoadingOverlay visible={loading} message="Fetching data...">
            <div className="h-40 border-2 border-fx-black rounded-[4px] p-4 flex items-center justify-center">
              <p className="font-sans text-gray-400">Content area</p>
            </div>
          </LoadingOverlay>
        </div>
      );
    }
    return <Demo />;
  },
};
