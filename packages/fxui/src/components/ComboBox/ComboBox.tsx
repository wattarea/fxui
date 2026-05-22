import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

export interface ComboBoxOption {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
}

export interface ComboBoxProps {
  options: ComboBoxOption[];
  value?: string | null;
  defaultValue?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  className?: string;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className={cn('transition-transform duration-150', open && 'rotate-180')}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ComboBox = React.forwardRef<HTMLButtonElement, ComboBoxProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select…',
      searchPlaceholder = 'Search…',
      clearable = false,
      disabled = false,
      invalid = false,
      label,
      hint,
      error,
      id,
      className,
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue ?? null);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const searchRef = React.useRef<HTMLInputElement>(null);
    const inputId = id ?? React.useId();

    const currentValue = isControlled ? value : internalValue;
    const selectedOption = options.find((o) => o.value === currentValue);

    const handleSelect = (optValue: string) => {
      const next = optValue === currentValue && clearable ? null : optValue;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
      setOpen(false);
      setSearch('');
    };

    const filtered = options.filter(
      (o) =>
        o.label.toLowerCase().includes(search.toLowerCase()) ||
        o.group?.toLowerCase().includes(search.toLowerCase())
    );

    const groups = filtered.reduce<Record<string, ComboBoxOption[]>>((acc, o) => {
      const g = o.group ?? '';
      if (!acc[g]) acc[g] = [];
      acc[g].push(o);
      return acc;
    }, {});

    React.useEffect(() => {
      if (open) setTimeout(() => searchRef.current?.focus(), 50);
      else setSearch('');
    }, [open]);

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
              aria-haspopup="listbox"
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
              <span className={selectedOption ? 'text-fx-black dark:text-fx-white font-medium' : 'text-gray-400'}>
                {selectedOption?.label ?? placeholder}
              </span>
              <ChevronIcon open={open} />
            </button>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              sideOffset={6}
              align="start"
              className={cn(
                'z-50 w-[var(--radix-popover-trigger-width)] min-w-[180px]',
                'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx',
                'bg-fx-white dark:bg-fx-black',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              )}
            >
              {/* Search */}
              <div className="p-2 border-b-2 border-fx-black dark:border-fx-white">
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent outline-none text-sm font-sans text-fx-black dark:text-fx-white placeholder:text-gray-400"
                />
              </div>

              {/* Options */}
              <ul role="listbox" className="max-h-60 overflow-y-auto py-1">
                {Object.keys(groups).length === 0 && (
                  <li className="px-3 py-2 text-sm text-gray-400 font-sans">No results</li>
                )}
                {Object.entries(groups).map(([group, items]) => (
                  <React.Fragment key={group}>
                    {group && (
                      <li className="px-3 pt-2 pb-1 text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans">
                        {group}
                      </li>
                    )}
                    {items.map((opt) => (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={opt.value === currentValue}
                        aria-disabled={opt.disabled}
                        onClick={() => !opt.disabled && handleSelect(opt.value)}
                        className={cn(
                          'flex items-center justify-between px-3 py-2 text-sm font-sans cursor-pointer',
                          'transition-colors duration-100',
                          opt.value === currentValue
                            ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black font-bold'
                            : 'text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
                          opt.disabled && 'opacity-40 cursor-not-allowed',
                        )}
                      >
                        <span>{opt.label}</span>
                        {opt.value === currentValue && <CheckIcon />}
                      </li>
                    ))}
                  </React.Fragment>
                ))}
              </ul>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {(hint) && !error && <p className="text-xs text-gray-400 font-sans">{hint}</p>}
        {error && <p className="text-xs text-[#FF1744] font-sans font-bold">{error}</p>}
      </div>
    );
  }
);

ComboBox.displayName = 'ComboBox';

export { ComboBox };
export default ComboBox;
