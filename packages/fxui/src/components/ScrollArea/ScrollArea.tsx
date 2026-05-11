import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cn } from '../../utils/cn';

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal' | 'both';
  scrollbarSize?: number;
  type?: 'auto' | 'always' | 'scroll' | 'hover';
  maxHeight?: string | number;
  maxWidth?: string | number;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      className,
      orientation = 'vertical',
      scrollbarSize = 8,
      type = 'hover',
      maxHeight,
      maxWidth,
      style,
      children,
      ...props
    },
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      type={type}
      style={{
        maxHeight: maxHeight ?? (orientation !== 'horizontal' ? '100%' : undefined),
        maxWidth: maxWidth ?? (orientation === 'horizontal' ? '100%' : undefined),
        ...style,
      }}
      className={cn('overflow-hidden', className)}
      {...(props as React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>)}
    >
      <ScrollAreaPrimitive.Viewport ref={ref} className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>

      {(orientation === 'vertical' || orientation === 'both') && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          style={{ width: scrollbarSize }}
          className="flex touch-none select-none transition-all duration-150 ease-out data-[state=hidden]:opacity-0 p-0.5"
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-fx-black/30 dark:bg-fx-white/30 hover:bg-fx-black/60 dark:hover:bg-fx-white/60 transition-colors duration-100" />
        </ScrollAreaPrimitive.Scrollbar>
      )}

      {(orientation === 'horizontal' || orientation === 'both') && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="horizontal"
          style={{ height: scrollbarSize }}
          className="flex touch-none select-none flex-col transition-all duration-150 ease-out data-[state=hidden]:opacity-0 p-0.5"
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-fx-black/30 dark:bg-fx-white/30 hover:bg-fx-black/60 dark:hover:bg-fx-white/60 transition-colors duration-100" />
        </ScrollAreaPrimitive.Scrollbar>
      )}

      {orientation === 'both' && <ScrollAreaPrimitive.Corner />}
    </ScrollAreaPrimitive.Root>
  )
);

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
export default ScrollArea;
