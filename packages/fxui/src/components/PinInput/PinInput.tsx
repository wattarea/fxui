import React from 'react';
import { cn } from '../../utils/cn';

export interface PinInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, complete: boolean) => void;
  onComplete?: (value: string) => void;
  masked?: boolean;
  numeric?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'flushed';
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-9 h-9 text-base',
  md: 'w-11 h-11 text-xl',
  lg: 'w-14 h-14 text-2xl',
};

const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>(
  (
    {
      length = 6,
      value,
      defaultValue = '',
      onChange,
      onComplete,
      masked = false,
      numeric = true,
      size = 'md',
      variant = 'default',
      label,
      error,
      hint,
      disabled = false,
      autoFocus = false,
      className,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [inner, setInner] = React.useState(() => defaultValue.slice(0, length));
    const digits = isControlled ? value!.slice(0, length) : inner;

    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const groupId = React.useId();

    const focus = (i: number) => {
      inputRefs.current[Math.max(0, Math.min(i, length - 1))]?.focus();
    };

    React.useEffect(() => {
      if (autoFocus) focus(0);
    }, []);

    const update = (next: string) => {
      if (!isControlled) setInner(next);
      const complete = next.length === length;
      onChange?.(next, complete);
      if (complete) onComplete?.(next);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
      if (e.key === 'Backspace') {
        if (digits[i]) {
          const next = digits.slice(0, i) + digits.slice(i + 1);
          update(next);
        } else {
          focus(i - 1);
        }
      } else if (e.key === 'ArrowLeft') {
        focus(i - 1);
      } else if (e.key === 'ArrowRight') {
        focus(i + 1);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
      const char = e.target.value.slice(-1);
      if (numeric && !/\d/.test(char)) return;
      if (!char) return;
      const next = (digits.slice(0, i) + char + digits.slice(i + 1)).slice(0, length);
      update(next);
      if (i < length - 1) focus(i + 1);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, i: number) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text');
      const filtered = numeric ? pasted.replace(/\D/g, '') : pasted;
      const next = (digits.slice(0, i) + filtered).slice(0, length);
      update(next);
      focus(Math.min(i + filtered.length, length - 1));
    };

    const baseCell = cn(
      'flex items-center justify-center font-display font-black text-center',
      'border-2 rounded-[4px] transition-all duration-150',
      'focus:outline-none focus:ring-2 focus:ring-fx-black dark:focus:ring-fx-white',
      sizeMap[size],
      variant === 'filled'
        ? 'bg-gray-100 dark:bg-gray-800 border-fx-black dark:border-fx-white'
        : variant === 'flushed'
        ? 'border-0 border-b-2 rounded-none'
        : 'bg-fx-white dark:bg-fx-black border-fx-black dark:border-fx-white',
      error && 'border-fx-pink',
      disabled && 'opacity-50 cursor-not-allowed',
    );

    return (
      <div ref={ref} className={cn('font-sans flex flex-col gap-2', className)}>
        {label && <p className="text-sm font-bold text-fx-black dark:text-fx-white">{label}</p>}

        <div className="flex gap-2 items-center" role="group" aria-label={label ?? 'PIN Input'} aria-describedby={error ? `${groupId}-error` : hint ? `${groupId}-hint` : undefined}>
          {Array.from({ length }, (_, i) => {
            const digit = digits[i] ?? '';
            const filled = !!digit;
            return (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type={masked ? 'password' : 'text'}
                inputMode={numeric ? 'numeric' : 'text'}
                maxLength={2}
                value={filled ? digit : ''}
                disabled={disabled}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={(e) => handlePaste(e, i)}
                onFocus={(e) => e.target.select()}
                aria-label={`PIN digit ${i + 1}`}
                className={cn(
                  baseCell,
                  filled && !error && 'bg-fx-yellow dark:bg-fx-yellow dark:text-fx-black border-fx-black shadow-fx-sm translate-x-[1px] translate-y-[1px]',
                )}
              />
            );
          })}
        </div>

        {error && <p id={`${groupId}-error`} className="text-xs text-fx-pink font-medium">{error}</p>}
        {!error && hint && <p id={`${groupId}-hint`} className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  }
);

PinInput.displayName = 'PinInput';
export { PinInput };
export default PinInput;
