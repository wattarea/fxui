import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const notificationVariants = cva(
  [
    'relative flex gap-3 p-4 rounded-[4px]',
    'border-2 border-fx-black dark:border-fx-white',
    'bg-fx-white dark:bg-fx-black font-sans',
    'shadow-fx',
  ],
  {
    variants: {
      variant: {
        default: '',
        success: 'border-l-4 border-l-fx-green',
        warning: 'border-l-4 border-l-fx-yellow',
        error: 'border-l-4 border-l-fx-pink',
        info: 'border-l-4 border-l-fx-blue',
      },
      read: {
        true: 'opacity-70',
        false: '',
      },
    },
    defaultVariants: { variant: 'default', read: false },
  }
);

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  timestamp?: string;
  actions?: NotificationAction[];
  closeable?: boolean;
  onClose?: () => void;
  unread?: boolean;
}

const defaultIcons: Record<string, React.ReactNode> = {
  success: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FF94" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>,
  warning: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFE500" strokeWidth="2.5" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  error: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF2D78" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  info: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      className,
      variant,
      read,
      icon,
      title,
      description,
      timestamp,
      actions,
      closeable = false,
      onClose,
      unread = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(notificationVariants({ variant, read }), className)}
      {...props}
    >
      {/* Unread dot */}
      {unread && (
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-fx-blue border border-fx-black" aria-label="Unread" />
      )}

      {/* Icon */}
      <div className="shrink-0 mt-0.5">
        {icon ?? (variant && variant !== 'default' ? defaultIcons[variant] : null)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-fx-black dark:text-fx-white">{title}</p>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{description}</p>
        )}
        {timestamp && (
          <p className="text-xs text-gray-400 mt-1">{timestamp}</p>
        )}
        {actions && actions.length > 0 && (
          <div className="flex gap-2 mt-2">
            {actions.map((a, i) => (
              <button
                key={i}
                type="button"
                onClick={a.onClick}
                className={cn(
                  'text-xs font-bold px-2 py-1 rounded-[4px]',
                  'border border-fx-black dark:border-fx-white',
                  i === 0
                    ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black'
                    : 'bg-transparent text-fx-black dark:text-fx-white',
                  'hover:opacity-80 transition-opacity',
                )}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Close */}
      {closeable && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 p-1 rounded-[4px] text-gray-400 hover:text-fx-black dark:hover:text-fx-white transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
);

Notification.displayName = 'Notification';
export { Notification, notificationVariants };
export default Notification;
