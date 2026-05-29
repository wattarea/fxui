import React from 'react';
import { cn } from '../../utils/cn';

export interface LoadingOverlayProps {
  visible?: boolean;
  message?: string;
  blur?: boolean;
  color?: 'black' | 'white' | 'yellow';
  fullScreen?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const colorMap = {
  black: { bg: 'bg-black/60', spinner: 'border-fx-white border-t-transparent', text: 'text-fx-white' },
  white: { bg: 'bg-white/70', spinner: 'border-fx-black border-t-transparent', text: 'text-fx-black' },
  yellow: { bg: 'bg-fx-yellow/80', spinner: 'border-fx-black border-t-transparent', text: 'text-fx-black' },
};

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  (
    {
      visible = true,
      message,
      blur = false,
      color = 'black',
      fullScreen = false,
      className,
      children,
    },
    ref
  ) => {
    const c = colorMap[color];

    const overlay = visible ? (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-3 z-50',
          fullScreen ? 'fixed inset-0' : 'absolute inset-0',
          c.bg,
          blur && 'backdrop-blur-sm',
          className,
        )}
        role="status"
        aria-label={message ?? 'Loading'}
        aria-live="polite"
      >
        <div
          className={cn(
            'w-10 h-10 rounded-full border-4 animate-spin',
            c.spinner,
          )}
          aria-hidden="true"
        />
        {message && (
          <p className={cn('text-sm font-bold font-sans', c.text)}>{message}</p>
        )}
      </div>
    ) : null;

    if (fullScreen) return overlay;

    return (
      <div ref={ref} className="relative">
        {children}
        {overlay}
      </div>
    );
  }
);

LoadingOverlay.displayName = 'LoadingOverlay';
export { LoadingOverlay };
export default LoadingOverlay;
