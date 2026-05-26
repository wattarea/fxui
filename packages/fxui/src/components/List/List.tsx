import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const listVariants = cva('font-sans flex flex-col', {
  variants: {
    variant: {
      bullet: 'gap-2',
      numbered: 'gap-2',
      none: 'gap-2',
      check: 'gap-2',
      neo: 'gap-0 border-2 border-fx-black dark:border-fx-white rounded-[4px] overflow-hidden',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: { variant: 'bullet', size: 'md' },
});

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
  description?: string;
}

export interface ListProps
  extends Omit<React.HTMLAttributes<HTMLUListElement | HTMLOListElement>, 'type'>,
    VariantProps<typeof listVariants> {
  items?: (string | ListItemProps)[];
  type?: 'ul' | 'ol';
}

const bulletFor = (variant: string | null | undefined, i: number) => {
  if (variant === 'numbered') return <span className="font-display font-black text-xs mr-1 shrink-0 w-5 text-center">{i + 1}.</span>;
  if (variant === 'check') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="7" className="fill-fx-green stroke-fx-black" strokeWidth="1.5" />
      <path d="M4.5 8l2.5 2.5 4-4" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (variant === 'bullet') return <span className="w-2 h-2 rounded-full bg-fx-black dark:bg-fx-white shrink-0 mt-2" aria-hidden="true" />;
  return null;
};

const List = React.forwardRef<HTMLElement, ListProps>(
  ({ className, variant, size, items, type = 'ul', children, ...props }, ref) => {
    const Tag = (type === 'ol' ? 'ol' : 'ul') as React.ElementType;

    return (
      <Tag
        ref={ref as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        className={cn(listVariants({ variant, size }), className)}
        {...props}
      >
        {items
          ? items.map((item, i) => {
              const isStr = typeof item === 'string';
              const label = isStr ? item : (item as ListItemProps).children as string;
              const desc = isStr ? undefined : (item as ListItemProps).description;
              const icon = isStr ? undefined : (item as ListItemProps).icon;

              return (
                <li
                  key={i}
                  className={cn(
                    variant === 'neo'
                      ? 'flex items-start gap-3 px-4 py-3 border-b-2 last:border-b-0 border-fx-black dark:border-fx-white'
                      : 'flex items-start gap-2.5',
                    'text-fx-black dark:text-fx-white',
                  )}
                >
                  {icon ?? bulletFor(variant, i)}
                  <span className="flex flex-col">
                    <span>{label}</span>
                    {desc && <span className="text-xs text-gray-400 mt-0.5">{desc}</span>}
                  </span>
                </li>
              );
            })
          : React.Children.map(children, (child, i) => (
              <li key={i} className={cn(
                variant === 'neo'
                  ? 'flex items-start gap-3 px-4 py-3 border-b-2 last:border-b-0 border-fx-black dark:border-fx-white'
                  : 'flex items-start gap-2.5 text-fx-black dark:text-fx-white',
              )}>
                {bulletFor(variant, i)}
                <span>{child}</span>
              </li>
            ))}
      </Tag>
    );
  }
);

List.displayName = 'List';
export { List, listVariants };
export default List;
