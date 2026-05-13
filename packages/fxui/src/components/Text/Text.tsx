import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const textVariants = cva('font-sans', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      black: 'font-black',
    },
    color: {
      default: 'text-fx-black dark:text-fx-white',
      muted: 'text-gray-500 dark:text-gray-400',
      primary: 'text-fx-blue',
      success: 'text-[#00A854]',
      warning: 'text-[#D97706]',
      error: 'text-[#FF1744]',
      white: 'text-fx-white',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    leading: {
      tight: 'leading-tight',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
    mono: {
      true: 'font-mono',
      false: '',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    color: 'default',
    align: 'left',
    leading: 'normal',
    truncate: false,
    mono: false,
  },
});

type TextTag = 'p' | 'span' | 'div' | 'label' | 'small' | 'strong' | 'em';

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: TextTag;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size, weight, color, align, leading, truncate, mono, as: Tag = 'p', ...props }, ref) => {
    const El = Tag as React.ElementType;
    return (
      <El
        ref={ref}
        className={cn(textVariants({ size, weight, color, align, leading, truncate, mono }), className)}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
export default Text;
