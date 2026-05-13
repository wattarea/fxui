import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const blockquoteVariants = cva(
  [
    'relative pl-5 py-1 font-sans',
    'border-l-4 border-fx-black dark:border-fx-white',
    'text-fx-black dark:text-fx-white',
  ],
  {
    variants: {
      variant: {
        default: 'border-l-fx-black dark:border-l-fx-white',
        yellow: 'border-l-fx-yellow',
        pink: 'border-l-fx-pink',
        green: 'border-l-fx-green',
        blue: 'border-l-fx-blue',
        purple: 'border-l-fx-purple',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg md:text-xl',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

export interface BlockquoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
    VariantProps<typeof blockquoteVariants> {
  cite?: string;
  author?: string;
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, variant, size, cite, author, children, ...props }, ref) => (
    <figure className="my-2">
      <blockquote
        ref={ref}
        cite={cite}
        className={cn(blockquoteVariants({ variant, size }), className)}
        {...props}
      >
        <p className="leading-relaxed">{children}</p>
      </blockquote>
      {author && (
        <figcaption className="mt-2 pl-5 text-xs font-bold text-gray-400 font-sans tracking-wide">
          — {author}
          {cite && (
            <a
              href={cite}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline hover:text-fx-blue transition-colors"
            >
              ↗
            </a>
          )}
        </figcaption>
      )}
    </figure>
  )
);

Blockquote.displayName = 'Blockquote';

export { Blockquote, blockquoteVariants };
export default Blockquote;
