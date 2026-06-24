import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../../utils/cn';
import { FX_CHART_COLORS } from '../LineChart/LineChart';

interface FxTooltipInternalProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string; payload?: Record<string, unknown> }>;
}

const FxTooltip = ({ active, payload }: FxTooltipInternalProps) => {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  const total = payload[0].payload?.total as number | undefined;
  const pct = total ? ` (${((Number(entry.value) / total) * 100).toFixed(1)}%)` : '';
  return (
    <div className="border-2 border-fx-black bg-fx-white shadow-fx rounded-[4px] px-3 py-2 font-sans">
      <p className="text-sm font-bold flex items-center gap-1.5">
        <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: entry.color }} />
        {entry.name}: <span style={{ color: entry.color }}>{entry.value}{pct}</span>
      </p>
    </div>
  );
};

export interface DonutChartItem {
  label: string;
  value: number;
  color?: string;
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DonutChartItem[];
  height?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  centerLabel?: string;
  centerValue?: string | number;
  showLegend?: boolean;
  showTooltip?: boolean;
  showLabels?: boolean;
  variant?: 'donut' | 'pie';
}

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      height = 300,
      innerRadius = '55%',
      outerRadius = '80%',
      centerLabel,
      centerValue,
      showLegend = true,
      showTooltip = true,
      showLabels = false,
      variant = 'donut',
      className,
      ...props
    },
    ref
  ) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const dataWithTotal = data.map((d) => ({ ...d, total }));

    const isPie = variant === 'pie';
    const resolvedInner = isPie ? 0 : innerRadius;

    return (
      <div
        ref={ref}
        className={cn(
          'relative border-2 border-fx-black dark:border-fx-white rounded-[4px] shadow-fx bg-fx-white dark:bg-fx-black p-4',
          className
        )}
        {...props}
      >
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={dataWithTotal}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={resolvedInner}
              outerRadius={outerRadius}
              paddingAngle={isPie ? 0 : 3}
              strokeWidth={2}
              stroke="#fafafa"
              label={showLabels ? ({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%` : undefined}
              labelLine={showLabels}
            >
              {data.map((entry, i) => (
                <Cell
                  key={entry.label}
                  fill={entry.color ?? FX_CHART_COLORS[i % FX_CHART_COLORS.length]}
                />
              ))}
            </Pie>
            {showTooltip && <Tooltip content={<FxTooltip />} />}
            {showLegend && (
              <Legend
                wrapperStyle={{ fontSize: 11, fontFamily: 'Space Grotesk', fontWeight: 700, paddingTop: 12 }}
                formatter={(value) => <span className="text-fx-black dark:text-fx-white">{value}</span>}
              />
            )}
          </PieChart>
        </ResponsiveContainer>

        {/* Center label — only for donut variant */}
        {!isPie && (centerLabel || centerValue !== undefined) && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ top: 0, bottom: showLegend ? 40 : 0 }}
          >
            {centerValue !== undefined && (
              <span className="font-display text-3xl font-black text-fx-black dark:text-fx-white leading-none">
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <span className="text-xs font-bold text-gray-400 font-sans mt-0.5">{centerLabel}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

DonutChart.displayName = 'DonutChart';
export { DonutChart };
export default DonutChart;
