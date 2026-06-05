import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cn } from '../../utils/cn';

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const PopoverRoot = ({ children, open, onOpenChange, defaultOpen }: PopoverProps) => (
  <RadixPopover.Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
    {children}
  </RadixPopover.Root>
);
PopoverRoot.displayName = 'Popover';

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Trigger>
>(({ children, ...props }, ref) => (
  <RadixPopover.Trigger ref={ref} asChild {...props}>
    {children}
  </RadixPopover.Trigger>
));
PopoverTrigger.displayName = 'Popover.Trigger';

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixPopover.Content> {
  showArrow?: boolean;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  PopoverContentProps
>(({ className, children, showArrow = false, sideOffset = 6, ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] max-w-xs rounded-[4px] p-4',
        'bg-fx-white border-2 border-fx-black shadow-fx',
        'font-sans text-fx-black',
        'outline-none',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=top]:slide-in-from-bottom-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'dark:bg-fx-black dark:border-fx-white dark:text-fx-white dark:shadow-[4px_4px_0px_#fafafa]',
        className
      )}
      {...props}
    >
      {children}
      {showArrow && (
        <RadixPopover.Arrow className="fill-fx-black dark:fill-fx-white" />
      )}
    </RadixPopover.Content>
  </RadixPopover.Portal>
));
PopoverContent.displayName = 'Popover.Content';

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Close>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Close>
>(({ className, children, ...props }, ref) => (
  <RadixPopover.Close ref={ref} className={className} {...props}>
    {children}
  </RadixPopover.Close>
));
PopoverClose.displayName = 'Popover.Close';

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Close: PopoverClose,
});

export default Popover;
