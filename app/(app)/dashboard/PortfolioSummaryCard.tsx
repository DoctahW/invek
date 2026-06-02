'use client';

import dynamic from 'next/dynamic';
import { GlassPanel } from '@/app/components/glass/GlassPanel';
import type { PortfolioSummary, ChartPoint } from '@/app/data/portfolio-db';
import styles from './dashboard.module.css';

const PortfolioChartIsland = dynamic(
  () => import('./PortfolioChartIsland'),
  { ssr: false, loading: () => <div className={styles.chartWrapper} /> }
);

export function PortfolioSummaryCard({
  summary,
  chartData,
}: {
  summary: PortfolioSummary;
  chartData: ChartPoint[];
}) {
  return (
    <GlassPanel className={styles.heroCard}>
      <div className="flex flex-col gap-2">
        <h2 className={styles.heroLabel}>Patrimônio</h2>
        <p className={styles.heroValue}>{summary.total}</p>
        <p style={{ fontSize: 14, color: '#3DD80E', fontWeight: 600, marginTop: -4 }}>
          {summary.pct} &nbsp;
          <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
            ({summary.return})
          </span>
        </p>
      </div>
      <PortfolioChartIsland chartData={chartData} investedValue={chartData[0]?.value ?? 0} />
    </GlassPanel>
  );
}
