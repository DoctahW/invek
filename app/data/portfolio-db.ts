import { db } from "@/db";
import { investment, portfolioChart } from "@/db/portfolio-schema";
import { asc } from "drizzle-orm";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type InvestmentRow = {
  id: string;
  ticker: string;
  name: string;
  category: string;
  qty: string | null;
  currentValue: number | null;
  pctNum: number;
  positive: boolean;
  points: number[];
};

export type ChartPoint = { date: string; value: number };

export type AllocSlice = { label: string; pct: number; color: string };

export type PortfolioSummary = {
  total: string;
  totalNum: number;
  invested: string;
  return: string;
  pct: string;
  alloc: AllocSlice[];
};

// ─── Helpers de formatação ────────────────────────────────────────────────────

function formatBRL(value: number): string {
  return (
    "R$ " +
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function formatPct(pctNum: number): string {
  const sign = pctNum >= 0 ? "+" : "−";
  const abs = Math.abs(pctNum).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${sign}${abs}%`;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  renda_fixa: { label: "Renda Fixa", color: "#6366f1" },
  renda_variavel: { label: "Renda Variável", color: "#2FBD04" },
  cripto: { label: "Cripto", color: "#f59e0b" },
};

export async function getInvestments(): Promise<InvestmentRow[]> {
  const rows = await db.select().from(investment);
  return rows.map((r) => ({
    id: r.id,
    ticker: r.ticker,
    name: r.name,
    category: r.category,
    qty: r.qty,
    currentValue: r.currentValue,
    pctNum: r.pctNum,
    positive: r.positive,
    points: JSON.parse(r.points) as number[],
  }));
}

export async function getChartData(): Promise<ChartPoint[]> {
  const rows = await db
    .select()
    .from(portfolioChart)
    .orderBy(asc(portfolioChart.createdAt));
  return rows.map((r) => ({ date: r.date, value: r.value }));
}

export async function getPortfolioSummary(
  investments: InvestmentRow[]
): Promise<PortfolioSummary> {
  // total = soma dos valores atuais; invested = soma do custo original por ativo
  const totalNum = investments.reduce((s, i) => s + (i.currentValue ?? 0), 0);
  const investedNum = investments.reduce((s, i) => {
    const cv = i.currentValue ?? 0;
    return s + cv / (1 + i.pctNum / 100);
  }, 0);
  const returnNum = totalNum - investedNum;
  const pctNum = investedNum > 0 ? (returnNum / investedNum) * 100 : 0;

  const totalCurrentValue = investments.reduce(
    (s, i) => s + (i.currentValue ?? 0),
    0
  );

  const alloc: AllocSlice[] = Object.entries(CATEGORY_META).map(
    ([key, { label, color }]) => {
      const catTotal = investments
        .filter((i) => i.category === key)
        .reduce((s, i) => s + (i.currentValue ?? 0), 0);
      const pct =
        totalCurrentValue > 0
          ? Math.round((catTotal / totalCurrentValue) * 100)
          : 0;
      return { label, color, pct };
    }
  );

  const returnSign = returnNum >= 0 ? "+" : "−";

  return {
    total: formatBRL(totalNum),
    totalNum,
    invested: formatBRL(investedNum),
    return: `${returnSign}${formatBRL(Math.abs(returnNum))}`,
    pct: formatPct(pctNum),
    alloc,
  };
}
