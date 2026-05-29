import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const calloutVariants = cva(
  'flex gap-3 p-4 rounded-[4px] border-2 font-sans',
  {
    variants: {
      variant: {
        tip: 'bg-fx-green/10 border-fx-green text-fx-black dark:text-fx-white',
        warning: 'bg-fx-yellow/20 border-fx-yellow text-fx-black',
        danger: 'bg-fx-pink/10 border-fx-pink text-fx-black dark:text-fx-white',
        info: 'bg-fx-blue/10 border-fx-blue text-fx-black dark:text-fx-white',
        note: 'bg-fx-purple/10 border-fx-purple text-fx-black dark:text-fx-white',
      },
    },
    defaultVariants: { variant: 'tip' },
  }
);

const iconMap: Record<string, string> = {
  tip: '💡',
  warning: '⚠️',
  danger: '🚨',
  info: 'ℹ️',
  note: '📝',
};

const titleColorMap: Record<string, string> = {
  tip: 'text-fx-green',
  warning: 'text-fx-black',
  danger: 'text-fx-pink',
  info: 'text-fx-blue',
  note: 'text-fx-purple',
};

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string;
  icon?: React.ReactNode;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant = 'tip', title, icon, children, ...props }, ref) => (
    <div ref={ref} role="note" className={cn(calloutVariants({ variant }), className)} {...props}>
      <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">
        {icon !== undefined ? icon : iconMap[variant!]}
      </span>
      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn('text-sm font-black font-display mb-1', titleColorMap[variant!])}>
            {title}
          </p>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
);

Callout.displayName = 'Callout';
export { Callout, calloutVariants };
export default Callout;
