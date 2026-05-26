import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const skeletonVariants = cva(
  ['border-2 border-fx-black dark:border-fx-white'],
  {
    variants: {
      shape: {
        rect: 'rounded-[4px]',
        circle: 'rounded-full',
        text: 'rounded-[4px] h-4',
      },
      animation: {
        shimmer: [
          'bg-[length:800px_100%]',
          'animate-fx-shimmer',
          'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100',
          'dark:from-gray-800 dark:via-gray-700 dark:to-gray-800',
        ],
        pulse: [
          'animate-fx-pulse',
          'bg-gray-100 dark:bg-gray-800',
        ],
        wave: [
          'relative overflow-hidden',
          'bg-gray-100 dark:bg-gray-800',
        ],
        none: [
          'bg-gray-100 dark:bg-gray-800',
        ],
      },
    },
    defaultVariants: { shape: 'rect', animation: 'shimmer' },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape, animation, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(skeletonVariants({ shape, animation }), className)}
      {...props}
    >
      {animation === 'wave' && (
        <span
          className="absolute inset-0 -translate-x-full animate-fx-wave bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  )
);
Skeleton.displayName = 'Skeleton';

// ─── Skeleton.Text ──────────────────────────────────────────────────────────

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lastLineWidth?: string;
  animation?: SkeletonProps['animation'];
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lastLineWidth = '60%', animation, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          shape="text"
          animation={animation}
          style={i === lines - 1 && lines > 1 ? { width: lastLineWidth } : undefined}
        />
      ))}
    </div>
  )
);
SkeletonText.displayName = 'Skeleton.Text';

// ─── Skeleton.Avatar ─────────────────────────────────────────────────────────

export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  lines?: number;
  animation?: SkeletonProps['animation'];
}

const avatarSizeMap = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-14 w-14' };

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 'md', lines = 2, animation, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-3', className)} {...props} aria-hidden="true">
      <Skeleton shape="circle" animation={animation} className={cn(avatarSizeMap[size], 'shrink-0')} />
      <div className="flex-1">
        <SkeletonText lines={lines} animation={animation} lastLineWidth="60%" />
      </div>
    </div>
  )
);
SkeletonAvatar.displayName = 'Skeleton.Avatar';

// ─── Skeleton.Button ─────────────────────────────────────────────────────────

export interface SkeletonButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  animation?: SkeletonProps['animation'];
}

const buttonSizeMap = { sm: 'h-8 w-20', md: 'h-10 w-28', lg: 'h-12 w-36' };

const SkeletonButton = React.forwardRef<HTMLDivElement, SkeletonButtonProps>(
  ({ size = 'md', animation, className, ...props }, ref) => (
    <Skeleton
      ref={ref}
      animation={animation}
      className={cn(buttonSizeMap[size], className)}
      {...props}
    />
  )
);
SkeletonButton.displayName = 'Skeleton.Button';

// ─── Skeleton.Image ──────────────────────────────────────────────────────────

export interface SkeletonImageProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/2' | '2/3';
  animation?: SkeletonProps['animation'];
}

const SkeletonImage = React.forwardRef<HTMLDivElement, SkeletonImageProps>(
  ({ aspectRatio = '16/9', animation, className, style, ...props }, ref) => (
    <Skeleton
      ref={ref}
      animation={animation}
      className={cn('w-full', className)}
      style={{ aspectRatio, ...style }}
      {...props}
    />
  )
);
SkeletonImage.displayName = 'Skeleton.Image';

// ─── Named export ─────────────────────────────────────────────────────────────

export const SkeletonComponent = Object.assign(Skeleton, {
  Text: SkeletonText,
  Avatar: SkeletonAvatar,
  Button: SkeletonButton,
  Image: SkeletonImage,
});

export { SkeletonComponent as Skeleton };
export default SkeletonComponent;
