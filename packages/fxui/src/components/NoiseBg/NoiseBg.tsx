import React from 'react';
import { cn } from '../../utils/cn';

export type NoiseBlendMode =
  | 'normal' | 'multiply' | 'screen' | 'overlay'
  | 'soft-light' | 'hard-light' | 'color-burn' | 'color-dodge';

export interface NoiseBgProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  baseFrequency?: number;
  numOctaves?: number;
  blendMode?: NoiseBlendMode;
  animated?: boolean;
  noiseClassName?: string;
}

function buildNoiseSvg(baseFrequency: number, numOctaves: number) {
  // feColorMatrix saturate=0 → grayscale output, more predictable across blend modes
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">`,
    `<filter id="n">`,
    `<feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" stitchTiles="stitch"/>`,
    `<feColorMatrix type="saturate" values="0"/>`,
    `</filter>`,
    `<rect width="256" height="256" filter="url(#n)"/>`,
    `</svg>`,
  ].join('');
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const NoiseBg = React.forwardRef<HTMLDivElement, NoiseBgProps>(
  (
    {
      opacity = 0.15,
      baseFrequency = 0.65,
      numOctaves = 4,
      blendMode = 'multiply',
      animated = false,
      noiseClassName,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const noiseStyle: React.CSSProperties = {
      backgroundImage: buildNoiseSvg(baseFrequency, numOctaves),
      backgroundRepeat: 'repeat',
      mixBlendMode: blendMode,
    };

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        style={style}
        {...props}
      >
        {children}
        {/* Outer div owns opacity so CSS animations on inner div don't override it */}
        <div
          aria-hidden="true"
          className={cn('absolute inset-0 pointer-events-none', noiseClassName)}
          style={{ opacity }}
        >
          <div
            className={cn(
              'absolute inset-0',
              animated && 'animate-fx-pulse',
            )}
            style={noiseStyle}
          />
        </div>
      </div>
    );
  }
);
NoiseBg.displayName = 'NoiseBg';
export { NoiseBg };
export default NoiseBg;
