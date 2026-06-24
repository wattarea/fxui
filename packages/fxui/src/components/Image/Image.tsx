import React from 'react';
import { cn } from '../../utils/cn';

type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
type AspectRatioPreset = 'square' | 'video' | 'photo' | 'wide' | 'portrait';

const presets: Record<AspectRatioPreset, number> = {
  square: 1,
  video: 16 / 9,
  photo: 4 / 3,
  wide: 21 / 9,
  portrait: 3 / 4,
};

const FallbackIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  alt: string;
  /** Aspect ratio preset or numeric ratio (width/height). */
  ratio?: number | AspectRatioPreset;
  objectFit?: ObjectFit;
  fallback?: React.ReactNode;
  caption?: string;
  bordered?: boolean;
  rounded?: boolean;
  /** Drop shadow matching the neo-brutalist design system. */
  shadow?: boolean;
  /** Scale up on hover. */
  zoom?: boolean;
  /** Corner badge label (e.g. "New", "Sale"). */
  badge?: string;
  /** Content overlay rendered on top of the image. */
  overlay?: React.ReactNode;
  /** Dark gradient overlay always visible at the bottom. */
  gradient?: boolean;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      ratio,
      objectFit = 'cover',
      fallback,
      caption,
      bordered = false,
      rounded = false,
      shadow = false,
      zoom = false,
      badge,
      overlay,
      gradient = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');

    const numericRatio =
      ratio === undefined
        ? undefined
        : typeof ratio === 'string'
        ? presets[ratio]
        : ratio;

    const wrapperClass = cn(
      'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
      bordered && 'border-2 border-fx-black dark:border-fx-white',
      rounded && 'rounded-[4px]',
      shadow && 'shadow-fx',
      zoom && 'group/img',
    );

    const imgEl = (
      <>
        {status === 'loading' && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" aria-hidden="true" />
        )}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800">
            {fallback ?? <FallbackIcon />}
            <span className="text-xs text-gray-400 font-sans">{alt}</span>
          </div>
        )}
        {src && (
          <img
            ref={ref}
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            className={cn(
              'w-full transition-all duration-300',
              numericRatio ? 'absolute inset-0 h-full' : 'block',
              `object-${objectFit}`,
              status === 'loaded' ? 'opacity-100' : 'opacity-0',
              zoom && 'group-hover/img:scale-105',
              !numericRatio && className,
            )}
            style={numericRatio ? undefined : style}
            {...props}
          />
        )}

        {/* Gradient overlay */}
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-t from-fx-black/70 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Content overlay */}
        {overlay && (
          <div className="absolute inset-0 flex items-end p-3 pointer-events-none">
            {overlay}
          </div>
        )}

        {/* Corner badge */}
        {badge && (
          <div className="absolute top-2 right-2 z-10 bg-fx-yellow border-2 border-fx-black px-2 py-0.5 font-mono text-[11px] font-black uppercase tracking-wider shadow-fx-sm">
            {badge}
          </div>
        )}
      </>
    );

    const content = numericRatio ? (
      <div
        className={cn(wrapperClass, className)}
        style={{ paddingBottom: `${(1 / numericRatio) * 100}%`, ...style }}
      >
        {imgEl}
      </div>
    ) : (
      <div className={wrapperClass}>{imgEl}</div>
    );

    if (caption) {
      return (
        <figure>
          {content}
          <figcaption className="mt-2 text-xs text-gray-400 font-sans text-center">{caption}</figcaption>
        </figure>
      );
    }

    return content;
  }
);

Image.displayName = 'Image';

export { Image };
export default Image;
