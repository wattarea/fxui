import React from 'react';
import { cn } from '../../utils/cn';

export type AspectRatioPreset = 'square' | 'video' | 'photo' | 'wide' | 'portrait' | 'golden';

const presets: Record<AspectRatioPreset, number> = {
  square: 1,
  video: 16 / 9,
  photo: 4 / 3,
  wide: 21 / 9,
  portrait: 3 / 4,
  golden: 1.618,
};

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number | AspectRatioPreset;
  children?: React.ReactNode;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 'video', className, children, style, ...props }, ref) => {
    const numericRatio = typeof ratio === 'string' ? presets[ratio] : ratio;
    const paddingBottom = `${(1 / numericRatio) * 100}%`;

    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-hidden', className)}
        style={{ paddingBottom, ...style }}
        {...props}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
export default AspectRatio;
