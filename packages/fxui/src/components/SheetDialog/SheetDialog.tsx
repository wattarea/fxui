import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../utils/cn';

export type SheetSide = 'left' | 'right' | 'top' | 'bottom';

const sideConfig: Record<SheetSide, { base: string; open: string }> = {
  right: {
    base: 'right-0 top-0 h-full',
    open: 'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  },
  left: {
    base: 'left-0 top-0 h-full',
    open: 'data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  },
  top: {
    base: 'top-0 left-0 right-0',
    open: 'data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
  },
  bottom: {
    base: 'bottom-0 left-0 right-0',
    open: 'data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
  },
};

export interface SheetDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  side?: SheetSide;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizeMap: Record<string, string> = {
  sm: 'max-w-xs',
  md: 'max-w-sm',
  lg: 'max-w-md',
  xl: 'max-w-lg',
  full: 'w-full',
};

const SheetDialog = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  side = 'right',
  size = 'md',
  children,
  footer,
  className,
}: SheetDialogProps) => {
  const cfg = sideConfig[side];
  const isVertical = side === 'left' || side === 'right';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed z-50',
            'border-2 border-fx-black dark:border-fx-white',
            'bg-fx-white dark:bg-fx-black shadow-fx-xl',
            'flex flex-col',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:duration-200 data-[state=open]:duration-300',
            cfg.base,
            cfg.open,
            isVertical ? cn('w-full', sizeMap[size]) : 'max-h-[85vh]',
            className,
          )}
        >
          {/* Header */}
          {(title || description) && (
            <div className="flex items-start justify-between gap-3 p-6 border-b-2 border-fx-black dark:border-fx-white">
              <div>
                {title && (
                  <Dialog.Title className="text-xl font-black font-display text-fx-black dark:text-fx-white">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-sans">
                    {description}
                  </Dialog.Description>
                )}
              </div>
              <Dialog.Close
                className={cn(
                  'p-1.5 rounded-[4px] text-gray-400 hover:text-fx-black dark:hover:text-fx-white',
                  'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-fx-black',
                  'shrink-0',
                )}
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </Dialog.Close>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 font-sans">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t-2 border-fx-black dark:border-fx-white p-4 flex gap-3 justify-end">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

SheetDialog.displayName = 'SheetDialog';
export { SheetDialog };
export default SheetDialog;
