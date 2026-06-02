import React from 'react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator = '/', className, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn('font-sans', className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-bold text-sm text-fx-black dark:text-fx-white"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? '#'}
                  onClick={item.onClick}
                  className={cn(
                    'text-sm font-medium text-gray-500 dark:text-gray-400',
                    'border-b-2 border-transparent',
                    'hover:text-fx-black hover:border-fx-black',
                    'dark:hover:text-fx-white dark:hover:border-fx-white',
                    'transition-all duration-150'
                  )}
                >
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="text-gray-400 dark:text-gray-500 text-sm font-bold select-none"
                >
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  )
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
export default Breadcrumb;
