import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../../utils/cn';
import { FX_CHART_COLORS, type ChartSeries } from '../LineChart/LineChart';

interface FxTooltipInternalProps {
  active?: boolean;
  payload?: Array<{ dataKey?: string | number; name?: string; value?: number; color?: string }>;
  label?: string;
}

const FxTooltip = ({ active, payload, label }: FxTooltipInternalProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-2 border-fx-black bg-fx-white shadow-fx rounded-[4px] px-3 py-2 font-sans">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>
      {payload.map((entry) => (
        <p key={String(entry.dataKey)} className="text-sm font-bold flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-sm shrink-0" style={{ background: entry.color }} />
          <span className="text-gray-500">{entry.name}:</span>
          <span style={{ color: entry.color }}>{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, string | number>[];
  series: ChartSeries[];
  xKey?: string;
  height?: number;
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  curved?: boolean;
  fillOpacity?: number;
}

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (
    {
      data,
      series,
      xKey = 'label',
      height = 300,
      stacked = false,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      curved = true,
      fillOpacity = 0.15,
      className,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx bg-fx-white dark:bg-fx-black p-4',
        className
      )}
      {...props}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
          <defs>
            {series.map((s, i) => {
              const color = s.color ?? FX_CHART_COLORS[i % FX_CHART_COLORS.length];
              return (
                <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={fillOpacity * 3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>
          {showGrid && (
            <CartesianGrid strokeDasharray="4 4" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeOpacity={0.6} />
          )}
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }}
            tickLine={false}
            axisLine={{ stroke: 'currentColor', strokeWidth: 2 }}
          />
          <YAxis
            tick={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
          />
          {showTooltip && <Tooltip content={<FxTooltip />} cursor={{ stroke: '#0a0a0a', strokeWidth: 1, strokeDasharray: '4 4' }} />}
          {showLegend && (
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 700, paddingTop: 12 }} />
          )}
          {series.map((s, i) => {
            const color = s.color ?? FX_CHART_COLORS[i % FX_CHART_COLORS.length];
            return (
              <Area
                key={s.key}
                type={curved ? 'monotone' : 'linear'}
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#gradient-${s.key})`}
                stackId={stacked ? 'stack' : undefined}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 2, stroke: color, fill: '#fafafa' }}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
);

AreaChart.displayName = 'AreaChart';
export { AreaChart };
export default AreaChart;
