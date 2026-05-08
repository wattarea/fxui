import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const kbdVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-mono font-bold',
    'border-2 border-fx-black rounded-[4px]',
    'bg-fx-white text-fx-black',
    'shadow-[0_2px_0_0_#0a0a0a]',
    'select-none',
    'dark:bg-fx-black dark:text-fx-white dark:border-fx-white dark:shadow-[0_2px_0_0_#fafafa]',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 min-w-[20px] px-1 text-[10px]',
        md: 'h-6 min-w-[24px] px-1.5 text-xs',
        lg: 'h-8 min-w-[32px] px-2 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const KbdRoot = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(kbdVariants({ size }), className)}
      {...props}
    >
      {children}
    </kbd>
  )
);
KbdRoot.displayName = 'Kbd';

export interface KbdComboProps extends React.HTMLAttributes<HTMLSpanElement> {
  keys: string[];
  size?: VariantProps<typeof kbdVariants>['size'];
  separator?: React.ReactNode;
}

const KbdCombo = React.forwardRef<HTMLSpanElement, KbdComboProps>(
  ({ keys, size, separator = '+', className, ...props }, ref) => (
    <span ref={ref} className={cn('inline-flex items-center gap-0.5', className)} {...props}>
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className="text-xs text-gray-400 font-sans px-0.5" aria-hidden="true">
              {separator}
            </span>
          )}
          <KbdRoot size={size}>{key}</KbdRoot>
        </React.Fragment>
      ))}
    </span>
  )
);
KbdCombo.displayName = 'Kbd.Combo';

export const Kbd = Object.assign(KbdRoot, { Combo: KbdCombo });
export default Kbd;
