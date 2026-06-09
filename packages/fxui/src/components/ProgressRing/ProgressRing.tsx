import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: 'yellow' | 'pink' | 'green' | 'blue' | 'purple' | 'black';
  trackColor?: string;
  showValue?: boolean;
  label?: string;
  format?: (value: number, max: number) => string;
  animate?: boolean;
  className?: string;
}

const colorMap = {
  yellow: '#FFE500',
  pink: '#FF2D78',
  green: '#00FF94',
  blue: '#0066FF',
  purple: '#7C3AED',
  black: '#0a0a0a',
};

const ProgressRing = React.forwardRef<SVGSVGElement, ProgressRingProps>(
  (
    {
      value,
      max = 100,
      size = 80,
      strokeWidth = 8,
      color = 'yellow',
      trackColor = '#e5e7eb',
      showValue = true,
      label,
      format,
      animate = true,
      className,
    },
    ref
  ) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    const r = (size - strokeWidth) / 2;
    const cx = size / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (pct / 100) * circumference;

    const displayText = format
      ? format(value, max)
      : `${Math.round(pct)}%`;

    return (
      <div className={cn('inline-flex flex-col items-center gap-1', className)}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label ?? `Progress: ${displayText}`}
        >
          {/* Track */}
          <circle
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          {/* Neo-brutalist shadow ring */}
          <circle
            cx={cx + 1}
            cy={cx + 1}
            r={r}
            fill="none"
            stroke="rgba(0,0,0,0.15)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cx})`}
          />
          {/* Progress arc */}
          <circle
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke={colorMap[color]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cx})`}
            style={animate ? { transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)' } : undefined}
          />
          {showValue && (
            <text
              x={cx}
              y={cx}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display fill-current text-fx-black"
              fontSize={size * 0.18}
              fontWeight="900"
              fontFamily="Archivo Black, sans-serif"
            >
              {displayText}
            </text>
          )}
        </svg>
        {label && (
          <span className="text-xs font-bold text-gray-500 font-sans">{label}</span>
        )}
      </div>
    );
  }
);

ProgressRing.displayName = 'ProgressRing';
export { ProgressRing };
export default ProgressRing;
