import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const pullQuoteVariants = cva(
  [
    'relative font-sans',
    'border-l-4 pl-6 py-2',
  ],
  {
    variants: {
      accent: {
        yellow: 'border-fx-yellow',
        pink: 'border-fx-pink',
        green: 'border-fx-green',
        blue: 'border-fx-blue',
        purple: 'border-fx-purple',
        black: 'border-fx-black dark:border-fx-white',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: { accent: 'yellow', size: 'md' },
  }
);

const quoteTextVariants = cva('font-display font-black leading-tight text-fx-black dark:text-fx-white', {
  variants: {
    size: {
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-4xl',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface PullQuoteProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pullQuoteVariants> {
  author?: string;
  source?: string;
}

const PullQuote = React.forwardRef<HTMLElement, PullQuoteProps>(
  ({ className, accent, size, author, source, children, ...props }, ref) => (
    <figure
      ref={ref as React.Ref<HTMLElement>}
      className={cn(pullQuoteVariants({ accent, size }), className)}
      {...props}
    >
      {/* Decorative quote mark */}
      <span
        aria-hidden="true"
        className="absolute -top-2 -left-1 font-display text-6xl font-black leading-none opacity-20 text-fx-black dark:text-fx-white select-none"
      >
        "
      </span>

      <blockquote className={cn(quoteTextVariants({ size }), 'mb-3')}>
        {children}
      </blockquote>

      {(author || source) && (
        <figcaption className="text-sm font-bold text-gray-500 font-sans flex items-center gap-2">
          <span className="inline-block w-4 h-0.5 bg-current opacity-40" aria-hidden="true" />
          <span>
            {author}
            {source && <span className="font-normal italic ml-1">— {source}</span>}
          </span>
        </figcaption>
      )}
    </figure>
  )
);

PullQuote.displayName = 'PullQuote';
export { PullQuote, pullQuoteVariants };
export default PullQuote;
