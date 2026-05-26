import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const countdownVariants = cva('inline-flex items-center gap-1', {
  variants: {
    variant: {
      default: '',
      card: 'gap-2',
      minimal: 'gap-0.5',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

const segmentSizeMap = {
  sm: { digit: 'text-2xl', label: 'text-[9px]', box: 'min-w-[40px] p-1.5' },
  md: { digit: 'text-4xl', label: 'text-[10px]', box: 'min-w-[56px] p-2' },
  lg: { digit: 'text-6xl', label: 'text-xs',     box: 'min-w-[72px] p-3' },
};

function getRemainingSeconds(target: Date | string | number): number {
  return Math.max(0, Math.floor((new Date(target).getTime() - Date.now()) / 1000));
}

function decompose(totalSeconds: number) {
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { d, h, m, s };
}

function pad(n: number) { return String(n).padStart(2, '0'); }

export interface CountdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof countdownVariants> {
  targetDate?: Date | string | number;
  seconds?: number;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  paused?: boolean;
  onComplete?: () => void;
  separator?: React.ReactNode;
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
}

const Countdown = React.forwardRef<HTMLDivElement, CountdownProps>(
  (
    {
      targetDate,
      seconds: initialSeconds,
      showDays = true,
      showHours = true,
      showMinutes = true,
      showSeconds = true,
      paused = false,
      onComplete,
      separator,
      labels = { days: 'DAYS', hours: 'HRS', minutes: 'MIN', seconds: 'SEC' },
      variant,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const getInitial = React.useCallback(() => {
      if (targetDate !== undefined) return getRemainingSeconds(targetDate);
      return Math.max(0, initialSeconds ?? 0);
    }, [targetDate, initialSeconds]);

    const [remaining, setRemaining] = React.useState(getInitial);
    const completedRef = React.useRef(false);

    React.useEffect(() => {
      setRemaining(getInitial());
      completedRef.current = false;
    }, [getInitial]);

    React.useEffect(() => {
      if (paused || remaining <= 0) return;
      const id = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            if (!completedRef.current) {
              completedRef.current = true;
              onComplete?.();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }, [paused, remaining, onComplete]);

    const { d, h, m, s } = decompose(remaining);
    const sz = segmentSizeMap[size ?? 'md'];
    const isCard = variant === 'card';

    const segments = [
      { key: 'days',    value: d, label: labels.days    ?? 'DAYS', show: showDays },
      { key: 'hours',   value: h, label: labels.hours   ?? 'HRS',  show: showHours },
      { key: 'minutes', value: m, label: labels.minutes ?? 'MIN',  show: showMinutes },
      { key: 'seconds', value: s, label: labels.seconds ?? 'SEC',  show: showSeconds },
    ].filter((seg) => seg.show);

    return (
      <div
        ref={ref}
        role="timer"
        aria-live="off"
        aria-label={`${remaining} seconds remaining`}
        className={cn(countdownVariants({ variant, size }), className)}
        {...props}
      >
        {segments.map((seg, i) => (
          <React.Fragment key={seg.key}>
            {i > 0 && separator !== undefined && (
              <span className={cn('font-display font-black text-fx-black dark:text-fx-white', sz.digit, 'self-start pt-1')}>
                {separator}
              </span>
            )}
            {isCard ? (
              <div className={cn(
                'flex flex-col items-center',
                'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx dark:shadow-fx-dark',
                'bg-fx-white dark:bg-fx-black',
                sz.box,
              )}>
                <span className={cn('font-display font-black tabular-nums text-fx-black dark:text-fx-white leading-none', sz.digit)}>
                  {pad(seg.value)}
                </span>
                <span className={cn('font-sans font-bold tracking-widest text-gray-400 mt-1', sz.label)}>
                  {seg.label}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className={cn('font-display font-black tabular-nums text-fx-black dark:text-fx-white leading-none', sz.digit)}>
                  {pad(seg.value)}
                </span>
                <span className={cn('font-sans font-bold tracking-widest text-gray-400', sz.label)}>
                  {seg.label}
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
Countdown.displayName = 'Countdown';
export { Countdown };
export default Countdown;
