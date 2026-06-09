import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SparkLine } from './SparkLine';

const meta: Meta<typeof SparkLine> = {
  title: 'Components/Chart/SparkLine',
  component: SparkLine,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SparkLine>;

const up = [12, 18, 15, 22, 19, 28, 24, 32, 29, 38];
const down = [38, 32, 29, 24, 28, 19, 22, 15, 18, 10];
const flat = [20, 22, 19, 21, 20, 23, 19, 22, 20, 21];

export const Default: Story = {
  render: () => (
    <div className="p-6 space-y-6 font-sans">
      <div className="flex items-center gap-3">
        <span className="text-sm">Revenue</span>
        <SparkLine data={up} showTrend />
        <span className="text-sm font-bold text-[#00B86B]">+26%</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Churn</span>
        <SparkLine data={down} showTrend />
        <span className="text-sm font-bold text-[#FF2D78]">-34%</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Uptime</span>
        <SparkLine data={flat} showTrend />
        <span className="text-sm font-bold text-gray-400">99.9%</span>
      </div>
    </div>
  ),
};

export const AreaVariant: Story = {
  render: () => (
    <div className="p-6 space-y-4 font-sans">
      <div className="flex items-center gap-3">
        <span className="text-sm">Sessions</span>
        <SparkLine data={up} variant="area" width={100} height={36} showTrend />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Errors</span>
        <SparkLine data={down} variant="area" width={100} height={36} showTrend />
      </div>
    </div>
  ),
};

export const InTable: Story = {
  render: () => (
    <div className="p-6 max-w-lg">
      <table className="w-full border-2 border-fx-black rounded-[4px] shadow-fx overflow-hidden">
        <thead>
          <tr className="bg-fx-black text-fx-white">
            {['Metric', 'Last 10d', 'Trend', 'Change'].map((h) => (
              <th key={h} className="px-4 py-2.5 text-left text-xs font-black uppercase tracking-widest">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Revenue', data: up, change: '+26%', changeColor: 'text-[#00B86B]' },
            { name: 'Users', data: [8, 12, 10, 15, 13, 18, 16, 22, 19, 24], change: '+14%', changeColor: 'text-[#00B86B]' },
            { name: 'Churn', data: down, change: '-8%', changeColor: 'text-[#FF2D78]' },
            { name: 'Uptime', data: flat, change: '±0%', changeColor: 'text-gray-400' },
          ].map((row, i) => (
            <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2.5 text-sm font-bold font-sans">{row.name}</td>
              <td className="px-4 py-2.5 text-xs font-mono text-gray-400">{row.data.join(', ')}</td>
              <td className="px-4 py-2.5">
                <SparkLine data={row.data} variant="area" width={80} height={28} />
              </td>
              <td className={`px-4 py-2.5 text-sm font-black font-sans ${row.changeColor}`}>{row.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="p-6 space-y-4 font-sans">
      {([40, 60, 80, 120, 160] as const).map((w) => (
        <div key={w} className="flex items-center gap-3">
          <span className="text-xs text-gray-400 w-12">{w}px</span>
          <SparkLine data={up} width={w} height={24} />
        </div>
      ))}
    </div>
  ),
};
