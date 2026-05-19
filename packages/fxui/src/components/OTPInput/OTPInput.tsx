import React from 'react';
import { cn } from '../../utils/cn';

const sizeMap = {
  sm: 'h-9 w-8 text-sm',
  md: 'h-12 w-10 text-lg',
  lg: 'h-14 w-12 text-xl',
} as const;

export interface OTPInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  type?: 'numeric' | 'alphanumeric';
  autoFocus?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  groupSize?: number;
  label?: string;
  error?: string;
}

const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      value: controlledValue,
      onChange,
      onComplete,
      type = 'numeric',
      autoFocus = false,
      disabled = false,
      size = 'md',
      groupSize = 3,
      label,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState('');
    const raw = isControlled ? controlledValue! : internalValue;
    const digits = Array.from({ length }, (_, i) => raw[i] ?? '');

    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const update = (next: string) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
      if (next.length === length) onComplete?.(next);
    };

    const focus = (i: number) => {
      inputRefs.current[Math.max(0, Math.min(i, length - 1))]?.focus();
    };

    React.useEffect(() => {
      if (autoFocus) focus(raw.length < length ? raw.length : length - 1);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const char = e.target.value.slice(-1);
      if (!char) return;
      const isValid = type === 'numeric' ? /^\d$/.test(char) : /^[a-zA-Z0-9]$/.test(char);
      if (!isValid) return;
      const arr = digits.map((d, i) => (i === index ? char.toUpperCase() : d));
      const next = arr.join('').slice(0, length);
      update(next);
      if (index < length - 1) focus(index + 1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (digits[index]) {
          const arr = digits.map((d, i) => (i === index ? '' : d));
          update(arr.join(''));
        } else if (index > 0) {
          const arr = digits.map((d, i) => (i === index - 1 ? '' : d));
          update(arr.join(''));
          focus(index - 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focus(index - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        focus(index + 1);
      } else if (e.key === 'Delete') {
        e.preventDefault();
        const arr = digits.map((d, i) => (i === index ? '' : d));
        update(arr.join(''));
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(type === 'numeric' ? /\D/g : /[^a-zA-Z0-9]/g, '').toUpperCase();
      const arr = [...digits];
      let j = 0;
      for (let i = index; i < length && j < pasted.length; i++, j++) {
        arr[i] = pasted[j];
      }
      const next = arr.join('').slice(0, length);
      update(next);
      const nextFocus = Math.min(index + pasted.length, length - 1);
      focus(nextFocus);
    };

    return (
      <div ref={ref} className={cn('inline-flex flex-col gap-2', className)} {...props}>
        {label && (
          <label className="text-xs font-black uppercase tracking-widest text-gray-500 font-sans">{label}</label>
        )}
        <div className="inline-flex items-center gap-2" role="group" aria-label={label ?? 'OTP Input'}>
          {digits.map((digit, i) => (
            <React.Fragment key={i}>
              {groupSize && i > 0 && i % groupSize === 0 && (
                <span className="text-gray-300 font-bold select-none" aria-hidden="true">—</span>
              )}
              <input
                ref={(el) => { inputRefs.current[i] = el; }}
                type={type === 'numeric' ? 'tel' : 'text'}
                inputMode={type === 'numeric' ? 'numeric' : 'text'}
                maxLength={1}
                value={digit}
                disabled={disabled}
                autoComplete="one-time-code"
                aria-label={`Digit ${i + 1} of ${length}`}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={(e) => handlePaste(e, i)}
                onFocus={(e) => e.target.select()}
                className={cn(
                  sizeMap[size],
                  'text-center font-mono font-black',
                  'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
                  'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
                  'outline-none transition-all duration-150',
                  'focus:shadow-fx focus:-translate-x-[2px] focus:-translate-y-[2px]',
                  digit && 'bg-fx-yellow dark:bg-fx-yellow dark:text-fx-black border-fx-black',
                  error && 'border-[#FF2D78]',
                  disabled && 'opacity-40 cursor-not-allowed',
                )}
              />
            </React.Fragment>
          ))}
        </div>
        {error && (
          <p className="text-xs font-bold text-[#FF2D78] font-sans">{error}</p>
        )}
      </div>
    );
  }
);

OTPInput.displayName = 'OTPInput';
export { OTPInput };
export default OTPInput;
