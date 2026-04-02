import { relations } from "drizzle-orm";
import { pgTable, text, boolean, timestamp, doublePrecision, index } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const investment = pgTable(
  "investment",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    ticker: text("ticker").notNull(),
    name: text("name").notNull(),
    category: text("category").notNull(), // 'renda_fixa' | 'renda_variavel' | 'cripto'
    qty: text("qty"),          // ex: "15 cotas", "0,05 BTC", "R$ 5.000"
    currentValue: doublePrecision("current_value"), // valor atual em R$
    pctNum: doublePrecision("pct_num").notNull(),
    positive: boolean("positive").notNull(),
    points: text("points").notNull(), // JSON array de números
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("investment_userId_idx").on(table.userId)],
);

export const portfolioChart = pgTable(
  "portfolio_chart",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    date: text("date").notNull(),
    value: doublePrecision("value").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  },
  (table) => [index("portfolio_chart_userId_idx").on(table.userId)],
);

export const investmentRelations = relations(investment, ({ one }) => ({
  user: one(user, {
    fields: [investment.userId],
    references: [user.id],
  }),
}));

export const portfolioChartRelations = relations(portfolioChart, ({ one }) => ({
  user: one(user, {
    fields: [portfolioChart.userId],
    references: [user.id],
  }),
}));
