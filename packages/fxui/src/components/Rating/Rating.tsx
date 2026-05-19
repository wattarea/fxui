import React from 'react';
import { cn } from '../../utils/cn';

// ─── Star SVG ──────────────────────────────────────────────────────────────

const StarPath = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

function Star({ fill, size, color }: { fill: number; size: number; color: string }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <clipPath id={`rc-${id}`}>
          <rect x="0" y="0" width={`${Math.round(fill * 100)}%`} height="100%" />
        </clipPath>
      </defs>
      <path d={StarPath} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {fill > 0 && <path d={StarPath} fill={color} clipPath={`url(#rc-${id})`} />}
    </svg>
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────

const sizes = { sm: 16, md: 22, lg: 30 } as const;

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  precision?: 'full' | 'half';
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
}

// ─── Component ─────────────────────────────────────────────────────────────

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      max = 5,
      precision = 'full',
      readOnly = false,
      disabled = false,
      size = 'md',
      color = '#FFE500',
      label,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [hovered, setHovered] = React.useState<number | null>(null);

    const value = isControlled ? controlledValue! : internalValue;
    const displayValue = hovered ?? value;
    const px = sizes[size];
    const gap = size === 'sm' ? 2 : size === 'lg' ? 6 : 4;

    const getStarFill = (index: number): number => {
      const starValue = index + 1;
      if (displayValue >= starValue) return 1;
      if (precision === 'half' && displayValue >= starValue - 0.5) return 0.5;
      return 0;
    };

    const getValue = (e: React.MouseEvent<HTMLSpanElement>, index: number): number => {
      if (precision === 'half') {
        const rect = e.currentTarget.getBoundingClientRect();
        return e.clientX - rect.left < rect.width / 2 ? index + 0.5 : index + 1;
      }
      return index + 1;
    };

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
      if (readOnly || disabled) return;
      const next = getValue(e, index);
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
      if (readOnly || disabled) return;
      setHovered(getValue(e, index));
    };

    return (
      <div ref={ref} className={cn('inline-flex flex-col gap-1', className)} {...props}>
        {label && (
          <span className="text-xs font-black uppercase tracking-widest text-gray-400 font-sans">{label}</span>
        )}
        <div
          role="radiogroup"
          aria-label={label ?? 'Rating'}
          className={cn('inline-flex', disabled && 'opacity-40 cursor-not-allowed')}
          style={{ gap }}
          onMouseLeave={() => !readOnly && !disabled && setHovered(null)}
        >
          {Array.from({ length: max }, (_, i) => (
            <span
              key={i}
              role="radio"
              aria-checked={value === i + 1}
              aria-label={`${i + 1} star${i !== 0 ? 's' : ''}`}
              tabIndex={readOnly || disabled ? -1 : 0}
              className={cn(
                'transition-transform duration-100',
                !readOnly && !disabled && 'cursor-pointer hover:scale-110 active:scale-95',
              )}
              onClick={(e) => handleClick(e, i)}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!readOnly && !disabled) {
                    const next = i + 1;
                    if (!isControlled) setInternalValue(next);
                    onChange?.(next);
                  }
                }
              }}
            >
              <Star fill={getStarFill(i)} size={px} color={color} />
            </span>
          ))}
        </div>
      </div>
    );
  }
);

Rating.displayName = 'Rating';
export { Rating };
export default Rating;
