import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const containerVariants = cva('mx-auto w-full px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    },
    boxed: {
      true: 'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx',
      false: '',
    },
  },
  defaultVariants: { size: 'xl', boxed: false },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, boxed, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, boxed }), className)}
      {...props}
    >
      {children}
    </div>
  )
);

Container.displayName = 'Container';

export { Container, containerVariants };
export default Container;
