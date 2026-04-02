import type { Metadata } from "next";
import { getInvestments, getChartData, getPortfolioSummary } from '@/app/data/portfolio-db';
import { db } from "@/db";
import { user } from "@/db/auth-schema";

export const metadata: Metadata = { title: "Dashboard" };
import { PortfolioSummaryCard } from './PortfolioSummaryCard';
import { BestPerformersPanel, WorstPerformersPanel } from './PerformersPanel';
import styles from './dashboard.module.css';

export default async function DashboardPage() {
  const [[userData], investments, chartData] = await Promise.all([
    db.select({ name: user.name }).from(user).limit(1),
    getInvestments(),
    getChartData(),
  ]);
  const summary = await getPortfolioSummary(investments);

  return (
    <div className={styles.page}>
      <p className={styles.welcome}>Bem vindo, {userData?.name ?? "usuário"}</p>
      <PortfolioSummaryCard summary={summary} chartData={chartData} />

      <div className={styles.bottomGrid}>
        <BestPerformersPanel items={investments} />
        <WorstPerformersPanel items={investments} />
      </div>
    </div>
  );
}
