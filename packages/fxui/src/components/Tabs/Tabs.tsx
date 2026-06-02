import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const tabsListVariants = cva('flex', {
  variants: {
    variant: {
      default: 'border-b-2 border-fx-black dark:border-fx-white gap-0',
      boxed: 'border-2 border-fx-black dark:border-fx-white rounded-[4px] p-1 gap-1 bg-gray-100 dark:bg-gray-800 inline-flex',
      pills: 'gap-2',
    },
  },
  defaultVariants: { variant: 'default' },
});

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center font-bold font-sans text-sm',
    'transition-all duration-150 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'dark:focus-visible:ring-fx-white',
  ],
  {
    variants: {
      variant: {
        default: [
          'px-4 py-2 -mb-[2px] border-b-2 border-transparent text-gray-500',
          'hover:text-fx-black hover:border-gray-300',
          'data-[state=active]:border-fx-black data-[state=active]:text-fx-black',
          'dark:text-gray-400 dark:hover:text-fx-white dark:data-[state=active]:border-fx-white dark:data-[state=active]:text-fx-white',
        ],
        boxed: [
          'px-3 py-1.5 rounded-[4px] text-gray-500',
          'hover:text-fx-black hover:bg-fx-white',
          'data-[state=active]:bg-fx-black data-[state=active]:text-fx-white data-[state=active]:shadow-fx-sm',
          'dark:hover:text-fx-white dark:hover:bg-gray-700',
          'dark:data-[state=active]:bg-fx-white dark:data-[state=active]:text-fx-black',
        ],
        pills: [
          'px-4 py-2 rounded-[4px] border-2 border-transparent text-gray-500',
          'hover:border-fx-black hover:text-fx-black',
          'data-[state=active]:border-fx-black data-[state=active]:bg-fx-black data-[state=active]:text-fx-white data-[state=active]:shadow-fx-sm data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px]',
          'dark:hover:border-fx-white dark:hover:text-fx-white',
          'dark:data-[state=active]:border-fx-white dark:data-[state=active]:bg-fx-white dark:data-[state=active]:text-fx-black',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

type TabsVariant = 'default' | 'boxed' | 'pills';

interface TabsContextValue { variant: TabsVariant }
const TabsContext = React.createContext<TabsContextValue>({ variant: 'default' });

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof RadixTabs.Root> {
  variant?: TabsVariant;
}

const TabsRoot = React.forwardRef<React.ElementRef<typeof RadixTabs.Root>, TabsProps>(
  ({ className, variant = 'default', children, ...props }, ref) => (
    <TabsContext.Provider value={{ variant }}>
      <RadixTabs.Root ref={ref} className={cn('w-full', className)} {...props}>
        {children}
      </RadixTabs.Root>
    </TabsContext.Provider>
  )
);
TabsRoot.displayName = 'Tabs';

const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <RadixTabs.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsList.displayName = 'Tabs.List';

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(TabsContext);
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'Tabs.Trigger';

const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn(
      'mt-4 focus-visible:outline-none',
      'animate-in fade-in-0',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'Tabs.Content';

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export default Tabs;
