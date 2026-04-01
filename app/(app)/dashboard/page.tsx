import { PortfolioSummaryCard } from './PortfolioSummaryCard';
import { GlassPanel } from '@/app/components/glass/GlassPanel';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <PortfolioSummaryCard />

      <div className={styles.bottomGrid}>
        <GlassPanel className={styles.bottomPanel} />
        <GlassPanel className={styles.bottomPanel} />
      </div>
    </div>
  );
}
