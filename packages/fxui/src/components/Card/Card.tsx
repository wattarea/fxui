import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  ['rounded-[4px]', 'font-sans', 'transition-all duration-150'],
  {
    variants: {
      variant: {
        default: [
          'bg-fx-white border-2 border-fx-black',
          'dark:bg-fx-black dark:border-fx-white',
        ],
        bordered: [
          'bg-transparent border-2 border-fx-black',
          'dark:border-fx-white',
        ],
        elevated: [
          'bg-fx-white border-2 border-fx-black shadow-fx',
          'dark:bg-fx-black dark:border-fx-white dark:shadow-fx-dark',
        ],
        neon: [
          'bg-fx-yellow border-2 border-fx-black shadow-fx',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant }), className)} {...props} />
  )
);
CardRoot.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-4 border-b-2 border-fx-black font-bold text-lg',
        'dark:border-fx-white',
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = 'Card.Header';

const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-6 py-4', className)} {...props} />
  )
);
CardBody.displayName = 'Card.Body';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-4 border-t-2 border-fx-black flex items-center gap-2',
        'dark:border-fx-white',
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

export default Card;
