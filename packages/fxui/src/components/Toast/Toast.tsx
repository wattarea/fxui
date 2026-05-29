import React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const toastVariants = cva(
  [
    'relative flex items-start gap-3 w-full max-w-sm p-4 rounded-[4px]',
    'border-2 border-fx-black shadow-fx',
    'font-sans',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-4',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-4',
    'dark:border-fx-white',
  ],
  {
    variants: {
      variant: {
        default: 'bg-fx-white text-fx-black dark:bg-fx-black dark:text-fx-white',
        success: 'bg-fx-green text-fx-black border-fx-black',
        error: 'bg-[#FF1744] text-white border-fx-black',
        warning: 'bg-fx-yellow text-fx-black border-fx-black',
        info: 'bg-fx-blue text-white border-fx-black',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue>({
  toast: () => {},
  dismiss: () => {},
});

export function useToast() {
  return React.useContext(ToastContext);
}

const icons: Record<NonNullable<ToastData['variant']>, string> = {
  default: '●',
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<(ToastData & { open: boolean })[]>([]);

  const toast = React.useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...data, id, open: true }]);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, open: false } : t)));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      <RadixToast.Provider swipeDirection="right" duration={4000}>
        {children}
        {toasts.map((t) => (
          <RadixToast.Root
            key={t.id}
            open={t.open}
            duration={t.duration ?? 4000}
            onOpenChange={(open) => {
              if (!open) setToasts((prev) => prev.filter((x) => x.id !== t.id));
            }}
            className={cn(toastVariants({ variant: t.variant }))}
          >
            <span className="text-lg font-black shrink-0 mt-0.5" aria-hidden="true">
              {icons[t.variant ?? 'default']}
            </span>
            <div className="flex-1 min-w-0">
              {t.title && (
                <RadixToast.Title className="font-bold text-sm leading-snug">
                  {t.title}
                </RadixToast.Title>
              )}
              {t.description && (
                <RadixToast.Description className="text-sm opacity-80 mt-0.5">
                  {t.description}
                </RadixToast.Description>
              )}
              {t.action && (
                <RadixToast.Action
                  altText={t.action.label}
                  onClick={t.action.onClick}
                  className="mt-2 text-xs font-bold underline underline-offset-2 cursor-pointer hover:opacity-70"
                >
                  {t.action.label}
                </RadixToast.Action>
              )}
            </div>
            <RadixToast.Close
              onClick={() => dismiss(t.id)}
              className="shrink-0 opacity-50 hover:opacity-100 transition-opacity font-bold"
              aria-label="Close"
            >
              ✕
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm outline-none" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

export type { VariantProps };
