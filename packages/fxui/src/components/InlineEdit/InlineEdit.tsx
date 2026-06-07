import React from 'react';
import { cn } from '../../utils/cn';

export type InlineEditType = 'text' | 'number' | 'textarea';

export interface InlineEditProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  type?: InlineEditType;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  inputClassName?: string;
  emptyLabel?: string;
  rows?: number;
}

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const InlineEdit = React.forwardRef<HTMLDivElement, InlineEditProps>(
  (
    {
      value,
      defaultValue = '',
      onChange,
      onSave,
      onCancel,
      placeholder = 'Click to edit…',
      type = 'text',
      disabled = false,
      readOnly = false,
      className,
      inputClassName,
      emptyLabel = 'Click to edit…',
      rows = 3,
    },
    ref
  ) => {
    const controlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [draft, setDraft] = React.useState('');
    const [editing, setEditing] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null);

    const currentValue = controlled ? value : internalValue;

    const startEdit = () => {
      if (disabled || readOnly) return;
      setDraft(currentValue);
      setEditing(true);
      setTimeout(() => inputRef.current?.focus(), 0);
    };

    const save = () => {
      if (!controlled) setInternalValue(draft);
      onChange?.(draft);
      onSave?.(draft);
      setEditing(false);
    };

    const cancel = () => {
      setDraft(currentValue);
      setEditing(false);
      onCancel?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && type !== 'textarea') { e.preventDefault(); save(); }
      if (e.key === 'Enter' && type === 'textarea' && e.metaKey) save();
      if (e.key === 'Escape') cancel();
    };

    const baseInput = cn(
      'w-full font-sans text-sm px-2 py-1',
      'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
      'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
      'outline-none focus:ring-2 focus:ring-fx-black dark:focus:ring-fx-white focus:ring-offset-1',
      'placeholder:text-gray-400',
      inputClassName,
    );

    const iconBtn = cn(
      'flex items-center justify-center h-6 w-6',
      'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
      'transition-colors duration-100',
    );

    if (editing) {
      return (
        <div ref={ref} className={cn('flex flex-col gap-1.5', className)}>
          {type === 'textarea' ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={rows}
              className={cn(baseInput, 'resize-none leading-relaxed')}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={baseInput}
            />
          )}
          <div className="flex items-center gap-1.5">
            <button
              onClick={save}
              aria-label="Save"
              className={cn(iconBtn, 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black hover:opacity-80')}
            >
              <CheckIcon />
            </button>
            <button
              onClick={cancel}
              aria-label="Cancel"
              className={cn(iconBtn, 'bg-transparent text-fx-black dark:text-fx-white hover:bg-gray-100 dark:hover:bg-gray-800')}
            >
              <XIcon />
            </button>
            {type === 'textarea' && (
              <span className="text-[10px] font-mono text-gray-400">⌘ Enter to save · Esc to cancel</span>
            )}
            {type !== 'textarea' && (
              <span className="text-[10px] font-mono text-gray-400">Enter to save · Esc to cancel</span>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'group flex items-start gap-2',
          !disabled && !readOnly && 'cursor-pointer',
          className,
        )}
        onClick={startEdit}
        role={!disabled && !readOnly ? 'button' : undefined}
        tabIndex={!disabled && !readOnly ? 0 : undefined}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') startEdit(); }}
        aria-label={`Edit: ${currentValue || emptyLabel}`}
      >
        <span
          className={cn(
            'font-sans text-sm leading-relaxed flex-1 min-w-0',
            currentValue
              ? 'text-fx-black dark:text-fx-white'
              : 'text-gray-400 italic',
            !disabled && !readOnly && 'group-hover:underline decoration-dashed underline-offset-2',
          )}
        >
          {currentValue || emptyLabel}
        </span>
        {!disabled && !readOnly && (
          <span className="shrink-0 opacity-0 group-hover:opacity-60 transition-opacity duration-150 mt-0.5 text-fx-black dark:text-fx-white">
            <EditIcon />
          </span>
        )}
      </div>
    );
  }
);
InlineEdit.displayName = 'InlineEdit';
export { InlineEdit };
export default InlineEdit;
