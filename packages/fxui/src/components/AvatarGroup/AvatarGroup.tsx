import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const avatarVariants = cva(
  [
    'relative inline-flex items-center justify-center shrink-0 overflow-hidden',
    'border-2 border-fx-black dark:border-fx-white',
    'font-bold font-sans select-none',
    'ring-2 ring-fx-white dark:ring-fx-black',
  ],
  {
    variants: {
      size: {
        xs:  'h-6  w-6  text-[10px]',
        sm:  'h-8  w-8  text-xs',
        md:  'h-10 w-10 text-sm',
        lg:  'h-12 w-12 text-base',
        xl:  'h-16 w-16 text-xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-[4px]',
      },
    },
    defaultVariants: { size: 'md', shape: 'circle' },
  }
);

const accentColors: Record<string, string> = {
  yellow:  'bg-fx-yellow text-fx-black',
  pink:    'bg-fx-pink   text-fx-white',
  green:   'bg-fx-green  text-fx-black',
  blue:    'bg-fx-blue   text-fx-white',
  purple:  'bg-fx-purple text-fx-white',
  black:   'bg-fx-black  text-fx-white dark:bg-fx-white dark:text-fx-black',
  default: 'bg-gray-100  text-fx-black dark:bg-gray-800 dark:text-fx-white',
};

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export interface AvatarItem {
  src?: string;
  name: string;
  color?: 'yellow' | 'pink' | 'green' | 'blue' | 'purple' | 'black' | 'default';
}

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  avatars: AvatarItem[];
  max?: number;
  spacing?: 'tight' | 'normal' | 'loose';
  showTooltip?: boolean;
}

const spacingMap = { tight: '-space-x-3', normal: '-space-x-2', loose: '-space-x-1' };

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      avatars,
      max,
      size = 'md',
      shape = 'circle',
      spacing = 'normal',
      showTooltip = true,
      className,
      ...props
    },
    ref
  ) => {
    const visible = max ? avatars.slice(0, max) : avatars;
    const overflow = max ? Math.max(0, avatars.length - max) : 0;

    return (
      <div
        ref={ref}
        className={cn('flex', spacingMap[spacing ?? 'normal'], className)}
        role="group"
        aria-label={`${avatars.length} avatars`}
        {...props}
      >
        {visible.map((avatar, i) => {
          const colorClass = accentColors[avatar.color ?? 'default'];
          const initials = getInitials(avatar.name);
          const [imgError, setImgError] = React.useState(false);
          const showImg = avatar.src && !imgError;

          return (
            <span
              key={i}
              role="img"
              aria-label={avatar.name}
              title={showTooltip ? avatar.name : undefined}
              className={cn(avatarVariants({ size, shape }), colorClass)}
            >
              {showImg ? (
                <img
                  src={avatar.src}
                  alt={avatar.name}
                  className="h-full w-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span>{initials}</span>
              )}
            </span>
          );
        })}

        {overflow > 0 && (
          <span
            className={cn(
              avatarVariants({ size, shape }),
              'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black',
              'text-[11px] font-black'
            )}
            aria-label={`${overflow} more`}
            title={showTooltip ? `+${overflow} more` : undefined}
          >
            +{overflow}
          </span>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';
export { AvatarGroup };
export default AvatarGroup;
