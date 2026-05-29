import React from 'react';
import { cn } from '../../utils/cn';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center text-center',
        'px-8 py-16 gap-5',
        'border-2 border-dashed border-fx-black dark:border-fx-white rounded-[4px]',
        'bg-fx-white dark:bg-fx-black',
        className
      )}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center',
            'w-16 h-16 text-3xl',
            'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
            'bg-gray-50 dark:bg-gray-900 shadow-fx-sm',
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      <div className="space-y-2 max-w-sm">
        <p className="font-display text-xl font-black text-fx-black dark:text-fx-white">{title}</p>
        {description && (
          <p className="text-sm font-sans text-gray-400 dark:text-gray-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  )
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };
export default EmptyState;
