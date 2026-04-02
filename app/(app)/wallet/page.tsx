import { getInvestments, getChartData, getPortfolioSummary } from '@/app/data/portfolio-db';
import WalletClient from './WalletClient';

export default async function WalletPage() {
  const [investments, chartData] = await Promise.all([
    getInvestments(),
    getChartData(),
  ]);
  const summary = await getPortfolioSummary(investments);

  return <WalletClient investments={investments} summary={summary} />;
}
