import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
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

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, string | number>[];
  series: ChartSeries[];
  xKey?: string;
  height?: number;
  orientation?: 'vertical' | 'horizontal';
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  radius?: number;
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      data,
      series,
      xKey = 'label',
      height = 300,
      orientation = 'vertical',
      stacked = false,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      radius = 2,
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';

    return (
      <div
        ref={ref}
        className={cn(
          'border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx bg-fx-white dark:bg-fx-black p-4',
          className
        )}
        {...props}
      >
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart
            data={data}
            layout={isHorizontal ? 'vertical' : 'horizontal'}
            margin={{ top: 4, right: 12, bottom: 0, left: isHorizontal ? 60 : 0 }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-800"
                strokeOpacity={0.6}
                horizontal={!isHorizontal}
                vertical={isHorizontal}
              />
            )}
            {isHorizontal ? (
              <>
                <XAxis type="number" tick={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey={xKey} tick={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }} tickLine={false} axisLine={{ stroke: 'currentColor', strokeWidth: 2 }} width={56} />
              </>
            ) : (
              <>
                <XAxis dataKey={xKey} tick={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }} tickLine={false} axisLine={{ stroke: 'currentColor', strokeWidth: 2 }} />
                <YAxis tick={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 600 }} tickLine={false} axisLine={false} />
              </>
            )}
            {showTooltip && <Tooltip content={<FxTooltip />} cursor={{ fill: 'currentColor', fillOpacity: 0.04 }} />}
            {showLegend && series.length > 1 && (
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 700, paddingTop: 12 }} />
            )}
            {series.length === 1 ? (
              <Bar
                dataKey={series[0].key}
                name={series[0].label ?? series[0].key}
                radius={[radius, radius, 0, 0]}
                stackId={stacked ? 'stack' : undefined}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={FX_CHART_COLORS[i % FX_CHART_COLORS.length]} />
                ))}
              </Bar>
            ) : (
              series.map((s, i) => (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label ?? s.key}
                  fill={s.color ?? FX_CHART_COLORS[i % FX_CHART_COLORS.length]}
                  radius={[radius, radius, 0, 0]}
                  stackId={stacked ? 'stack' : undefined}
                />
              ))
            )}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

BarChart.displayName = 'BarChart';
export { BarChart };
export default BarChart;
