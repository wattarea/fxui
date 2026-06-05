import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../utils/cn';

// ─── Shared styles ─────────────────────────────────────────────────────────

const contentClass = cn(
  'z-50 min-w-[180px] overflow-hidden',
  'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx',
  'bg-fx-white dark:bg-fx-black p-1',
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
);

const itemClass = cn(
  'relative flex cursor-pointer select-none items-center gap-2',
  'rounded-[4px] px-3 py-2 text-sm font-sans font-medium outline-none',
  'transition-colors duration-100',
  'data-[highlighted]:bg-fx-black data-[highlighted]:text-fx-white',
  'dark:data-[highlighted]:bg-fx-white dark:data-[highlighted]:text-fx-black',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
  'text-fx-black dark:text-fx-white',
);

// ─── Primitives ────────────────────────────────────────────────────────────

const ContextMenuRoot = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content ref={ref} className={cn(contentClass, className)} {...props} />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = 'ContextMenu.Content';

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger ref={ref} className={cn(itemClass, 'justify-between', className)} {...props}>
    {children}
    <span aria-hidden="true" className="opacity-60">›</span>
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = 'ContextMenu.SubTrigger';

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.SubContent ref={ref} className={cn(contentClass, className)} {...props} />
  </ContextMenuPrimitive.Portal>
));
ContextMenuSubContent.displayName = 'ContextMenu.SubContent';

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    icon?: React.ReactNode;
    shortcut?: string;
    destructive?: boolean;
  }
>(({ className, icon, shortcut, destructive, children, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(itemClass, destructive && 'text-[#FF1744] data-[highlighted]:bg-[#FF1744] data-[highlighted]:text-white', className)}
    {...props}
  >
    {icon && <span className="shrink-0 opacity-70" aria-hidden="true">{icon}</span>}
    <span className="flex-1">{children}</span>
    {shortcut && <span className="ml-auto text-xs opacity-50 font-mono tracking-wide">{shortcut}</span>}
  </ContextMenuPrimitive.Item>
));
ContextMenuItem.displayName = 'ContextMenu.Item';

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(itemClass, 'pl-8', className)}
    {...props}
  >
    <span className="absolute left-3 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <span className="text-xs font-black">✓</span>
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = 'ContextMenu.CheckboxItem';

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn('px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans', className)}
    {...props}
  />
));
ContextMenuLabel.displayName = 'ContextMenu.Label';

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-[2px] bg-fx-black/10 dark:bg-fx-white/10', className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = 'ContextMenu.Separator';

// ─── Named export ──────────────────────────────────────────────────────────

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  Label: ContextMenuLabel,
  Separator: ContextMenuSeparator,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
});

export default ContextMenu;
