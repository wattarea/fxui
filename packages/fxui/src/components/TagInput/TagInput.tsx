import React from 'react';
import { cn } from '../../utils/cn';

export interface TagInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  max?: number;
  separator?: string | string[];
  validate?: (tag: string) => boolean;
  disabled?: boolean;
  invalid?: boolean;
  label?: string;
  hint?: string;
  error?: string;
}

const TagInput = React.forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      className,
      value,
      defaultValue = [],
      onChange,
      placeholder = 'Add tag…',
      max,
      separator = ['Enter', ','],
      validate,
      disabled = false,
      invalid = false,
      label,
      hint,
      error,
      id,
      ...props
    },
    ref
  ) => {
    const [internalTags, setInternalTags] = React.useState<string[]>(defaultValue);
    const [input, setInput] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;
    const tags = isControlled ? value : internalTags;
    const separators = Array.isArray(separator) ? separator : [separator];
    const inputId = id ?? React.useId();

    const addTag = (raw: string) => {
      const tag = raw.trim();
      if (!tag || tags.includes(tag)) return;
      if (validate && !validate(tag)) return;
      if (max !== undefined && tags.length >= max) return;
      const next = [...tags, tag];
      if (!isControlled) setInternalTags(next);
      onChange?.(next);
    };

    const removeTag = (index: number) => {
      const next = tags.filter((_, i) => i !== index);
      if (!isControlled) setInternalTags(next);
      onChange?.(next);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (separators.includes(e.key)) {
        e.preventDefault();
        addTag(input);
        setInput('');
      } else if (e.key === 'Backspace' && !input && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    };

    const handleBlur = () => {
      if (input.trim()) {
        addTag(input);
        setInput('');
      }
    };

    const isAtMax = max !== undefined && tags.length >= max;

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-fx-black dark:text-fx-white font-sans">
            {label}
          </label>
        )}

        <div
          className={cn(
            'flex flex-wrap gap-1.5 p-2 min-h-[42px]',
            'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
            'bg-fx-white dark:bg-fx-black',
            'cursor-text transition-colors',
            invalid || error ? 'border-[#FF1744]' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : 'focus-within:shadow-fx',
          )}
          onClick={() => !disabled && inputRef.current?.focus()}
        >
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black border-2 border-fx-black dark:border-fx-white rounded-[4px] text-xs font-bold font-sans"
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeTag(i); }}
                  aria-label={`Remove ${tag}`}
                  className="opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none"
                >
                  ✕
                </button>
              )}
            </span>
          ))}

          {!isAtMax && (
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={tags.length === 0 ? placeholder : ''}
              disabled={disabled}
              className="flex-1 min-w-[100px] bg-transparent outline-none text-sm font-sans text-fx-black dark:text-fx-white placeholder:text-gray-400"
              aria-label={label ?? placeholder}
            />
          )}
        </div>

        {(hint || max) && !error && (
          <p className="text-xs text-gray-400 font-sans">
            {hint}
            {max && <span className="ml-1">({tags.length}/{max})</span>}
          </p>
        )}
        {error && <p className="text-xs text-[#FF1744] font-sans font-bold">{error}</p>}
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';

export { TagInput };
export default TagInput;
