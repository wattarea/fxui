import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { cn } from '../../utils/cn';
import { FX_CHART_COLORS } from '../LineChart/LineChart';

interface SparkTooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number }>;
}

const FxTooltip = ({ active, payload }: SparkTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-2 border-fx-black bg-fx-white shadow-fx rounded-[4px] px-2 py-1 font-sans text-xs font-bold">
      {payload[0].value}
    </div>
  );
};

export interface SparkLineProps extends React.HTMLAttributes<HTMLSpanElement> {
  data: number[];
  color?: string;
  variant?: 'line' | 'area';
  width?: number;
  height?: number;
  showTooltip?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  showTrend?: boolean;
}

const SparkLine = React.forwardRef<HTMLSpanElement, SparkLineProps>(
  (
    {
      data,
      color,
      variant = 'line',
      width = 80,
      height = 32,
      showTooltip = false,
      showTrend = false,
      trend,
      className,
      ...props
    },
    ref
  ) => {
    const chartData = data.map((v, i) => ({ v, i }));
    const autoTrend = trend ?? (data[data.length - 1] > data[0] ? 'up' : data[data.length - 1] < data[0] ? 'down' : 'neutral');
    const resolvedColor = color ?? (autoTrend === 'up' ? '#00FF94' : autoTrend === 'down' ? '#FF2D78' : FX_CHART_COLORS[0]);
    const trendSymbol = autoTrend === 'up' ? '↑' : autoTrend === 'down' ? '↓' : '→';
    const trendColor = autoTrend === 'up' ? 'text-[#00B86B]' : autoTrend === 'down' ? 'text-[#FF2D78]' : 'text-gray-400';

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center gap-1.5 align-middle', className)}
        {...props}
      >
        <span style={{ width, height, display: 'inline-block' }}>
          <ResponsiveContainer width="100%" height="100%">
            {variant === 'area' ? (
              <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                <defs>
                  <linearGradient id={`spark-grad-${resolvedColor}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={resolvedColor} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={resolvedColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                {showTooltip && <Tooltip content={<FxTooltip />} />}
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={resolvedColor}
                  strokeWidth={1.5}
                  fill={`url(#spark-grad-${resolvedColor})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                {showTooltip && <Tooltip content={<FxTooltip />} />}
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke={resolvedColor}
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </span>
        {showTrend && (
          <span className={cn('text-xs font-black font-sans', trendColor)}>{trendSymbol}</span>
        )}
      </span>
    );
  }
);

SparkLine.displayName = 'SparkLine';
export { SparkLine };
export default SparkLine;
