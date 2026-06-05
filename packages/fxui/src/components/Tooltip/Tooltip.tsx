import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delayDuration?: number;
}

const Tooltip = ({ children, content, placement = 'top', delayDuration = 300 }: TooltipProps) => (
  <RadixTooltip.Provider>
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={placement}
          sideOffset={6}
          className={cn(
            'z-50 px-3 py-1.5',
            'bg-fx-black text-fx-white text-sm font-medium font-sans',
            'border-2 border-fx-black rounded-[4px]',
            'shadow-fx-sm',
            'animate-in fade-in-0 zoom-in-95',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2',
            'data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2',
            'data-[side=top]:slide-in-from-bottom-2'
          )}
        >
          {content}
          <RadixTooltip.Arrow className="fill-fx-black" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
export default Tooltip;
