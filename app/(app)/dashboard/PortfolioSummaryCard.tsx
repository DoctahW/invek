'use client';

import dynamic from 'next/dynamic';
import { GlassPanel } from '@/app/components/glass/GlassPanel';
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
        <p className={styles.heroValue}>R$ 1.483,89</p>
      </div>
      <PortfolioChartIsland />
    </GlassPanel>
  );
}
