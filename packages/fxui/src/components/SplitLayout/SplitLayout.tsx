import React from 'react';
import { cn } from '../../utils/cn';

export interface SplitLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  defaultSplit?: number;
  minSize?: number;
  maxSize?: number;
  dividerSize?: number;
  collapsible?: boolean;
}

const SplitLayout = React.forwardRef<HTMLDivElement, SplitLayoutProps>(
  (
    {
      direction = 'horizontal',
      defaultSplit = 50,
      minSize = 10,
      maxSize = 90,
      dividerSize = 6,
      collapsible = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [split, setSplit] = React.useState(defaultSplit);
    const [dragging, setDragging] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const isHorizontal = direction === 'horizontal';

    const childArray = React.Children.toArray(children);
    const first = childArray[0];
    const second = childArray[1];

    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      setDragging(true);
    };

    React.useEffect(() => {
      if (!dragging) return;

      const onMove = (e: MouseEvent | TouchEvent) => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const clientPos = 'touches' in e
          ? (isHorizontal ? e.touches[0].clientX : e.touches[0].clientY)
          : (isHorizontal ? (e as MouseEvent).clientX : (e as MouseEvent).clientY);
        const total = isHorizontal ? rect.width : rect.height;
        const offset = clientPos - (isHorizontal ? rect.left : rect.top);
        const pct = Math.max(minSize, Math.min(maxSize, (offset / total) * 100));
        setSplit(pct);
      };

      const onUp = () => setDragging(false);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onUp);
      return () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onUp);
      };
    }, [dragging, isHorizontal, minSize, maxSize]);

    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className={cn(
          'flex overflow-hidden',
          isHorizontal ? 'flex-row' : 'flex-col',
          dragging && (isHorizontal ? 'cursor-col-resize' : 'cursor-row-resize'),
          className
        )}
        {...props}
      >
        {/* First pane */}
        <div
          className="overflow-auto"
          style={isHorizontal ? { width: `${split}%` } : { height: `${split}%` }}
        >
          {first}
        </div>

        {/* Divider */}
        <div
          role="separator"
          aria-orientation={isHorizontal ? 'vertical' : 'horizontal'}
          aria-label="Resize"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          className={cn(
            'shrink-0 flex items-center justify-center group',
            'bg-fx-white dark:bg-fx-black border-fx-black dark:border-fx-white',
            isHorizontal
              ? 'border-l-2 border-r-2 cursor-col-resize'
              : 'border-t-2 border-b-2 cursor-row-resize',
            dragging && 'bg-fx-yellow dark:bg-fx-yellow',
          )}
          style={isHorizontal ? { width: dividerSize } : { height: dividerSize }}
        >
          <div className={cn(
            'rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-fx-black dark:group-hover:bg-fx-white transition-colors',
            isHorizontal ? 'w-0.5 h-8' : 'h-0.5 w-8',
            dragging && 'bg-fx-black dark:bg-fx-black',
          )} />
        </div>

        {/* Second pane */}
        <div className="flex-1 overflow-auto min-w-0 min-h-0">
          {second}
        </div>
      </div>
    );
  }
);

SplitLayout.displayName = 'SplitLayout';
export { SplitLayout };
export default SplitLayout;
