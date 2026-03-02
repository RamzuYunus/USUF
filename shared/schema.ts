import { pgTable, text, serial, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pageContent = pgTable("page_content", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const tokenConfig = pgTable("token_config", {
  id: serial("id").primaryKey(),
  price: numeric("price").notNull(), // String representation of decimal
  totalSupply: numeric("total_supply").notNull(),
  availableSupply: numeric("available_supply").notNull(),
  externalSaleUrl: text("external_sale_url"),
});

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  amount: numeric("amount").notNull(),
  totalCost: numeric("total_cost").notNull(),
  paymentMethod: text("payment_method").default("blockchain"),
  status: text("status").default("completed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTokenConfigSchema = createInsertSchema(tokenConfig).omit({ id: true });
export const insertPurchaseSchema = createInsertSchema(purchases).omit({ id: true, createdAt: true });

export type TokenConfig = typeof tokenConfig.$inferSelect;
export type InsertTokenConfig = z.infer<typeof insertTokenConfigSchema>;
export type UpdateTokenConfigRequest = Partial<InsertTokenConfig>;

export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type CreatePurchaseRequest = InsertPurchase;
