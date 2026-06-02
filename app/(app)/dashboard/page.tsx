import type { Metadata } from "next";
import { getInvestments, getChartData, getPortfolioSummary } from '@/app/data/portfolio-db';
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "Dashboard" };
import { PortfolioSummaryCard } from './PortfolioSummaryCard';
import { BestPerformersPanel, WorstPerformersPanel } from './PerformersPanel';
import styles from './dashboard.module.css';

export default async function DashboardPage() {
  const { user } = await requireSession();
  const [investments, chartData] = await Promise.all([
    getInvestments(user.id),
    getChartData(user.id),
  ]);
  const summary = await getPortfolioSummary(investments);

  return (
    <div className={styles.page}>
      <h1 className={styles.welcome}>Bem vindo, {user.name ?? "usuário"}</h1>
      <PortfolioSummaryCard summary={summary} chartData={chartData} />

      <div className={styles.bottomGrid}>
        <BestPerformersPanel items={investments} />
        <WorstPerformersPanel items={investments} />
      </div>
    </div>
  );
}
