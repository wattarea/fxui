import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const headingVariants = cva('text-fx-black dark:text-fx-white leading-tight', {
  variants: {
    size: {
      display: 'font-display text-7xl md:text-8xl font-black tracking-tighter',
      h1: 'font-display text-5xl md:text-6xl font-black tracking-tight',
      h2: 'font-display text-4xl md:text-5xl font-black tracking-tight',
      h3: 'font-sans text-3xl md:text-4xl font-black',
      h4: 'font-sans text-2xl md:text-3xl font-bold',
      h5: 'font-sans text-xl md:text-2xl font-bold',
      h6: 'font-sans text-lg md:text-xl font-bold',
    },
    color: {
      default: 'text-fx-black dark:text-fx-white',
      muted: 'text-gray-500 dark:text-gray-400',
      yellow: 'text-fx-yellow',
      pink: 'text-fx-pink',
      green: 'text-fx-green',
      blue: 'text-fx-blue',
      purple: 'text-fx-purple',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
  },
  defaultVariants: { size: 'h2', color: 'default', align: 'left', truncate: false },
});

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span';

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  as?: HeadingTag;
  highlight?: boolean;
}

const tagForSize: Record<NonNullable<VariantProps<typeof headingVariants>['size']>, HeadingTag> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size = 'h2', color, align, truncate, as, highlight = false, children, ...props }, ref) => {
    const Tag = (as ?? tagForSize[size ?? 'h2']) as React.ElementType;

    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ size, color, align, truncate }), className)}
        {...props}
      >
        {highlight ? (
          <span className="relative inline-block">
            <span className="relative z-10">{children}</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-1 h-3 bg-fx-yellow -z-0 -mx-1"
            />
          </span>
        ) : children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
export default Heading;
