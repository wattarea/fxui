import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

export interface AutoCompleteOption {
  value: string;
  label: string;
  description?: string;
}

export interface AutoCompleteProps {
  options?: AutoCompleteOption[];
  onSearch?: (query: string) => void;
  onSelect?: (option: AutoCompleteOption) => void;
  loading?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  emptyText?: string;
  className?: string;
  id?: string;
}

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      options = [],
      onSearch,
      onSelect,
      loading = false,
      placeholder = 'Search…',
      value,
      defaultValue = '',
      onChange,
      disabled = false,
      error = false,
      emptyText = 'No results found',
      className,
      id,
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const controlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const currentValue = controlled ? value : internalValue;
    const showDropdown = open && (options.length > 0 || loading);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      if (!controlled) setInternalValue(v);
      onChange?.(v);
      onSearch?.(v);
      setOpen(true);
      setActiveIndex(-1);
    };

    const handleSelect = (option: AutoCompleteOption) => {
      if (!controlled) setInternalValue(option.label);
      onChange?.(option.label);
      onSelect?.(option);
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open) {
        if (e.key === 'ArrowDown' && options.length > 0) {
          setOpen(true);
        }
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        const opt = options[activeIndex];
        if (opt) handleSelect(opt);
      } else if (e.key === 'Escape') {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    return (
      <PopoverPrimitive.Root open={showDropdown} onOpenChange={setOpen}>
        <PopoverPrimitive.Anchor asChild>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              <SearchIcon />
            </div>
            <input
              ref={(el) => {
                (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
                if (typeof ref === 'function') ref(el);
                else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
              }}
              id={inputId}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showDropdown}
              aria-activedescendant={activeIndex >= 0 ? `ac-option-${activeIndex}` : undefined}
              value={currentValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (options.length > 0 || loading) setOpen(true); }}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete="off"
              className={cn(
                'w-full h-10 pl-9 pr-3 text-sm font-sans',
                'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
                'bg-fx-white dark:bg-fx-black',
                'text-fx-black dark:text-fx-white placeholder:text-gray-400',
                'outline-none focus:ring-2 focus:ring-fx-black dark:focus:ring-fx-white focus:ring-offset-1',
                'transition-shadow duration-150',
                error && 'border-fx-pink focus:ring-fx-pink',
                disabled && 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900',
                className,
              )}
            />
          </div>
        </PopoverPrimitive.Anchor>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
            style={{ width: 'var(--radix-popover-anchor-width)' }}
            className={cn(
              'z-50 overflow-hidden',
              'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx dark:shadow-fx-dark',
              'bg-fx-white dark:bg-fx-black p-1',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            )}
          >
            {loading ? (
              <div className="flex items-center gap-2 px-3 py-2.5 text-sm font-sans text-gray-400">
                <span className="inline-block h-3.5 w-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
                Searching…
              </div>
            ) : (
              <ul role="listbox" className="flex flex-col max-h-60 overflow-y-auto">
                {options.length === 0 ? (
                  <li className="px-3 py-2.5 text-sm font-sans text-gray-400">{emptyText}</li>
                ) : (
                  options.map((opt, i) => (
                    <li
                      key={opt.value}
                      id={`ac-option-${i}`}
                      role="option"
                      aria-selected={i === activeIndex}
                      onMouseDown={(e) => { e.preventDefault(); handleSelect(opt); }}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={cn(
                        'flex flex-col gap-0.5 px-3 py-2 rounded-[4px] cursor-pointer',
                        'transition-colors duration-75',
                        i === activeIndex
                          ? 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black'
                          : 'text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800',
                      )}
                    >
                      <span className="text-sm font-sans font-medium">{opt.label}</span>
                      {opt.description && (
                        <span className={cn(
                          'text-xs font-sans',
                          i === activeIndex ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400',
                        )}>
                          {opt.description}
                        </span>
                      )}
                    </li>
                  ))
                )}
              </ul>
            )}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }
);
AutoComplete.displayName = 'AutoComplete';
export { AutoComplete };
export default AutoComplete;
