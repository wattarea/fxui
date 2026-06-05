import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../utils/cn';

type Placement = 'left' | 'right' | 'top' | 'bottom';

const overlayClass = [
  'fixed inset-0 z-50 bg-fx-black/60 backdrop-blur-sm',
  'data-[state=open]:animate-in data-[state=open]:fade-in-0',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
].join(' ');

const contentBase = [
  'fixed z-50 bg-fx-white border-2 border-fx-black',
  'focus:outline-none overflow-y-auto',
  'dark:bg-fx-black dark:border-fx-white',
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
].join(' ');

const placementClasses: Record<Placement, string> = {
  right: 'inset-y-0 right-0 w-80 max-w-[90vw] shadow-[-4px_0px_0px_#0a0a0a] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right dark:shadow-[-4px_0px_0px_#fafafa]',
  left: 'inset-y-0 left-0 w-80 max-w-[90vw] shadow-[4px_0px_0px_#0a0a0a] data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left dark:shadow-[4px_0px_0px_#fafafa]',
  top: 'inset-x-0 top-0 h-auto max-h-[90vh] shadow-[0px_4px_0px_#0a0a0a] data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top dark:shadow-[0px_4px_0px_#fafafa]',
  bottom: 'inset-x-0 bottom-0 h-auto max-h-[90vh] shadow-[0px_-4px_0px_#0a0a0a] data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom dark:shadow-[0px_-4px_0px_#fafafa]',
};

export interface DrawerProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DrawerRoot = ({ children, open, onOpenChange }: DrawerProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    {children}
  </Dialog.Root>
);
DrawerRoot.displayName = 'Drawer';

const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Dialog.Trigger>
>(({ children, ...props }, ref) => (
  <Dialog.Trigger ref={ref} asChild {...props}>
    {children}
  </Dialog.Trigger>
));
DrawerTrigger.displayName = 'Drawer.Trigger';

export interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: Placement;
}

const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, placement = 'right', ...props }, ref) => (
    <Dialog.Portal>
      <Dialog.Overlay className={overlayClass} />
      <Dialog.Content
        ref={ref}
        className={cn(contentBase, placementClasses[placement], className)}
        {...props}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
);
DrawerContent.displayName = 'Drawer.Content';

const DrawerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between px-5 py-4 border-b-2 border-fx-black dark:border-fx-white',
        className
      )}
      {...props}
    >
      <Dialog.Title className="font-bold text-lg font-display dark:text-fx-white">
        {children}
      </Dialog.Title>
      <Dialog.Close
        className={cn(
          'h-8 w-8 flex items-center justify-center rounded-[4px]',
          'border-2 border-fx-black font-bold',
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
DrawerHeader.displayName = 'Drawer.Header';

const DrawerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-5 py-4 flex-1 dark:text-fx-white font-sans', className)}
      {...props}
    />
  )
);
DrawerBody.displayName = 'Drawer.Body';

const DrawerFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-5 py-4 border-t-2 border-fx-black dark:border-fx-white flex items-center justify-end gap-2',
        className
      )}
      {...props}
    />
  )
);
DrawerFooter.displayName = 'Drawer.Footer';

export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
});

export default Drawer;
