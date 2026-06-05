import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

export interface PopconfirmProps {
  title: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger' | 'warning';
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  disabled?: boolean;
}

const variantIcon: Record<string, string> = {
  default: '❓',
  danger:  '⚠️',
  warning: '⚡',
};

const confirmBtnClass: Record<string, string> = {
  default: 'bg-fx-black text-fx-white dark:bg-fx-white dark:text-fx-black border-fx-black dark:border-fx-white',
  danger:  'bg-fx-pink   text-fx-white border-fx-pink',
  warning: 'bg-fx-yellow text-fx-black border-fx-yellow',
};

const Popconfirm = React.forwardRef<HTMLDivElement, PopconfirmProps>(
  (
    {
      title,
      description,
      onConfirm,
      onCancel,
      confirmText = 'Confirm',
      cancelText  = 'Cancel',
      variant = 'default',
      trigger,
      open,
      onOpenChange,
      side    = 'top',
      align   = 'center',
      disabled = false,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const controlled = open !== undefined;
    const isOpen = controlled ? open : internalOpen;

    const handleOpenChange = (v: boolean) => {
      if (!controlled) setInternalOpen(v);
      onOpenChange?.(v);
    };

    const handleConfirm = () => {
      handleOpenChange(false);
      onConfirm?.();
    };

    const handleCancel = () => {
      handleOpenChange(false);
      onCancel?.();
    };

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={disabled ? undefined : handleOpenChange}>
        <PopoverPrimitive.Trigger asChild>
          {trigger as React.ReactElement}
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={8}
            className={cn(
              'z-50 w-64',
              'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx dark:shadow-fx-dark',
              'bg-fx-white dark:bg-fx-black p-4',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            )}
          >
            <div className="flex items-start gap-2 mb-3">
              <span className="text-base leading-none mt-0.5" aria-hidden="true">
                {variantIcon[variant]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold font-sans text-fx-black dark:text-fx-white leading-snug">
                  {title}
                </p>
                {description && (
                  <p className="text-xs font-sans text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={handleCancel}
                className={cn(
                  'px-3 py-1.5 text-xs font-bold font-sans',
                  'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
                  'bg-transparent text-fx-black dark:text-fx-white',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
                  'transition-colors duration-100',
                )}
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className={cn(
                  'px-3 py-1.5 text-xs font-bold font-sans',
                  'border-2 rounded-[4px]',
                  'shadow-[2px_2px_0_0] shadow-fx-black dark:shadow-fx-white',
                  'hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]',
                  'transition-all duration-100',
                  confirmBtnClass[variant],
                )}
              >
                {confirmText}
              </button>
            </div>

            <PopoverPrimitive.Arrow
              className="fill-fx-black dark:fill-fx-white"
              width={12}
              height={6}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }
);
Popconfirm.displayName = 'Popconfirm';
export { Popconfirm };
export default Popconfirm;
