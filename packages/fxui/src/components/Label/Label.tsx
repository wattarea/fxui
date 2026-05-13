import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const labelVariants = cva('font-sans font-bold inline-flex items-center gap-1 text-fx-black dark:text-fx-white', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  optional?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, required, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ size }), className)}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="text-[#FF1744] leading-none">*</span>
      )}
      {optional && !required && (
        <span className="text-gray-400 font-normal text-xs tracking-wide">(optional)</span>
      )}
    </label>
  )
);

Label.displayName = 'Label';

export { Label, labelVariants };
export default Label;
