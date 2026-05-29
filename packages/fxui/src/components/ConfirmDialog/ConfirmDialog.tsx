import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { cn } from '../../utils/cn';

export interface ConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  destructive?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false,
  isLoading = false,
  children,
}: ConfirmDialogProps) => (
  <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
    {trigger && <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>}
    {children}

    <AlertDialog.Portal>
      <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <AlertDialog.Content
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
          'w-full max-w-md',
          'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
          'bg-fx-white dark:bg-fx-black shadow-fx-xl',
          'p-6 font-sans',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        )}
      >
        {/* Warning icon for destructive */}
        {destructive && (
          <div className="w-12 h-12 rounded-full bg-fx-pink border-2 border-fx-black flex items-center justify-center mb-4 shadow-fx-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        )}

        <AlertDialog.Title className="text-xl font-black font-display text-fx-black dark:text-fx-white mb-2">
          {title}
        </AlertDialog.Title>

        {description && (
          <AlertDialog.Description className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            {description}
          </AlertDialog.Description>
        )}

        <div className="flex gap-3 justify-end mt-6">
          <AlertDialog.Cancel asChild>
            <button
              type="button"
              onClick={onCancel}
              className={cn(
                'px-4 py-2 text-sm font-bold rounded-[4px]',
                'border-2 border-fx-black dark:border-fx-white',
                'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
                'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-fx-black',
              )}
            >
              {cancelLabel}
            </button>
          </AlertDialog.Cancel>

          <AlertDialog.Action asChild>
            <button
              type="button"
              disabled={isLoading}
              onClick={onConfirm}
              className={cn(
                'px-4 py-2 text-sm font-bold rounded-[4px]',
                'border-2 border-fx-black',
                'shadow-fx hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px]',
                'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
                'transition-all duration-150',
                'focus:outline-none focus:ring-2 focus:ring-fx-black',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
                destructive
                  ? 'bg-fx-pink text-fx-white'
                  : 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black',
              )}
            >
              {isLoading ? 'Loading...' : confirmLabel}
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

ConfirmDialog.displayName = 'ConfirmDialog';
export { ConfirmDialog };
export default ConfirmDialog;
