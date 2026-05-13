import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const codeVariants = cva(
  [
    'font-mono rounded-[4px] border border-fx-black/20 dark:border-fx-white/20',
    'bg-gray-100 dark:bg-gray-900',
    'text-fx-black dark:text-fx-white',
  ],
  {
    variants: {
      size: {
        sm: 'px-1 py-0.5 text-[11px]',
        md: 'px-1.5 py-0.5 text-[13px]',
        lg: 'px-2 py-1 text-sm',
      },
      variant: {
        default: '',
        highlight: 'bg-fx-yellow/30 border-fx-yellow text-fx-black dark:text-fx-black',
        error: 'bg-[#FF1744]/10 border-[#FF1744]/40 text-[#FF1744]',
        success: 'bg-fx-green/20 border-fx-green/40 text-[#00A854]',
      },
    },
    defaultVariants: { size: 'md', variant: 'default' },
  }
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {
  block?: boolean;
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, size, variant, block = false, children, ...props }, ref) => {
    const classes = cn(codeVariants({ size, variant }), className);

    if (block) {
      return (
        <pre className={cn(classes, 'overflow-x-auto p-4 rounded-[4px] border-2 border-fx-black dark:border-fx-white shadow-fx whitespace-pre-wrap break-all')}>
          <code ref={ref as React.Ref<HTMLElement>} {...props}>{children}</code>
        </pre>
      );
    }

    return (
      <code ref={ref} className={classes} {...props}>
        {children}
      </code>
    );
  }
);

Code.displayName = 'Code';

export { Code, codeVariants };
export default Code;
