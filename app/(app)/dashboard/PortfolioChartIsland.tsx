'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import styles from './dashboard.module.css';
import type { ChartPoint } from '@/app/data/portfolio-db';

interface TooltipPayload {
  value?: number;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value ?? 0;
  return (
    <div className={styles.chartTooltip}>
      <p className={styles.chartTooltipLabel}>Valor Total</p>
      <p className={styles.chartTooltipValue}>
        R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
      </p>
      <p className={styles.chartTooltipDate}>{label}</p>
    </div>
  );
}

function formatYAxis(value: number) {
  return `${(value / 1000).toFixed(1)}K`;
}

export default function PortfolioChartIsland({
  chartData,
  investedValue,
}: {
  chartData: ChartPoint[];
  investedValue: number;
}) {
  const values = chartData.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const padding = (maxVal - minVal) * 0.15 || 500;
  const domainMin = Math.floor((minVal - padding) / 1000) * 1000;
  const domainMax = Math.ceil((maxVal + padding) / 1000) * 1000;

  const step = Math.ceil((domainMax - domainMin) / 5 / 1000) * 1000;
  const ticks: number[] = [];
  for (let v = domainMin; v <= domainMax; v += step) ticks.push(v);

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={270}>
        <AreaChart data={chartData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#47a663" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#47a663" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(255,255,255,0.15)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 500, letterSpacing: '0.6px' }}
            tickLine={false}
            axisLine={false}
            dy={8}
          />

          <YAxis
            domain={[domainMin, domainMax]}
            ticks={ticks}
            tickFormatter={formatYAxis}
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 500, letterSpacing: '0.6px' }}
            tickLine={false}
            axisLine={false}
            width={36}
          />

          {investedValue > 0 && (
            <ReferenceLine
              y={investedValue}
              stroke="rgba(255,56,66,0.5)"
              strokeWidth={1}
            />
          )}

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#47a663', strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#47a663"
            strokeWidth={1.5}
            fill="url(#greenGrad)"
            dot={false}
            activeDot={{ r: 6, fill: '#47a663', stroke: 'rgba(71,166,99,0.4)', strokeWidth: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
