import React from 'react';
import { cn } from '../../utils/cn';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      items,
      autoPlay = false,
      autoPlayInterval = 3000,
      loop = true,
      showDots = true,
      showArrows = true,
      defaultIndex = 0,
      onIndexChange,
      className,
      ...props
    },
    ref
  ) => {
    const [index, setIndex] = React.useState(defaultIndex);
    const total = items.length;
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const go = React.useCallback(
      (next: number) => {
        const clamped = loop ? ((next % total) + total) % total : Math.max(0, Math.min(next, total - 1));
        setIndex(clamped);
        onIndexChange?.(clamped);
      },
      [loop, total, onIndexChange]
    );

    const prev = () => go(index - 1);
    const next = () => go(index + 1);

    React.useEffect(() => {
      if (!autoPlay) return;
      timerRef.current = setTimeout(() => go(index + 1), autoPlayInterval);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [autoPlay, autoPlayInterval, index, go]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    const canPrev = loop || index > 0;
    const canNext = loop || index < total - 1;

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden select-none', className)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Carousel"
        aria-roledescription="carousel"
        {...props}
      >
        {/* Track */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${total}`}
              aria-hidden={i !== index}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Arrows */}
        {showArrows && total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              disabled={!canPrev}
              aria-label="Previous slide"
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 z-10',
                'flex h-9 w-9 items-center justify-center',
                'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
                'bg-fx-white dark:bg-fx-black shadow-fx font-bold text-sm',
                'hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[calc(-50%+2px)]',
                'transition-all duration-150',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-fx disabled:hover:translate-x-0',
              )}
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              aria-label="Next slide"
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 z-10',
                'flex h-9 w-9 items-center justify-center',
                'border-2 border-fx-black dark:border-fx-white rounded-[4px]',
                'bg-fx-white dark:bg-fx-black shadow-fx font-bold text-sm',
                'hover:shadow-fx-sm hover:translate-x-[2px] hover:translate-y-[calc(-50%+2px)]',
                'transition-all duration-150',
                'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-fx disabled:hover:translate-x-0',
              )}
            >
              →
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && total > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10" role="tablist" aria-label="Slides">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={cn(
                  'h-2 rounded-full border border-fx-black dark:border-fx-white transition-all duration-200',
                  i === index
                    ? 'w-5 bg-fx-black dark:bg-fx-white'
                    : 'w-2 bg-transparent opacity-50 hover:opacity-80',
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export { Carousel };
export default Carousel;
