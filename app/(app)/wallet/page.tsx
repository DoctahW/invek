import type { Metadata } from "next";
import { getInvestments, getChartData, getPortfolioSummary } from '@/app/data/portfolio-db';
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "Carteira" };
import WalletClient from './WalletClient';

export default async function WalletPage() {
  const { user } = await requireSession();
  const [investments, chartData] = await Promise.all([
    getInvestments(user.id),
    getChartData(user.id),
  ]);
  const summary = await getPortfolioSummary(investments);

  return <WalletClient investments={investments} summary={summary} />;
}
