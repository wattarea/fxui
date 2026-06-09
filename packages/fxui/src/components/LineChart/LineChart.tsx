import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../../utils/cn';

export const FX_CHART_COLORS = [
  '#0066FF', '#FFE500', '#FF2D78', '#00FF94', '#7C3AED', '#FF6B6B', '#00C9FF', '#FF8C00',
];

export interface ChartSeries {
  key: string;
  label?: string;
  color?: string;
}

interface FxTooltipPayload {
  dataKey?: string | number;
  name?: string;
  value?: number;
  color?: string;
}
interface FxTooltipInternalProps {
  active?: boolean;
  payload?: FxTooltipPayload[];
  label?: string;
}

const FxTooltip = ({ active, payload, label }: FxTooltipInternalProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-2 border-fx-black bg-fx-white shadow-fx rounded-[4px] px-3 py-2 font-sans">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>
      {payload.map((entry) => (
        <p key={String(entry.dataKey)} className="text-sm font-bold flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: entry.color }} />
          <span className="text-gray-500">{entry.name}:</span>
          <span style={{ color: entry.color }}>{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, string | number>[];
  series: ChartSeries[];
  xKey?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  curved?: boolean;
  showDots?: boolean;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      series,
      xKey = 'label',
      height = 300,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      curved = false,
      showDots = true,
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
        <RechartsLineChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="4 4" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeOpacity={0.6} />
          )}
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }}
            tickLine={false}
            axisLine={{ stroke: 'currentColor', strokeWidth: 2 }}
            className="text-fx-black dark:text-fx-white"
          />
          <YAxis
            tick={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
            className="text-fx-black dark:text-fx-white"
          />
          {showTooltip && <Tooltip content={<FxTooltip />} cursor={{ stroke: '#0a0a0a', strokeWidth: 1, strokeDasharray: '4 4' }} />}
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 700, paddingTop: 12 }}
            />
          )}
          {series.map((s, i) => (
            <Line
              key={s.key}
              type={curved ? 'monotone' : 'linear'}
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={s.color ?? FX_CHART_COLORS[i % FX_CHART_COLORS.length]}
              strokeWidth={2.5}
              dot={showDots ? { r: 4, strokeWidth: 2, fill: '#fafafa', stroke: s.color ?? FX_CHART_COLORS[i % FX_CHART_COLORS.length] } : false}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
);

LineChart.displayName = 'LineChart';
export { LineChart };
export default LineChart;
