import React from 'react';
import { cn } from '../../utils/cn';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  debounceMs?: number;
  clearable?: boolean;
  isLoading?: boolean;
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const Spinner = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin" aria-hidden="true">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, onChange, debounceMs, clearable = true, isLoading = false, value, defaultValue, ...props }, ref) => {
    const [inner, setInner] = React.useState(String(defaultValue ?? ''));
    const isControlled = value !== undefined;
    const current = isControlled ? String(value) : inner;

    const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      if (!isControlled) setInner(v);
      onChange?.(v);

      if (debounceMs !== undefined) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => onSearch?.(v), debounceMs);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        clearTimeout(timerRef.current);
        onSearch?.(current);
      }
      props.onKeyDown?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInner('');
      onChange?.('');
      onSearch?.('');
    };

    React.useEffect(() => () => clearTimeout(timerRef.current), []);

    return (
      <div className="relative w-full font-sans">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {isLoading ? <Spinner /> : <SearchIcon />}
        </span>
        <input
          ref={ref}
          type="search"
          value={current}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full pl-9 pr-9 py-2 text-sm',
            'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
            'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-fx-black dark:focus:ring-fx-white',
            'transition-shadow duration-150',
            '[&::-webkit-search-cancel-button]:hidden',
            className
          )}
          {...props}
        />
        {clearable && current && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-[4px] text-gray-400 hover:text-fx-black dark:hover:text-fx-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
export { SearchInput };
export default SearchInput;
