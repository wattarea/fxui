import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const alertVariants = cva(
  [
    'relative w-full rounded-[4px] border-2 border-fx-black p-4',
    'font-sans',
    'dark:border-fx-white',
  ],
  {
    variants: {
      variant: {
        default: 'bg-fx-white text-fx-black dark:bg-fx-black dark:text-fx-white shadow-fx',
        info: 'bg-fx-blue text-white border-fx-black shadow-fx',
        success: 'bg-fx-green text-fx-black border-fx-black shadow-fx',
        warning: 'bg-fx-yellow text-fx-black border-fx-black shadow-fx',
        error: 'bg-[#FF1744] text-white border-fx-black shadow-fx',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const icons: Record<string, string> = {
  default: '●',
  info: 'ℹ',
  success: '✓',
  warning: '!',
  error: '✕',
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, onClose, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl font-black shrink-0 mt-0.5" aria-hidden="true">
          {icons[variant ?? 'default']}
        </span>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-bold text-sm mb-1">{title}</p>
          )}
          {children && (
            <div className="text-sm opacity-90">{children}</div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Dismiss alert"
            className="shrink-0 font-bold opacity-60 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
);

Alert.displayName = 'Alert';

export { Alert, alertVariants };
export default Alert;
