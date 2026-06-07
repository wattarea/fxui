import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const collapsibleVariants = cva(
  ['border-2 border-fx-black dark:border-fx-white rounded-[4px] w-full overflow-hidden'],
  {
    variants: {
      variant: {
        default: '',
        filled:  'bg-gray-50 dark:bg-gray-900',
        ghost:   'border-0 rounded-none border-b-2',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface CollapsibleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof collapsibleVariants> {
  title: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
    className={cn('shrink-0 transition-transform duration-200', open && 'rotate-180')}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (
    {
      title,
      defaultOpen = false,
      open,
      onOpenChange,
      disabled = false,
      icon,
      actions,
      variant,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const controlled = open !== undefined;
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = controlled ? open : internalOpen;
    const triggerId = React.useId();
    const panelId = `${triggerId}-panel`;

    const toggle = () => {
      if (disabled) return;
      const next = !isOpen;
      if (!controlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    return (
      <div
        ref={ref}
        className={cn(collapsibleVariants({ variant }), className)}
        {...props}
      >
        {/* Trigger row */}
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            'flex w-full items-center gap-3 px-4 py-3',
            'text-left font-sans font-bold text-sm text-fx-black dark:text-fx-white',
            'transition-colors duration-150',
            !disabled && 'hover:bg-gray-50 dark:hover:bg-gray-900',
            disabled && 'opacity-50 cursor-not-allowed',
            isOpen && variant !== 'ghost' && 'border-b-2 border-fx-black dark:border-fx-white',
          )}
        >
          {icon && <span className="shrink-0 text-base" aria-hidden="true">{icon}</span>}
          <span className="flex-1 min-w-0">{title}</span>
          {actions && (
            <span
              className="shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {actions}
            </span>
          )}
          <ChevronIcon open={!!isOpen} />
        </button>

        {/* Animated content panel using CSS grid trick */}
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          style={{
            display: 'grid',
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 220ms ease',
          }}
        >
          <div className="overflow-hidden">
            <div className="px-4 py-3 font-sans text-sm text-fx-black dark:text-fx-white">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
Collapsible.displayName = 'Collapsible';
export { Collapsible };
export default Collapsible;
