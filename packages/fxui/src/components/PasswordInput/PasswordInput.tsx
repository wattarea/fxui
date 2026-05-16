import React from 'react';
import { cn } from '../../utils/cn';

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  hint?: string;
}

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const inputId = id ?? React.useId();

    return (
      <div className="flex flex-col gap-1.5 w-full font-sans">
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-fx-black dark:text-fx-white">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={visible ? 'text' : 'password'}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={cn(
              'w-full px-3 py-2 pr-10 text-sm',
              'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
              'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-fx-black dark:focus:ring-fx-white',
              'transition-shadow duration-150',
              error && 'border-fx-pink focus:ring-fx-pink',
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2',
              'p-1 rounded-[4px] text-gray-400 hover:text-fx-black dark:hover:text-fx-white',
              'focus:outline-none focus:ring-1 focus:ring-fx-black',
              'transition-colors',
            )}
          >
            <EyeIcon open={visible} />
          </button>
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-fx-pink font-medium">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
export { PasswordInput };
export default PasswordInput;
