import React from 'react';
import { cn } from '../../utils/cn';

export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string | number;
  trend?: StatTrend;
  icon?: React.ReactNode;
  description?: string;
}

const trendConfig: Record<StatTrend, { color: string; arrow: string }> = {
  up: { color: 'text-[#00C853]', arrow: '↑' },
  down: { color: 'text-[#FF1744]', arrow: '↓' },
  neutral: { color: 'text-gray-400', arrow: '→' },
};

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, label, value, change, trend = 'neutral', icon, description, ...props }, ref) => {
    const tc = trendConfig[trend];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 p-5',
          'border-2 border-fx-black rounded-[4px] shadow-fx bg-fx-white',
          'dark:border-fx-white dark:bg-fx-black',
          'transition-all duration-150',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 font-sans">
            {label}
          </p>
          {icon && (
            <span className="shrink-0 text-2xl" aria-hidden="true">{icon}</span>
          )}
        </div>

        <p className="font-display text-4xl font-black text-fx-black dark:text-fx-white leading-none">
          {value}
        </p>

        {(change !== undefined || description) && (
          <div className="flex items-center gap-2">
            {change !== undefined && (
              <span className={cn('text-sm font-bold font-mono', tc.color)}>
                {tc.arrow} {change}
              </span>
            )}
            {description && (
              <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Stat.displayName = 'Stat';

export { Stat };
export default Stat;
