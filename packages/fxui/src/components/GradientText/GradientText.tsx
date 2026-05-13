import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const gradients = {
  neon: 'from-fx-yellow via-fx-pink to-fx-purple',
  sunset: 'from-fx-yellow via-fx-pink to-fx-blue',
  ocean: 'from-fx-green via-fx-blue to-fx-purple',
  fire: 'from-fx-yellow to-fx-pink',
  electric: 'from-fx-blue to-fx-purple',
  lime: 'from-fx-green to-fx-yellow',
  candy: 'from-fx-pink to-fx-purple',
} as const;

const gradientTextVariants = cva(
  'bg-clip-text text-transparent bg-gradient-to-r inline',
  {
    variants: {
      gradient: {
        neon: 'from-fx-yellow via-fx-pink to-fx-purple',
        sunset: 'from-fx-yellow via-fx-pink to-fx-blue',
        ocean: 'from-fx-green via-fx-blue to-fx-purple',
        fire: 'from-fx-yellow to-fx-pink',
        electric: 'from-fx-blue to-fx-purple',
        lime: 'from-fx-green to-fx-yellow',
        candy: 'from-fx-pink to-fx-purple',
      },
    },
    defaultVariants: { gradient: 'neon' },
  }
);

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof gradientTextVariants> {
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  animate?: boolean;
}

const GradientText = React.forwardRef<HTMLElement, GradientTextProps>(
  ({ className, gradient, as: Tag = 'span', animate = false, style, children, ...props }, ref) => {
    const El = Tag as React.ElementType;
    return (
      <El
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(
          gradientTextVariants({ gradient }),
          animate && 'animate-[gradient_3s_ease_infinite] bg-[length:200%_auto]',
          className
        )}
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          ...style,
        }}
        {...props}
      >
        {children}
      </El>
    );
  }
);

GradientText.displayName = 'GradientText';
export { GradientText, gradientTextVariants };
export default GradientText;
