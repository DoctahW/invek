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

const chartData = [
  { date: 'FEB 10', value: 1186 },
  { date: 'FEB 11', value: 1298 },
  { date: 'FEB 12', value: 1375 },
  { date: 'FEB 13', value: 1310 },
  { date: 'FEB 14', value: 1394 },
  { date: 'FEB 15', value: 1462 },
  { date: 'FEB 16', value: 1484 },
];

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

export default function PortfolioChartIsland() {
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
            domain={[1100, 1500]}
            ticks={[1100, 1200, 1300, 1400, 1500]}
            tickFormatter={formatYAxis}
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 500, letterSpacing: '0.6px' }}
            tickLine={false}
            axisLine={false}
            width={36}
          />

          <ReferenceLine
            y={1186}
            stroke="rgba(255,56,66,0.5)"
            strokeWidth={1}
          />

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
