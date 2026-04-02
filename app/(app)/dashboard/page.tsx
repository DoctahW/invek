import { PortfolioSummaryCard } from './PortfolioSummaryCard';
import { BestPerformersPanel, WorstPerformersPanel } from './PerformersPanel';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <PortfolioSummaryCard />

      <div className={styles.bottomGrid}>
        <BestPerformersPanel />
        <WorstPerformersPanel />
      </div>
    </div>
  );
}
