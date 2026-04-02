import { relations } from "drizzle-orm";
import { sqliteTable, text, integer, real, index } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export const investment = sqliteTable(
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
    currentValue: real("current_value"), // valor atual em R$
    pctNum: real("pct_num").notNull(),
    positive: integer("positive", { mode: "boolean" }).notNull(),
    points: text("points").notNull(), // JSON array de números
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("investment_userId_idx").on(table.userId)],
);

export const portfolioChart = sqliteTable(
  "portfolio_chart",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    date: text("date").notNull(),
    value: real("value").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
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
