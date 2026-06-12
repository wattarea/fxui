import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const scrollToTopVariants = cva(
  [
    'fixed z-50 flex items-center justify-center',
    'border-2 border-fx-black dark:border-fx-white',
    'bg-fx-white dark:bg-fx-black text-fx-black dark:text-fx-white',
    'shadow-fx dark:shadow-fx-dark',
    'hover:shadow-fx-sm dark:hover:shadow-fx-dark-sm',
    'hover:translate-x-[2px] hover:translate-y-[2px]',
    'transition-all duration-150 cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-fx-black dark:focus:ring-fx-white focus:ring-offset-2',
  ],
  {
    variants: {
      shape: {
        circle: 'rounded-full',
        square: 'rounded-[4px]',
      },
      size: {
        sm: 'h-9 w-9 text-sm',
        md: 'h-11 w-11 text-base',
        lg: 'h-13 w-13 text-lg',
      },
      position: {
        'bottom-right': 'bottom-6 right-6',
        'bottom-left':  'bottom-6 left-6',
        'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
      },
    },
    defaultVariants: { shape: 'circle', size: 'md', position: 'bottom-right' },
  }
);

export interface ScrollToTopProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof scrollToTopVariants> {
  threshold?: number;
  smooth?: boolean;
  scrollTarget?: React.RefObject<HTMLElement>;
  label?: React.ReactNode;
  showLabel?: boolean;
}

const ArrowUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ScrollToTop = React.forwardRef<HTMLButtonElement, ScrollToTopProps>(
  (
    {
      threshold = 200,
      smooth = true,
      scrollTarget,
      shape,
      size,
      position,
      label,
      showLabel = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const el = scrollTarget?.current ?? window;
      const getScrollY = () =>
        scrollTarget?.current ? scrollTarget.current.scrollTop : window.scrollY;

      const handleScroll = () => setVisible(getScrollY() > threshold);

      handleScroll();
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }, [threshold, scrollTarget]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = scrollTarget?.current;
      if (el) {
        el.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
      } else {
        window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
      }
      onClick?.(e);
    };

    if (!visible) return null;

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Scroll to top"
        onClick={handleClick}
        className={cn(
          scrollToTopVariants({ shape, size, position }),
          showLabel && 'w-auto px-4 gap-2 rounded-[4px]',
          className,
        )}
        {...props}
      >
        {label ?? <ArrowUpIcon />}
        {showLabel && <span className="text-sm font-bold font-sans">Top</span>}
      </button>
    );
  }
);
ScrollToTop.displayName = 'ScrollToTop';
export { ScrollToTop };
export default ScrollToTop;
