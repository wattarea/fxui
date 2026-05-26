import React from 'react';
import { cn } from '../../utils/cn';

export interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
}

const dotVariants: Record<NonNullable<TimelineItem['variant']>, string> = {
  default: 'bg-fx-black border-fx-black dark:bg-fx-white dark:border-fx-white',
  success: 'bg-fx-green border-fx-black',
  warning: 'bg-fx-yellow border-fx-black',
  error: 'bg-[#FF1744] border-fx-black',
  info: 'bg-fx-blue border-fx-black',
};

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ items, className, ...props }, ref) => (
    <ol ref={ref} className={cn('relative flex flex-col gap-0 font-sans', className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const variant = item.variant ?? 'default';

        return (
          <li key={index} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Line */}
            {!isLast && (
              <div
                aria-hidden="true"
                className="absolute left-[14px] top-8 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700"
              />
            )}

            {/* Dot / Icon */}
            <div className="relative z-10 flex shrink-0 items-start pt-0.5">
              {item.icon ? (
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-[4px]',
                    'border-2 text-sm',
                    dotVariants[variant],
                  )}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              ) : (
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full',
                    'border-2 shadow-fx-sm',
                    dotVariants[variant],
                  )}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <p className="font-bold text-sm text-fx-black dark:text-fx-white">{item.title}</p>
                {item.date && (
                  <time className="text-xs text-gray-400 dark:text-gray-500 font-mono shrink-0">
                    {item.date}
                  </time>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  )
);

Timeline.displayName = 'Timeline';

export { Timeline };
export default Timeline;
