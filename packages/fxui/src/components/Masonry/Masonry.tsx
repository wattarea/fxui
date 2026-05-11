import React from 'react';
import { cn } from '../../utils/cn';

export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number;
}

const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>(
  ({ columns = 3, gap = 16, className, children, style, ...props }, ref) => {
    const isResponsive = typeof columns === 'object';

    if (isResponsive) {
      const { sm, md, lg, xl } = columns as { sm?: number; md?: number; lg?: number; xl?: number };
      const breakpointClass = [
        sm && `sm:columns-${sm}`,
        md && `md:columns-${md}`,
        lg && `lg:columns-${lg}`,
        xl && `xl:columns-${xl}`,
        'columns-1',
      ].filter(Boolean).join(' ');

      return (
        <div
          ref={ref}
          className={cn(breakpointClass, className)}
          style={{ columnGap: gap, ...style }}
          {...props}
        >
          {React.Children.map(children, (child) => (
            <div style={{ breakInside: 'avoid', marginBottom: gap }}>
              {child}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{ columnCount: columns as number, columnGap: gap, ...style }}
        {...props}
      >
        {React.Children.map(children, (child) => (
          <div style={{ breakInside: 'avoid', marginBottom: gap }}>
            {child}
          </div>
        ))}
      </div>
    );
  }
);

Masonry.displayName = 'Masonry';
export { Masonry };
export default Masonry;
