import React from 'react';
import { cn } from '../../utils/cn';

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onChange?: (files: File[]) => void;
  disabled?: boolean;
  label?: string;
  hint?: string;
  error?: string;
  value?: File[];
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      onChange,
      disabled = false,
      label,
      hint,
      error: errorProp,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>(value ?? []);
    const [dragging, setDragging] = React.useState(false);
    const [sizeError, setSizeError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const inputId = id ?? React.useId();
    const isControlled = value !== undefined;
    const currentFiles = isControlled ? value : files;

    const addFiles = (incoming: File[]) => {
      setSizeError(null);

      let valid = incoming;
      if (maxSize) {
        const oversized = incoming.filter((f) => f.size > maxSize);
        if (oversized.length) {
          setSizeError(`${oversized.map((f) => f.name).join(', ')} exceeds ${formatBytes(maxSize)}`);
          valid = incoming.filter((f) => f.size <= maxSize);
        }
      }

      const merged = multiple
        ? [...currentFiles, ...valid].slice(0, maxFiles ?? Infinity)
        : valid.slice(0, 1);

      if (!isControlled) setFiles(merged as File[]);
      onChange?.(merged as File[]);
    };

    const removeFile = (index: number) => {
      const next = currentFiles.filter((_, i) => i !== index);
      if (!isControlled) setFiles(next);
      onChange?.(next);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (disabled) return;
      addFiles(Array.from(e.dataTransfer.files));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) addFiles(Array.from(e.target.files));
      e.target.value = '';
    };

    const displayError = errorProp ?? sizeError;

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-fx-black dark:text-fx-white font-sans">
            {label}
          </label>
        )}

        {/* Drop zone */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="Upload files"
          className={cn(
            'flex flex-col items-center justify-center gap-3 p-8',
            'border-2 border-dashed rounded-[4px]',
            'transition-all duration-150 cursor-pointer',
            dragging
              ? 'border-fx-black bg-fx-yellow/20 shadow-fx dark:border-fx-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-fx-black dark:hover:border-fx-white hover:bg-gray-50 dark:hover:bg-gray-900',
            displayError ? 'border-[#FF1744]' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : '',
          )}
          onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
        >
          <span className="text-3xl" aria-hidden="true">{dragging ? '📂' : '📁'}</span>
          <div className="text-center">
            <p className="text-sm font-bold font-sans text-fx-black dark:text-fx-white">
              {dragging ? 'Drop files here' : 'Drag & drop or click to upload'}
            </p>
            {hint && <p className="text-xs text-gray-400 mt-1 font-sans">{hint}</p>}
            {maxSize && !hint && (
              <p className="text-xs text-gray-400 mt-1 font-sans">Max {formatBytes(maxSize)}</p>
            )}
          </div>
        </div>

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="sr-only"
          aria-hidden="true"
        />

        {displayError && (
          <p className="text-xs text-[#FF1744] font-sans font-bold">{displayError}</p>
        )}

        {/* File list */}
        {currentFiles.length > 0 && (
          <ul className="flex flex-col gap-2 mt-1">
            {currentFiles.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className={cn(
                  'flex items-center justify-between gap-3 px-3 py-2',
                  'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
                  'bg-fx-white dark:bg-fx-black',
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0" aria-hidden="true">📄</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold font-sans text-fx-black dark:text-fx-white truncate">{file.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{formatBytes(file.size)}</p>
                  </div>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${file.name}`}
                    className="shrink-0 text-gray-400 hover:text-[#FF1744] transition-colors text-sm font-bold"
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };
export default FileUpload;
