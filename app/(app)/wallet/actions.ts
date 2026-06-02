"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { investment } from "@/db/portfolio-schema";
import { requireSession } from "@/lib/session";

const TIPO_TO_CATEGORY: Record<string, string> = {
  Ação: "renda_variavel",
  Fundo: "renda_variavel",
  Cripto: "cripto",
  "Renda Fixa": "renda_fixa",
};

function buildQtyString(tipo: string, quantidade: number, ticker: string): string {
  switch (tipo) {
    case "Ação":
      return `${quantidade} ${quantidade === 1 ? "ação" : "ações"}`;
    case "Fundo":
      return `${quantidade} ${quantidade === 1 ? "cota" : "cotas"}`;
    case "Cripto":
      return `${quantidade} ${ticker.toUpperCase()}`;
    case "Renda Fixa":
      return (
        "R$ " +
        quantidade.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    default:
      return String(quantidade);
  }
}

export async function removeInvestment(id: string): Promise<{ success: boolean; error?: string }> {
  if (!id) return { success: false, error: "ID inválido." };
  const { user: sessionUser } = await requireSession();
  // Só remove se o investimento pertencer ao usuário logado.
  await db
    .delete(investment)
    .where(and(eq(investment.id, id), eq(investment.userId, sessionUser.id)));
  revalidatePath("/wallet");
  revalidatePath("/dashboard");
  return { success: true };
}

export type AddInvestmentResult =
  | { success: true }
  | { success: false; error: string };

export async function addInvestment(data: {
  ticker: string;
  name: string;
  tipo: string;
  quantidade: number;
  preco: number;
}): Promise<AddInvestmentResult> {
  // Validação server-side (defesa em profundidade)
  if (!data.ticker?.trim()) return { success: false, error: "Ticker obrigatório." };
  if (!data.name?.trim()) return { success: false, error: "Nome obrigatório." };
  if (!TIPO_TO_CATEGORY[data.tipo]) return { success: false, error: "Tipo inválido." };
  if (!Number.isFinite(data.quantidade) || data.quantidade <= 0)
    return { success: false, error: "Quantidade deve ser maior que zero." };
  if (!Number.isFinite(data.preco) || data.preco <= 0)
    return { success: false, error: "Preço deve ser maior que zero." };

  const { user: sessionUser } = await requireSession();

  const category = TIPO_TO_CATEGORY[data.tipo];
  // Para Renda Fixa, quantidade = valor investido (preco = 1)
  const currentValue =
    data.tipo === "Renda Fixa"
      ? data.quantidade
      : data.quantidade * data.preco;
  const qtyString = buildQtyString(data.tipo, data.quantidade, data.ticker);
  const now = new Date();

  await db.insert(investment).values({
    id: crypto.randomUUID(),
    userId: sessionUser.id,
    ticker: data.ticker.trim().toUpperCase(),
    name: data.name.trim(),
    category,
    qty: qtyString,
    currentValue,
    pctNum: 0,
    positive: true,
    points: JSON.stringify([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]),
    createdAt: now,
    updatedAt: now,
  });

  revalidatePath("/wallet");
  revalidatePath("/dashboard");
  return { success: true };
}
