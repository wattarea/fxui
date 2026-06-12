import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const copyButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5',
    'font-sans font-bold border-2 rounded-[4px]',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black focus-visible:ring-offset-1',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-fx-white text-fx-black border-fx-black shadow-fx',
          'hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px]',
          'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
          'dark:bg-fx-black dark:text-fx-white dark:border-fx-white dark:shadow-[4px_4px_0px_#fafafa]',
        ],
        ghost: [
          'bg-transparent text-fx-black border-transparent shadow-none',
          'hover:bg-gray-100 dark:text-fx-white dark:hover:bg-gray-800',
        ],
        icon: [
          'bg-fx-white text-fx-black border-fx-black shadow-fx-sm',
          'hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]',
          'dark:bg-fx-black dark:text-fx-white dark:border-fx-white',
        ],
      },
      size: {
        sm: 'h-7 px-2 text-xs',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-4 text-base',
        icon: 'h-8 w-8 p-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onCopy'>,
    VariantProps<typeof copyButtonVariants> {
  value: string;
  timeout?: number;
  label?: string;
  copiedLabel?: string;
  iconOnly?: boolean;
  onCopy?: (value: string) => void;
}

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      className,
      variant,
      size,
      value,
      timeout = 2000,
      label = 'Copy',
      copiedLabel = 'Copied!',
      iconOnly = false,
      onCopy,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy?.(value);
        setTimeout(() => setCopied(false), timeout);
      } catch {
        // clipboard not available (e.g., non-secure context)
      }
    };

    const effectiveSize = iconOnly ? 'icon' : size;
    const effectiveVariant = iconOnly ? 'icon' : variant;

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleCopy}
        aria-label={copied ? copiedLabel : label}
        className={cn(copyButtonVariants({ variant: effectiveVariant, size: effectiveSize }), className)}
        {...props}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {!iconOnly && <span>{copied ? copiedLabel : label}</span>}
      </button>
    );
  }
);

CopyButton.displayName = 'CopyButton';

export { CopyButton, copyButtonVariants };
export default CopyButton;
