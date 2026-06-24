import React from 'react';
import { cn } from '../../utils/cn';

export type NoiseBlendMode =
  | 'normal' | 'multiply' | 'screen' | 'overlay'
  | 'soft-light' | 'hard-light' | 'color-burn' | 'color-dodge';

export interface NoiseBgProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  baseFrequency?: number;
  numOctaves?: number;
  /** Blend mode applied to the noise overlay. Default: 'overlay' works on any background color. */
  blendMode?: NoiseBlendMode;
  animated?: boolean;
  noiseClassName?: string;
}

function buildNoiseSvg(baseFrequency: number, numOctaves: number) {
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
      opacity = 0.25,
      baseFrequency = 0.65,
      numOctaves = 4,
      blendMode = 'overlay',
      animated = false,
      noiseClassName,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const bgImage = buildNoiseSvg(baseFrequency, numOctaves);

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        style={style}
        {...props}
      >
        {children}
        {/*
          mix-blend-mode must be on the SAME element as opacity.
          A parent with opacity < 1 creates an isolated stacking context,
          which prevents child blend modes from compositing against the
          actual background — they blend against the transparent context instead.
        */}
        <div
          aria-hidden="true"
          className={cn('absolute inset-0 pointer-events-none', noiseClassName)}
          style={{ opacity, mixBlendMode: blendMode }}
        >
          <div
            className={cn('absolute inset-0', animated && 'animate-fx-pulse')}
            style={{ backgroundImage: bgImage, backgroundRepeat: 'repeat' }}
          />
        </div>
      </div>
    );
  }
);

NoiseBg.displayName = 'NoiseBg';
export { NoiseBg };
export default NoiseBg;
