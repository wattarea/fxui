import React from 'react';
import * as RadixHoverCard from '@radix-ui/react-hover-card';
import { cn } from '../../utils/cn';

export interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  openDelay?: number;
  closeDelay?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const HoverCard = ({
  trigger,
  children,
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  openDelay = 300,
  closeDelay = 150,
  open,
  onOpenChange,
  className,
}: HoverCardProps) => (
  <RadixHoverCard.Root
    open={open}
    onOpenChange={onOpenChange}
    openDelay={openDelay}
    closeDelay={closeDelay}
  >
    <RadixHoverCard.Trigger asChild>{trigger}</RadixHoverCard.Trigger>
    <RadixHoverCard.Portal>
      <RadixHoverCard.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 rounded-[4px] border-2 border-fx-black dark:border-fx-white',
          'bg-fx-white dark:bg-fx-black shadow-fx',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
      >
        {children}
        <RadixHoverCard.Arrow className="fill-fx-black dark:fill-fx-white" width={12} height={6} />
      </RadixHoverCard.Content>
    </RadixHoverCard.Portal>
  </RadixHoverCard.Root>
);

HoverCard.displayName = 'HoverCard';
export { HoverCard };
export default HoverCard;
