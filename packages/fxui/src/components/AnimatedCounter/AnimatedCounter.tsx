import React from 'react';
import { cn } from '../../utils/cn';

export interface AnimatedCounterProps {
  value: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  easing?: 'linear' | 'easeOut' | 'easeInOut';
  className?: string;
  formatValue?: (value: number) => string;
}

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOutCubic(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

function formatWithSeparator(val: number, decimals: number, sep: string) {
  const fixed = val.toFixed(decimals);
  const [int, dec] = fixed.split('.');
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return dec ? `${formatted}.${dec}` : formatted;
}

const AnimatedCounter = React.forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  (
    {
      value,
      from = 0,
      duration = 1500,
      decimals = 0,
      prefix = '',
      suffix = '',
      separator = ',',
      easing = 'easeOut',
      className,
      formatValue,
    },
    ref
  ) => {
    const [display, setDisplay] = React.useState(from);
    const startRef = React.useRef<number | null>(null);
    const rafRef = React.useRef<number>();
    const prevValueRef = React.useRef(from);

    React.useEffect(() => {
      const startVal = prevValueRef.current;
      const endVal = value;
      prevValueRef.current = value;

      if (startRef.current !== null) cancelAnimationFrame(rafRef.current!);
      startRef.current = null;

      const easeFn = easing === 'linear' ? (t: number) => t : easing === 'easeInOut' ? easeInOutCubic : easeOutCubic;

      const tick = (ts: number) => {
        if (startRef.current === null) startRef.current = ts;
        const elapsed = ts - startRef.current;
        const t = Math.min(elapsed / duration, 1);
        const current = startVal + (endVal - startVal) * easeFn(t);
        setDisplay(current);
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
        else setDisplay(endVal);
      };

      rafRef.current = requestAnimationFrame(tick);
      return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [value, duration, easing]);

    const formatted = formatValue
      ? formatValue(display)
      : formatWithSeparator(display, decimals, separator);

    return (
      <span
        ref={ref}
        aria-live="polite"
        aria-atomic="true"
        className={cn('font-display font-black tabular-nums', className)}
      >
        {prefix}{formatted}{suffix}
      </span>
    );
  }
);

AnimatedCounter.displayName = 'AnimatedCounter';
export { AnimatedCounter };
export default AnimatedCounter;
