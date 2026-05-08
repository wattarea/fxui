import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-bold font-sans',
    'rounded-[4px]',
    'border-2',
    'transition-all duration-150',
  ],
  {
    variants: {
      variant: {
        default: 'border-fx-black dark:border-fx-white',
        outline: 'bg-transparent border-current',
        neon: 'border-fx-black shadow-fx-sm',
      },
      color: {
        default: '',
        success: '',
        warning: '',
        error: '',
        info: '',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
      },
    },
    compoundVariants: [
      // default variant × colors
      { variant: 'default', color: 'default', className: 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black' },
      { variant: 'default', color: 'success', className: 'bg-[#00C853] text-white border-fx-black' },
      { variant: 'default', color: 'warning', className: 'bg-[#FFD600] text-fx-black border-fx-black' },
      { variant: 'default', color: 'error', className: 'bg-[#FF1744] text-white border-fx-black' },
      { variant: 'default', color: 'info', className: 'bg-[#0066FF] text-white border-fx-black' },
      // outline variant × colors
      { variant: 'outline', color: 'default', className: 'text-fx-black border-fx-black dark:text-fx-white dark:border-fx-white' },
      { variant: 'outline', color: 'success', className: 'text-[#00C853] border-[#00C853]' },
      { variant: 'outline', color: 'warning', className: 'text-[#B8960A] border-[#FFD600]' },
      { variant: 'outline', color: 'error', className: 'text-[#FF1744] border-[#FF1744]' },
      { variant: 'outline', color: 'info', className: 'text-[#0066FF] border-[#0066FF]' },
      // neon variant × colors
      { variant: 'neon', color: 'default', className: 'bg-fx-yellow text-fx-black' },
      { variant: 'neon', color: 'success', className: 'bg-fx-green text-fx-black' },
      { variant: 'neon', color: 'warning', className: 'bg-[#FFD600] text-fx-black' },
      { variant: 'neon', color: 'error', className: 'bg-fx-pink text-white' },
      { variant: 'neon', color: 'info', className: 'bg-fx-blue text-white' },
    ],
    defaultVariants: {
      variant: 'default',
      color: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, color, size }), className)}
      {...props}
    />
  )
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export default Badge;
