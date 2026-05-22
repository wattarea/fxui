import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(date: Date | null): string {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: (Date | null)[] = Array(first.getDay()).fill(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  clearable?: boolean;
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  className?: string;
}

const CalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      defaultValue = null,
      onChange,
      minDate,
      maxDate,
      placeholder = 'Pick a date',
      disabled = false,
      invalid = false,
      clearable = true,
      label,
      hint,
      error,
      id,
      className,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<Date | null>(defaultValue);
    const [open, setOpen] = React.useState(false);
    const today = new Date();
    const currentValue = isControlled ? value : internalValue;

    const [viewYear, setViewYear] = React.useState(
      (currentValue ?? today).getFullYear()
    );
    const [viewMonth, setViewMonth] = React.useState(
      (currentValue ?? today).getMonth()
    );

    const inputId = id ?? React.useId();
    const days = getCalendarDays(viewYear, viewMonth);

    const select = (date: Date) => {
      if (!isControlled) setInternalValue(date);
      onChange?.(date);
      setOpen(false);
    };

    const clear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
    };

    const prevMonth = () => {
      if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
      else setViewMonth(m => m - 1);
    };

    const nextMonth = () => {
      if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
      else setViewMonth(m => m + 1);
    };

    const isDisabledDay = (d: Date) =>
      (minDate ? d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : false) ||
      (maxDate ? d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()) : false);

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-fx-black dark:text-fx-white font-sans">
            {label}
          </label>
        )}

        <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
          <PopoverPrimitive.Trigger asChild>
            <button
              ref={ref}
              id={inputId}
              type="button"
              disabled={disabled}
              aria-haspopup="dialog"
              aria-expanded={open}
              className={cn(
                'flex w-full items-center justify-between px-3 py-2 text-sm font-sans',
                'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
                'bg-fx-white dark:bg-fx-black',
                'transition-all duration-150',
                open ? 'shadow-fx' : 'hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px]',
                invalid || error ? 'border-[#FF1744]' : '',
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
              )}
            >
              <span className={cn('flex items-center gap-2', !currentValue && 'text-gray-400')}>
                <CalIcon />
                {currentValue ? formatDate(currentValue) : placeholder}
              </span>
              {clearable && currentValue && (
                <span
                  onClick={clear}
                  aria-label="Clear date"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && clear(e as unknown as React.MouseEvent)}
                  className="opacity-40 hover:opacity-100 transition-opacity text-xs"
                >
                  ✕
                </span>
              )}
            </button>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              sideOffset={6}
              align="start"
              role="dialog"
              aria-label="Calendar"
              className={cn(
                'z-50 w-72',
                'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx',
                'bg-fx-white dark:bg-fx-black p-4',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={prevMonth}
                  aria-label="Previous month"
                  className="p-1 rounded-[4px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold"
                >
                  ←
                </button>
                <p className="font-bold text-sm font-sans text-fx-black dark:text-fx-white">
                  {MONTHS[viewMonth]} {viewYear}
                </p>
                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                  className="p-1 rounded-[4px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold"
                >
                  →
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                  <span key={d} className="text-center text-[10px] font-black uppercase text-gray-400 py-1 font-sans">
                    {d}
                  </span>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {days.map((day, i) => {
                  if (!day) return <span key={`empty-${i}`} />;
                  const isToday = isSameDay(day, today);
                  const isSelected = currentValue ? isSameDay(day, currentValue) : false;
                  const isDisabled = isDisabledDay(day);

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => select(day)}
                      aria-label={day.toDateString()}
                      aria-selected={isSelected}
                      aria-pressed={isSelected}
                      className={cn(
                        'h-8 w-full text-xs font-sans font-medium rounded-[4px] transition-all duration-100',
                        isSelected
                          ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black font-black border-2 border-fx-black dark:border-fx-white'
                          : isToday
                          ? 'border-2 border-fx-black dark:border-fx-white font-black text-fx-black dark:text-fx-white'
                          : 'text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
                        isDisabled && 'opacity-25 cursor-not-allowed hover:bg-transparent',
                      )}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-3 pt-3 border-t-2 border-fx-black/10 dark:border-fx-white/10">
                <button
                  type="button"
                  onClick={() => select(today)}
                  className="text-xs font-bold font-sans text-fx-black dark:text-fx-white opacity-60 hover:opacity-100 transition-opacity"
                >
                  Today
                </button>
              </div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {hint && !error && <p className="text-xs text-gray-400 font-sans">{hint}</p>}
        {error && <p className="text-xs text-[#FF1744] font-sans font-bold">{error}</p>}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };
export default DatePicker;
