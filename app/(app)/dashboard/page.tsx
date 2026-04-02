import type { Metadata } from "next";
import { getInvestments, getChartData, getPortfolioSummary } from '@/app/data/portfolio-db';

export const metadata: Metadata = { title: "Dashboard" };
import { PortfolioSummaryCard } from './PortfolioSummaryCard';
import { BestPerformersPanel, WorstPerformersPanel } from './PerformersPanel';
import styles from './dashboard.module.css';

export default async function DashboardPage() {
  const [investments, chartData] = await Promise.all([
    getInvestments(),
    getChartData(),
  ]);
  const summary = await getPortfolioSummary(investments);

  return (
    <div className={styles.page}>
      <PortfolioSummaryCard summary={summary} chartData={chartData} />

      <div className={styles.bottomGrid}>
        <BestPerformersPanel items={investments} />
        <WorstPerformersPanel items={investments} />
      </div>
    </div>
  );
}
