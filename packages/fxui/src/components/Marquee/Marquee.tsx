import React from 'react';
import { cn } from '../../utils/cn';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  gap?: number;
  repeat?: number;
  gradient?: boolean;
  gradientWidth?: number;
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      speed = 40,
      direction = 'left',
      pauseOnHover = true,
      gap = 16,
      repeat = 4,
      gradient = true,
      gradientWidth = 64,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const duration = `${100 / (speed / 40)}s`;
    const animationName = direction === 'right' ? 'marqueeRight' : 'marqueeLeft';

    return (
      <div
        ref={ref}
        className={cn('overflow-hidden relative flex', className)}
        style={style}
        {...props}
      >
        {/* Gradient fades */}
        {gradient && (
          <>
            <div
              className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{
                width: gradientWidth,
                background: 'linear-gradient(to right, white, transparent)',
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
              style={{
                width: gradientWidth,
                background: 'linear-gradient(to left, white, transparent)',
              }}
            />
          </>
        )}

        {/* Track */}
        <div
          className={cn('flex shrink-0', pauseOnHover && 'hover:[animation-play-state:paused]')}
          style={{
            animationName,
            animationDuration: duration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDirection: 'normal',
            gap,
          }}
        >
          {Array.from({ length: repeat }, (_, i) => (
            <div key={i} className="flex shrink-0" style={{ gap }}>
              {children}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marqueeLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-${100 / repeat}%); }
          }
          @keyframes marqueeRight {
            from { transform: translateX(-${100 / repeat}%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </div>
    );
  }
);

Marquee.displayName = 'Marquee';
export { Marquee };
export default Marquee;
