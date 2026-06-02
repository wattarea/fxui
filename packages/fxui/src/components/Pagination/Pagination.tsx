import React from 'react';
import { cn } from '../../utils/cn';

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
}

function getPageRange(page: number, totalPages: number, siblingCount: number): (number | '...')[] {
  const totalSlots = siblingCount * 2 + 5;
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + 2 * siblingCount;
    return [...Array.from({ length: leftCount }, (_, i) => i + 1), '...', totalPages];
  }
  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + 2 * siblingCount;
    return [1, '...', ...Array.from({ length: rightCount }, (_, i) => totalPages - rightCount + i + 1)];
  }
  return [1, '...', ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i), '...', totalPages];
}

const btnBase = cn(
  'inline-flex items-center justify-center h-9 min-w-[36px] px-2',
  'font-bold font-sans text-sm rounded-[4px]',
  'border-2 border-fx-black',
  'transition-all duration-150',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black focus-visible:ring-offset-2',
  'disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none',
  'dark:border-fx-white dark:text-fx-white',
);

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ page, totalPages, onPageChange, siblingCount = 1, showFirstLast = false, className, ...props }, ref) => {
    const pages = getPageRange(page, totalPages, siblingCount);

    return (
      <nav ref={ref} aria-label="Pagination" className={cn('flex items-center gap-1.5 flex-wrap', className)} {...props}>
        {showFirstLast && (
          <button
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            aria-label="First page"
            className={cn(btnBase, 'bg-fx-white text-fx-black hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] dark:bg-fx-black')}
          >
            «
          </button>
        )}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className={cn(btnBase, 'bg-fx-white text-fx-black hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] dark:bg-fx-black')}
        >
          ←
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-1 text-gray-400 font-bold select-none">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={cn(
                btnBase,
                p === page
                  ? 'bg-fx-black text-fx-white shadow-fx-sm translate-x-[2px] translate-y-[2px] dark:bg-fx-white dark:text-fx-black'
                  : 'bg-fx-white text-fx-black hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] dark:bg-fx-black'
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className={cn(btnBase, 'bg-fx-white text-fx-black hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] dark:bg-fx-black')}
        >
          →
        </button>
        {showFirstLast && (
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
            aria-label="Last page"
            className={cn(btnBase, 'bg-fx-white text-fx-black hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px] dark:bg-fx-black')}
          >
            »
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

export { Pagination };
export default Pagination;
