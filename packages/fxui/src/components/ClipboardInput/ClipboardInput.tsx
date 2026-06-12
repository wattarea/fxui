import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const clipboardInputVariants = cva(
  [
    'flex items-stretch w-full',
    'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
    'overflow-hidden bg-fx-white dark:bg-fx-black',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: { size: 'md' },
  }
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export interface ClipboardInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue'>,
    VariantProps<typeof clipboardInputVariants> {
  value: string;
  label?: string;
  masked?: boolean;
  prefix?: React.ReactNode;
  successDuration?: number;
  onCopied?: (value: string) => void;
  wrapperClassName?: string;
}

const ClipboardInput = React.forwardRef<HTMLInputElement, ClipboardInputProps>(
  (
    {
      value,
      label,
      masked = false,
      prefix,
      size,
      successDuration = 2000,
      onCopied,
      wrapperClassName,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopied?.(value);
        setTimeout(() => setCopied(false), successDuration);
      } catch {
        // fallback
        const el = document.createElement('textarea');
        el.value = value;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), successDuration);
      }
    };

    const isPassword = masked && !visible;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-bold font-sans text-fx-black dark:text-fx-white leading-none">
            {label}
          </label>
        )}

        <div className={cn(clipboardInputVariants({ size }), wrapperClassName)}>
          {prefix && (
            <span className="flex items-center px-3 bg-gray-100 dark:bg-gray-800 border-r-2 border-fx-black dark:border-fx-white text-fx-black dark:text-fx-white font-sans font-medium select-none shrink-0">
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            readOnly
            value={value}
            type={isPassword ? 'password' : 'text'}
            className={cn(
              'flex-1 min-w-0 px-3 bg-transparent outline-none',
              'font-mono text-fx-black dark:text-fx-white',
              'select-all cursor-default',
              className,
            )}
            onFocus={(e) => e.target.select()}
            {...props}
          />

          {masked && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? 'Hide value' : 'Show value'}
              className="flex items-center justify-center px-2.5 border-l-2 border-fx-black dark:border-fx-white text-gray-400 hover:text-fx-black dark:hover:text-fx-white transition-colors shrink-0"
            >
              {visible ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
            className={cn(
              'flex items-center justify-center gap-1.5 px-3 shrink-0',
              'border-l-2 border-fx-black dark:border-fx-white',
              'font-sans font-bold text-xs',
              'transition-colors duration-150',
              copied
                ? 'bg-fx-green text-fx-black'
                : 'text-gray-400 hover:text-fx-black dark:hover:text-fx-white hover:bg-gray-50 dark:hover:bg-gray-900',
            )}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    );
  }
);
ClipboardInput.displayName = 'ClipboardInput';
export { ClipboardInput };
export default ClipboardInput;
