'use client';

import dynamic from 'next/dynamic';
import { GlassPanel } from '@/app/components/glass/GlassPanel';
import { PORTFOLIO_SUMMARY } from '@/app/data/portfolio';
import styles from './dashboard.module.css';

const PortfolioChartIsland = dynamic(
  () => import('./PortfolioChartIsland'),
  { ssr: false, loading: () => <div className={styles.chartWrapper} /> }
);

export function PortfolioSummaryCard() {
  return (
    <GlassPanel className={styles.heroCard}>
      <div className="flex flex-col gap-2">
        <p className={styles.heroLabel}>Patrimônio</p>
        <p className={styles.heroValue}>{PORTFOLIO_SUMMARY.total}</p>
        <p style={{ fontSize: 14, color: '#2FBD04', fontWeight: 600, marginTop: -4 }}>
          {PORTFOLIO_SUMMARY.pct} &nbsp;
          <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
            ({PORTFOLIO_SUMMARY.return})
          </span>
        </p>
      </div>
      <PortfolioChartIsland />
    </GlassPanel>
  );
}
