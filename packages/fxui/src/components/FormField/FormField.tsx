import React from 'react';
import { cn } from '../../utils/cn';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, hint, error, required, htmlFor, className, children, ...props }, ref) => {
    const id = htmlFor ?? React.useId();
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5 w-full', className)} {...props}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-bold font-sans text-fx-black dark:text-fx-white leading-none select-none"
          >
            {label}
            {required && (
              <span className="text-fx-pink ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}

        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            id: (child as React.ReactElement<Record<string, unknown>>).props.id ?? id,
            'aria-describedby': cn(
              error && errorId,
              hint && !error && hintId,
            ) || undefined,
            'aria-invalid': error ? 'true' : undefined,
          });
        })}

        {error ? (
          <p id={errorId} className="text-xs font-sans font-medium text-fx-pink flex items-center gap-1" role="alert">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs font-sans text-gray-400 dark:text-gray-500">{hint}</p>
        ) : null}
      </div>
    );
  }
);
FormField.displayName = 'FormField';
export { FormField };
export default FormField;
