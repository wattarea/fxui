import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const accordionVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'border-2 border-fx-black rounded-[4px] overflow-hidden dark:border-fx-white',
      separated: 'flex flex-col gap-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type SingleProps = {
  type: 'single';
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
};

type MultipleProps = {
  type: 'multiple';
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

type AccordionBaseProps = {
  className?: string;
  children?: React.ReactNode;
  dir?: 'ltr' | 'rtl';
  orientation?: 'horizontal' | 'vertical';
};

export type AccordionProps = (SingleProps | MultipleProps) &
  AccordionBaseProps &
  VariantProps<typeof accordionVariants>;

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, variant, ...props }, ref) => (
    <RadixAccordion.Root
      ref={ref}
      className={cn(accordionVariants({ variant }), className)}
      {...(props as React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>)}
    />
  )
);
AccordionRoot.displayName = 'Accordion';

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Item> {
  variant?: 'default' | 'separated';
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  AccordionItemProps
>(({ className, variant, ...props }, ref) => (
  <RadixAccordion.Item
    ref={ref}
    className={cn(
      variant === 'separated' && [
        'border-2 border-fx-black rounded-[4px] overflow-hidden',
        'dark:border-fx-white',
      ],
      '[&+&]:border-t-2 [&+&]:border-fx-black dark:[&+&]:border-fx-white',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'Accordion.Item';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between px-4 py-3',
        'font-bold text-left font-sans',
        'text-fx-black dark:text-fx-white',
        'bg-fx-white dark:bg-fx-black',
        'hover:bg-gray-50 dark:hover:bg-gray-900',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fx-black focus-visible:ring-inset',
        '[&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-200"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = 'Accordion.Trigger';

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm',
      'border-t-2 border-fx-black dark:border-fx-white',
      className
    )}
    {...props}
  >
    <div className="px-4 py-3 text-fx-black dark:text-fx-white font-sans">
      {children}
    </div>
  </RadixAccordion.Content>
));
AccordionContent.displayName = 'Accordion.Content';

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export default Accordion;
