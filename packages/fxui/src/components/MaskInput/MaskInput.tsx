import React from 'react';
import { cn } from '../../utils/cn';

export type MaskInputPreset = 'phone-us' | 'phone-tr' | 'credit-card' | 'date' | 'time' | 'ssn' | 'zip';

const PRESETS: Record<MaskInputPreset, { mask: string; placeholder: string }> = {
  'phone-us': { mask: '(999) 999-9999', placeholder: '(555) 123-4567' },
  'phone-tr': { mask: '(999) 999 99 99', placeholder: '(555) 123 45 67' },
  'credit-card': { mask: '9999 9999 9999 9999', placeholder: '1234 5678 9012 3456' },
  date: { mask: '99/99/9999', placeholder: 'MM/DD/YYYY' },
  time: { mask: '99:99', placeholder: 'HH:MM' },
  ssn: { mask: '999-99-9999', placeholder: '123-45-6789' },
  zip: { mask: '99999', placeholder: '12345' },
};

function applyMask(rawDigits: string, mask: string): string {
  let di = 0;
  let result = '';
  for (let i = 0; i < mask.length && di < rawDigits.length; i++) {
    if (mask[i] === '9') {
      result += rawDigits[di++];
    } else {
      result += mask[i];
      if (rawDigits[di] === mask[i]) di++;
    }
  }
  return result;
}

export interface MaskInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'> {
  mask?: string;
  preset?: MaskInputPreset;
  value?: string;
  defaultValue?: string;
  onChange?: (raw: string, formatted: string) => void;
  label?: string;
  error?: string;
  hint?: string;
}

const MaskInput = React.forwardRef<HTMLInputElement, MaskInputProps>(
  ({ mask: maskProp, preset, value, defaultValue = '', onChange, label, error, hint, id, className, ...props }, ref) => {
    const mask = maskProp ?? (preset ? PRESETS[preset].mask : '');
    const ph = props.placeholder ?? (preset ? PRESETS[preset].placeholder : '');

    const isControlled = value !== undefined;
    const [inner, setInner] = React.useState(() => {
      const digits = (defaultValue).replace(/\D/g, '');
      return mask ? applyMask(digits, mask) : defaultValue;
    });
    const display = isControlled ? (mask ? applyMask(value!.replace(/\D/g, ''), mask) : value!) : inner;

    const inputId = id ?? React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, '');
      const formatted = mask ? applyMask(raw, mask) : raw;
      if (!isControlled) setInner(formatted);
      onChange?.(raw, formatted);
    };

    return (
      <div className="flex flex-col gap-1.5 font-sans">
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-fx-black dark:text-fx-white">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="text"
          inputMode="numeric"
          value={display}
          onChange={handleChange}
          placeholder={ph}
          aria-invalid={!!error}
          className={cn(
            'w-full px-3 py-2 text-sm font-mono',
            'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
            'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-fx-black dark:focus:ring-fx-white',
            error && 'border-fx-pink focus:ring-fx-pink',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-fx-pink font-medium">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  }
);

MaskInput.displayName = 'MaskInput';
export { MaskInput };
export default MaskInput;
