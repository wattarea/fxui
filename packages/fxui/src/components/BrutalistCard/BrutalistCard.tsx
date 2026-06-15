import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const brutalistCardVariants = cva(
  [
    'relative border-2 border-fx-black dark:border-fx-white',
    'bg-fx-white dark:bg-fx-black',
    'rounded-[4px]',
    'transition-all duration-150 ease-in-out',
  ],
  {
    variants: {
      shadow: {
        sm: 'shadow-fx-sm dark:shadow-fx-dark-sm',
        md: 'shadow-fx dark:shadow-fx-dark',
        lg: 'shadow-fx-lg',
        xl: 'shadow-fx-xl',
        none: '',
      },
      accent: {
        none:   '',
        yellow: 'border-t-4 border-t-fx-yellow',
        pink:   'border-t-4 border-t-fx-pink',
        green:  'border-t-4 border-t-fx-green',
        blue:   'border-t-4 border-t-fx-blue',
        purple: 'border-t-4 border-t-fx-purple',
        black:  'border-t-4 border-t-fx-black dark:border-t-fx-white',
        left_yellow: 'border-l-4 border-l-fx-yellow',
        left_pink:   'border-l-4 border-l-fx-pink',
        left_green:  'border-l-4 border-l-fx-green',
        left_blue:   'border-l-4 border-l-fx-blue',
      },
      filled: {
        none:   '',
        yellow: 'bg-fx-yellow text-fx-black border-fx-black',
        pink:   'bg-fx-pink text-fx-white border-fx-black',
        green:  'bg-fx-green text-fx-black border-fx-black',
        blue:   'bg-fx-blue text-fx-white border-fx-black',
        black:  'bg-fx-black text-fx-white border-fx-black dark:bg-fx-white dark:text-fx-black',
      },
      hoverable: {
        true:  'cursor-pointer hover:shadow-fx-sm dark:hover:shadow-fx-dark-sm hover:translate-x-[2px] hover:translate-y-[2px]',
        false: '',
      },
      pressable: {
        true:  'cursor-pointer active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
        false: '',
      },
      padding: {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-7',
      },
    },
    defaultVariants: {
      shadow: 'md',
      accent: 'none',
      filled: 'none',
      hoverable: false,
      pressable: false,
      padding: 'md',
    },
  }
);

export interface BrutalistCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof brutalistCardVariants> {
  stamp?: React.ReactNode;
  stampPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const BrutalistCard = React.forwardRef<HTMLDivElement, BrutalistCardProps>(
  (
    {
      shadow,
      accent,
      filled,
      hoverable,
      pressable,
      padding,
      stamp,
      stampPosition = 'top-right',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const stampPositionClass = {
      'top-right':    '-top-3 -right-3',
      'top-left':     '-top-3 -left-3',
      'bottom-right': '-bottom-3 -right-3',
      'bottom-left':  '-bottom-3 -left-3',
    }[stampPosition];

    return (
      <div
        ref={ref}
        className={cn(
          brutalistCardVariants({ shadow, accent, filled, hoverable, pressable, padding }),
          className,
        )}
        {...props}
      >
        {stamp && (
          <div className={cn('absolute z-10', stampPositionClass)}>
            {stamp}
          </div>
        )}
        {children}
      </div>
    );
  }
);
BrutalistCard.displayName = 'BrutalistCard';
export { BrutalistCard, brutalistCardVariants };
export default BrutalistCard;
