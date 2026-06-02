import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Pagination>;

function PaginationDemo({ totalPages = 10, siblingCount = 1, showFirstLast = false }) {
  const [page, setPage] = React.useState(1);
  return (
    <div className="flex flex-col gap-3 p-6">
      <p className="text-sm font-mono text-gray-500">Page {page} of {totalPages}</p>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        siblingCount={siblingCount}
        showFirstLast={showFirstLast}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <PaginationDemo totalPages={10} />,
};

export const FewPages: Story = {
  render: () => <PaginationDemo totalPages={5} />,
};

export const ManyPages: Story = {
  render: () => <PaginationDemo totalPages={50} siblingCount={1} />,
};

export const WithFirstLast: Story = {
  render: () => <PaginationDemo totalPages={20} showFirstLast />,
};

export const WideSiblings: Story = {
  render: () => <PaginationDemo totalPages={30} siblingCount={2} />,
};

export const SinglePage: Story = {
  render: () => <PaginationDemo totalPages={1} />,
};
