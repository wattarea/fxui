import React from 'react';
import { cn } from '../../utils/cn';

export interface CountryCode {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'TR', dial: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: 'FR', dial: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'IT', dial: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', dial: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: 'NL', dial: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'PL', dial: '+48', flag: '🇵🇱', name: 'Poland' },
  { code: 'RU', dial: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: 'CN', dial: '+86', flag: '🇨🇳', name: 'China' },
  { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: 'KR', dial: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'BR', dial: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada' },
];

export interface PhoneInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, dialCode: string, number: string) => void;
  defaultCountry?: string;
  countries?: CountryCode[];
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      defaultValue = '',
      onChange,
      defaultCountry = 'US',
      countries = COUNTRY_CODES,
      label,
      error,
      hint,
      placeholder = '555 123 4567',
      disabled = false,
      className,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [inner, setInner] = React.useState(defaultValue);
    const number = isControlled ? value! : inner;

    const [country, setCountry] = React.useState(
      () => countries.find((c) => c.code === defaultCountry) ?? countries[0]
    );
    const [open, setOpen] = React.useState(false);
    const inputId = React.useId();

    const updateNumber = (v: string) => {
      if (!isControlled) setInner(v);
      onChange?.(country.dial + v.replace(/\s/g, ''), country.dial, v);
    };

    const selectCountry = (c: CountryCode) => {
      setCountry(c);
      setOpen(false);
      onChange?.(c.dial + number.replace(/\s/g, ''), c.dial, number);
    };

    React.useEffect(() => {
      const close = () => setOpen(false);
      if (open) document.addEventListener('click', close);
      return () => document.removeEventListener('click', close);
    }, [open]);

    return (
      <div className={cn('font-sans flex flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-fx-black dark:text-fx-white">
            {label}
          </label>
        )}
        <div className={cn('flex border-2 rounded-[4px] overflow-visible', error ? 'border-fx-pink' : 'border-fx-black dark:border-fx-white')}>
          {/* Country selector */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => setOpen((o) => !o)}
              className={cn(
                'flex items-center gap-1.5 px-3 h-full text-sm font-bold',
                'border-r-2 border-fx-black dark:border-fx-white',
                'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800',
                'transition-colors focus:outline-none',
                disabled && 'opacity-50 cursor-not-allowed',
              )}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="text-xs text-gray-500">{country.dial}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cn('transition-transform', open && 'rotate-180')} aria-hidden="true">
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>

            {open && (
              <div className="absolute top-full left-0 mt-1 z-50 w-48 max-h-48 overflow-y-auto border-2 border-fx-black dark:border-fx-white rounded-[4px] bg-fx-white dark:bg-fx-black shadow-fx">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={c.code === country.code}
                    onClick={() => selectCountry(c)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
                      'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                      c.code === country.code && 'bg-fx-yellow dark:bg-fx-yellow text-fx-black font-bold',
                    )}
                  >
                    <span className="text-base">{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-xs text-gray-400">{c.dial}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Number input */}
          <input
            ref={ref}
            id={inputId}
            type="tel"
            value={number}
            onChange={(e) => updateNumber(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={!!error}
            className={cn(
              'flex-1 px-3 py-2 text-sm',
              'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
              'placeholder:text-gray-400 focus:outline-none',
            )}
          />
        </div>
        {error && <p className="text-xs text-fx-pink font-medium">{error}</p>}
        {!error && hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
export { PhoneInput };
export default PhoneInput;
