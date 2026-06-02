import React from 'react';
import { cn } from '../../utils/cn';

export interface ScrollProgressProps {
  color?: 'yellow' | 'pink' | 'green' | 'blue' | 'purple' | 'black';
  height?: number;
  position?: 'top' | 'bottom';
  zIndex?: number;
  target?: React.RefObject<HTMLElement>;
  className?: string;
}

const colorMap = {
  yellow: 'bg-fx-yellow',
  pink: 'bg-fx-pink',
  green: 'bg-fx-green',
  blue: 'bg-fx-blue',
  purple: 'bg-fx-purple',
  black: 'bg-fx-black dark:bg-fx-white',
};

const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  (
    {
      color = 'yellow',
      height = 3,
      position = 'top',
      zIndex = 50,
      target,
      className,
    },
    ref
  ) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
      const onScroll = () => {
        const el = target?.current ?? document.documentElement;
        const scrollTop = el.scrollTop ?? window.scrollY;
        const scrollHeight = el.scrollHeight - el.clientHeight;
        if (scrollHeight <= 0) { setProgress(0); return; }
        setProgress(Math.min(100, Math.round((scrollTop / scrollHeight) * 100)));
      };

      const source = target?.current ?? window;
      source.addEventListener('scroll', onScroll, { passive: true });
      return () => source.removeEventListener('scroll', onScroll);
    }, [target]);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        className={cn(
          'fixed left-0 right-0 origin-left',
          position === 'top' ? 'top-0' : 'bottom-0',
          className,
        )}
        style={{ height, zIndex }}
      >
        <div
          className={cn('h-full transition-none', colorMap[color])}
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }
);

ScrollProgress.displayName = 'ScrollProgress';
export { ScrollProgress };
export default ScrollProgress;
