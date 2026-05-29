import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

const Btn = ({ children }: { children: React.ReactNode }) => (
  <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-fx-black bg-fx-black text-fx-white font-bold text-sm rounded-[4px] shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 font-sans">
    {children}
  </button>
);

export const Default: Story = {
  args: {
    icon: '📭',
    title: 'No messages yet',
    description: "You haven't received any messages. When you do, they'll appear here.",
  },
  decorators: [(S) => <div className="p-6 max-w-md"><S /></div>],
};

export const WithAction: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <EmptyState
        icon="📁"
        title="No files found"
        description="Upload your first file to get started. Supported formats: PNG, JPG, PDF."
        action={<Btn>+ Upload file</Btn>}
      />
    </div>
  ),
};

export const SearchResult: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <EmptyState
        icon="🔍"
        title='No results for "brutalism"'
        description="Try adjusting your search terms or filters."
        action={<Btn>Clear filters</Btn>}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <EmptyState
        icon="⚠️"
        title="Something went wrong"
        description="We couldn't load this content. Please try again."
        action={<Btn>Retry</Btn>}
      />
    </div>
  ),
};

export const NoIcon: Story = {
  render: () => (
    <div className="p-6 max-w-md">
      <EmptyState
        title="Your cart is empty"
        description="Add items to your cart and they'll show up here."
        action={<Btn>Browse products</Btn>}
      />
    </div>
  ),
};
