import React from 'react';
import { cn } from '../../utils/cn';

export type CarouselNavVariant = 'dots' | 'pills' | 'bar' | 'numbers' | 'none';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Navigation indicator style. */
  navVariant?: CarouselNavVariant;
  /** Number of slides visible at once (default 1). */
  slidesToShow?: number;
  /** Gap between slides in pixels (used when slidesToShow > 1). */
  gap?: number;
  /** Show thumbnails below the main slide. */
  thumbnails?: string[];
  /** Aspect ratio applied to each slide wrapper. */
  ratio?: '16/9' | '4/3' | '1/1' | 'auto';
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
      navVariant = 'dots',
      slidesToShow = 1,
      gap = 0,
      thumbnails,
      ratio,
      className,
      ...props
    },
    ref
  ) => {
    const [index, setIndex] = React.useState(defaultIndex);
    const total = items.length;
    const pages = Math.ceil(total / slidesToShow);
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const go = React.useCallback(
      (next: number) => {
        const clamped = loop ? ((next % pages) + pages) % pages : Math.max(0, Math.min(next, pages - 1));
        setIndex(clamped);
        onIndexChange?.(clamped * slidesToShow);
      },
      [loop, pages, onIndexChange, slidesToShow]
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
    const canNext = loop || index < pages - 1;

    const slideWidth = slidesToShow > 1 ? `calc(${100 / slidesToShow}% - ${gap * (slidesToShow - 1) / slidesToShow}px)` : '100%';

    const ratioClass = ratio === '16/9' ? 'aspect-video' : ratio === '4/3' ? 'aspect-[4/3]' : ratio === '1/1' ? 'aspect-square' : '';

    return (
      <div className={cn('flex flex-col gap-3', className)} {...props}>
        <div
          ref={ref}
          className={cn('relative overflow-hidden select-none', ratioClass)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Carousel"
          aria-roledescription="carousel"
        >
          {/* Track */}
          <div
            className="flex transition-transform duration-300 ease-in-out h-full"
            style={{
              transform: `translateX(calc(-${index * 100}% - ${index * gap}px))`,
              gap: gap ? `${gap}px` : undefined,
            }}
            aria-live="polite"
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="shrink-0 h-full"
                style={{ width: slideWidth, minWidth: slideWidth }}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${total}`}
                aria-hidden={Math.floor(i / slidesToShow) !== index}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Arrow buttons */}
          {showArrows && pages > 1 && (
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

          {/* Nav — dots / pills / numbers */}
          {showDots && pages > 1 && navVariant !== 'none' && navVariant !== 'bar' && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10" role="tablist" aria-label="Slides">
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={cn(
                    'border border-fx-black dark:border-fx-white transition-all duration-200',
                    navVariant === 'numbers'
                      ? cn(
                          'h-6 min-w-[1.5rem] px-1 rounded-[4px] font-mono text-[10px] font-black',
                          i === index
                            ? 'bg-fx-black text-white dark:bg-fx-white dark:text-fx-black'
                            : 'bg-white/80 text-fx-black dark:bg-black/80 dark:text-white',
                        )
                      : navVariant === 'pills'
                      ? cn(
                          'h-1.5 rounded-full',
                          i === index ? 'w-8 bg-fx-black dark:bg-fx-white' : 'w-4 bg-white/60 dark:bg-white/30',
                        )
                      : cn(
                          'h-2 rounded-full',
                          i === index ? 'w-5 bg-fx-black dark:bg-fx-white' : 'w-2 bg-transparent opacity-50 hover:opacity-80',
                        ),
                  )}
                >
                  {navVariant === 'numbers' ? i + 1 : null}
                </button>
              ))}
            </div>
          )}

          {/* Nav — progress bar */}
          {showDots && navVariant === 'bar' && pages > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
              <div
                className="h-full bg-fx-yellow transition-all duration-300"
                style={{ width: `${((index + 1) / pages) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {thumbnails && thumbnails.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {thumbnails.map((thumb, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                className={cn(
                  'shrink-0 w-14 h-10 overflow-hidden rounded-[4px] border-2 transition-all duration-150',
                  i === index
                    ? 'border-fx-black shadow-fx-sm translate-x-[2px] translate-y-[2px]'
                    : 'border-gray-200 opacity-60 hover:opacity-100',
                )}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
              >
                <img src={thumb} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Page counter for numbers mode below */}
        {navVariant === 'none' && pages > 1 && (
          <div className="flex justify-between items-center px-1">
            <button onClick={prev} disabled={!canPrev} className="text-xs font-mono text-gray-400 hover:text-fx-black disabled:opacity-30">← prev</button>
            <span className="font-mono text-xs text-gray-400">{index + 1} / {pages}</span>
            <button onClick={next} disabled={!canNext} className="text-xs font-mono text-gray-400 hover:text-fx-black disabled:opacity-30">next →</button>
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export { Carousel };
export default Carousel;
