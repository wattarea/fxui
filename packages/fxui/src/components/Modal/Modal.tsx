import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../utils/cn';

export interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ModalRoot = ({ children, open, onOpenChange }: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    {children}
  </Dialog.Root>
);
ModalRoot.displayName = 'Modal';

const ModalTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Trigger>
>(({ children, ...props }, ref) => (
  <Dialog.Trigger ref={ref} asChild {...props}>
    {children}
  </Dialog.Trigger>
));
ModalTrigger.displayName = 'Modal.Trigger';

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  full: 'max-w-[95vw]',
};

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, size = 'md', ...props }, ref) => (
    <Dialog.Portal>
      <Dialog.Overlay
        className={cn(
          'fixed inset-0 z-50 bg-fx-black/60 backdrop-blur-sm',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
        )}
      />
      <Dialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'w-full bg-fx-white rounded-[4px]',
          'border-2 border-fx-black shadow-fx-xl',
          'focus:outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          'dark:bg-fx-black dark:border-fx-white dark:shadow-[8px_8px_0px_#fafafa]',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
);
ModalContent.displayName = 'Modal.Content';

const ModalHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between px-6 py-4 border-b-2 border-fx-black',
        'dark:border-fx-white',
        className
      )}
      {...props}
    >
      <Dialog.Title className="font-bold text-xl font-display dark:text-fx-white">
        {children}
      </Dialog.Title>
      <Dialog.Close
        className={cn(
          'h-8 w-8 flex items-center justify-center rounded-[4px]',
          'border-2 border-fx-black font-bold text-lg',
          'hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[2px]',
          'active:shadow-none active:translate-x-[4px] active:translate-y-[4px]',
          'transition-all duration-150',
          'dark:border-fx-white dark:text-fx-white'
        )}
        aria-label="Close"
      >
        ✕
      </Dialog.Close>
    </div>
  )
);
ModalHeader.displayName = 'Modal.Header';

const ModalBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4 dark:text-fx-white', className)}
      {...props}
    />
  )
);
ModalBody.displayName = 'Modal.Body';

const ModalFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-6 py-4 border-t-2 border-fx-black flex items-center justify-end gap-2',
        'dark:border-fx-white',
        className
      )}
      {...props}
    />
  )
);
ModalFooter.displayName = 'Modal.Footer';

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});

export default Modal;
