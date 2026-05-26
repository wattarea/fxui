import React from 'react';
import { cn } from '../../utils/cn';

function getRelativeTime(date: Date, locale: string): string {
  const now = Date.now();
  const diffMs = date.getTime() - now;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffWeek = Math.round(diffDay / 7);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffSec) < 60)  return rtf.format(diffSec, 'second');
  if (Math.abs(diffMin) < 60)  return rtf.format(diffMin, 'minute');
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour');
  if (Math.abs(diffDay) < 7)   return rtf.format(diffDay, 'day');
  if (Math.abs(diffWeek) < 5)  return rtf.format(diffWeek, 'week');
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, 'month');
  return rtf.format(diffYear, 'year');
}

export interface TimeAgoProps extends React.HTMLAttributes<HTMLTimeElement> {
  date: Date | string | number;
  locale?: string;
  refreshInterval?: number;
  showAbsolute?: boolean;
}

const TimeAgo = React.forwardRef<HTMLTimeElement, TimeAgoProps>(
  (
    {
      date,
      locale = 'en',
      refreshInterval = 60_000,
      showAbsolute = false,
      className,
      ...props
    },
    ref
  ) => {
    const dateObj = React.useMemo(() => new Date(date), [date]);
    const [, forceUpdate] = React.useReducer((n: number) => n + 1, 0);

    React.useEffect(() => {
      if (refreshInterval <= 0) return;
      const id = setInterval(forceUpdate, refreshInterval);
      return () => clearInterval(id);
    }, [refreshInterval]);

    const relative = getRelativeTime(dateObj, locale);
    const absolute = dateObj.toLocaleString(locale, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    return (
      <time
        ref={ref}
        dateTime={dateObj.toISOString()}
        title={absolute}
        className={cn('font-sans text-sm text-gray-500 dark:text-gray-400', className)}
        {...props}
      >
        {showAbsolute ? absolute : relative}
      </time>
    );
  }
);
TimeAgo.displayName = 'TimeAgo';
export { TimeAgo };
export default TimeAgo;
