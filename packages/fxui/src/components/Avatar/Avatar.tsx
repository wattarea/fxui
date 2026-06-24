import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const avatarVariants = cva(
  [
    'relative inline-flex items-center justify-center shrink-0 overflow-hidden',
    'border-2 border-fx-black dark:border-fx-white',
    'font-bold font-sans select-none',
    'bg-gray-100 dark:bg-gray-800',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-[4px]',
      },
    },
    defaultVariants: { size: 'md', shape: 'circle' },
  }
);

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, shape, src, alt = '', fallback = '?', ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    const showImage = src && !imgError;
    const initials = fallback.length > 2 ? getInitials(fallback) : fallback;

    return (
      <span
        ref={ref}
        role="img"
        aria-label={alt || fallback}
        className={cn(avatarVariants({ size, shape }), className)}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-fx-black dark:text-fx-white">{initials}</span>
        )}
      </span>
    );
  }
);
AvatarRoot.displayName = 'Avatar';

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
  children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max, size = 'md', className, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visible = max ? childArray.slice(0, max) : childArray;
    const overflow = max ? childArray.length - max : 0;

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)} {...props}>
        {visible.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                key: i,
                size,
                className: cn('ring-2 ring-fx-white dark:ring-fx-black', (child as React.ReactElement<AvatarProps>).props.className),
              })
            : child
        )}
        {overflow > 0 && (
          <span
            className={cn(
              avatarVariants({ size, shape: 'circle' }),
              'ring-2 ring-fx-white dark:ring-fx-black',
              'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black'
            )}
            aria-label={`${overflow} more`}
          >
            +{overflow}
          </span>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'Avatar.Group';

export const Avatar = Object.assign(AvatarRoot, { Group: AvatarGroup });
export default Avatar;
