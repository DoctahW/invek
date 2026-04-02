import { db } from "./index";
import { investment, portfolioChart } from "./portfolio-schema";
import { user } from "./auth-schema";
import { eq } from "drizzle-orm";

const [existingUser] = await db.select({ id: user.id }).from(user).limit(1);

if (!existingUser) {
  console.error("Nenhum usuário encontrado no banco.");
  process.exit(1);
}

const userId = existingUser.id;
const now = new Date();

// Limpa dados anteriores do usuário
await db.delete(investment).where(eq(investment.userId, userId));
await db.delete(portfolioChart).where(eq(portfolioChart.userId, userId));

// Insere investimentos
await db.insert(investment).values([
  {
    id: crypto.randomUUID(),
    userId,
    ticker: "ETH",
    name: "Ethereum",
    category: "cripto",
    qty: "0,30 ETH",
    currentValue: 3301.26,
    pctNum: 15.83,
    positive: true,
    points: JSON.stringify([4,5,5,6,7,7,8,9,9,10,11,11,12,13,13]),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    userId,
    ticker: "NATU3",
    name: "Natura &Co",
    category: "renda_variavel",
    qty: "50 ações",
    currentValue: 796.00,
    pctNum: 12.11,
    positive: true,
    points: JSON.stringify([5,7,4,8,6,9,7,8,6,9,8,10,8,9,10]),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    userId,
    ticker: "BPAC11",
    name: "Banco BTG Pactual",
    category: "renda_variavel",
    qty: "15 cotas",
    currentValue: 498.00,
    pctNum: 10.67,
    positive: true,
    points: JSON.stringify([4,6,5,7,6,8,7,9,8,10,9,11,10,12,11]),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    userId,
    ticker: "BTC",
    name: "Bitcoin",
    category: "cripto",
    qty: "0,05 BTC",
    currentValue: 17695.49,
    pctNum: 10.60,
    positive: true,
    points: JSON.stringify([5,7,4,8,6,9,7,8,6,9,8,10,8,9,10]),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    userId,
    ticker: "CRI",
    name: "Dasa IPCA",
    category: "renda_fixa",
    qty: "R$ 3.000",
    currentValue: 3317.40,
    pctNum: 10.58,
    positive: true,
    points: JSON.stringify([5,6,6,7,7,8,8,9,9,10,10,11,11,12,12]),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    userId,
    ticker: "CDB XP",
    name: "CDB Banco XP S.A.",
    category: "renda_fixa",
    qty: "R$ 5.000",
    currentValue: 5410.00,
    pctNum: 8.20,
    positive: true,
    points: JSON.stringify([5,6,5,7,6,8,7,9,8,9,9,10,10,11,11]),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    userId,
    ticker: "SOL",
    name: "Solana",
    category: "cripto",
    qty: "5 SOL",
    currentValue: 2148.05,
    pctNum: -4.82,
    positive: false,
    points: JSON.stringify([10,9,8,9,8,7,8,6,7,5,6,4,5,3,4]),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: crypto.randomUUID(),
    userId,
    ticker: "AZUL4",
    name: "Azul Linhas Aéreas",
    category: "renda_variavel",
    qty: "30 ações",
    currentValue: 108.60,
    pctNum: -83.9,
    positive: false,
    points: JSON.stringify([12,11,10,9,8,7,6,5,4,3,2,2,1,1,1]),
    createdAt: now,
    updatedAt: now,
  },
]);

// Insere histórico semanal
await db.insert(portfolioChart).values([
  { id: crypto.randomUUID(), userId, date: "MAR 25", value: 29830, createdAt: now },
  { id: crypto.randomUUID(), userId, date: "MAR 26", value: 30410, createdAt: now },
  { id: crypto.randomUUID(), userId, date: "MAR 27", value: 31250, createdAt: now },
  { id: crypto.randomUUID(), userId, date: "MAR 28", value: 30780, createdAt: now },
  { id: crypto.randomUUID(), userId, date: "MAR 29", value: 31900, createdAt: now },
  { id: crypto.randomUUID(), userId, date: "MAR 30", value: 32560, createdAt: now },
  { id: crypto.randomUUID(), userId, date: "MAR 31", value: 33274, createdAt: now },
]);

console.log(`Seed concluído para userId: ${userId}`);
console.log("  - 8 investimentos inseridos");
console.log("  - 7 pontos do gráfico inseridos");
