import React from 'react';
import { cn } from '../../utils/cn';

export interface DataListItem {
  label: string;
  value: React.ReactNode;
  copyable?: boolean;
}

export interface DataListProps {
  items: DataListItem[];
  orientation?: 'horizontal' | 'vertical';
  striped?: boolean;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const paddingMap = { sm: 'py-1.5 px-3', md: 'py-2.5 px-4', lg: 'py-3.5 px-5' };
const textMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

const DataList = React.forwardRef<HTMLDListElement, DataListProps>(
  ({ items, orientation = 'horizontal', striped = false, bordered = true, size = 'md', className }, ref) => (
    <dl
      ref={ref}
      className={cn(
        'font-sans',
        bordered && 'border-2 border-fx-black dark:border-fx-white rounded-[4px] overflow-hidden',
        className,
      )}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            'flex gap-4',
            orientation === 'horizontal' ? 'flex-row items-baseline' : 'flex-col gap-0.5',
            paddingMap[size],
            i < items.length - 1 && 'border-b-2 border-fx-black dark:border-fx-white',
            striped && i % 2 === 0 && 'bg-gray-50 dark:bg-gray-900',
          )}
        >
          <dt className={cn('font-bold text-fx-black dark:text-fx-white shrink-0', textMap[size],
            orientation === 'horizontal' && 'w-1/3')}>
            {item.label}
          </dt>
          <dd className={cn('text-gray-600 dark:text-gray-300 flex-1', textMap[size])}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
);

DataList.displayName = 'DataList';
export { DataList };
export default DataList;
