import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const captionVariants = cva('text-xs font-sans leading-normal', {
  variants: {
    variant: {
      default: 'text-gray-500 dark:text-gray-400',
      muted: 'text-gray-300 dark:text-gray-600',
      error: 'text-[#FF1744] font-bold',
      success: 'text-[#00A854] font-bold',
      warning: 'text-[#D97706] font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: { variant: 'default', align: 'left' },
});

export interface CaptionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof captionVariants> {
  as?: 'p' | 'span' | 'figcaption' | 'small';
  icon?: React.ReactNode;
}

const Caption = React.forwardRef<HTMLElement, CaptionProps>(
  ({ className, variant, align, as: Tag = 'p', icon, children, ...props }, ref) => {
    const El = Tag as React.ElementType;
    return (
      <El
        ref={ref}
        className={cn(captionVariants({ variant, align }), icon && 'inline-flex items-center gap-1', className)}
        {...props}
      >
        {icon && <span aria-hidden="true" className="shrink-0">{icon}</span>}
        {children}
      </El>
    );
  }
);

Caption.displayName = 'Caption';

export { Caption, captionVariants };
export default Caption;
