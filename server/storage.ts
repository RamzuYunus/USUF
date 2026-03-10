import { db } from "./db";
import {
  tokenConfig,
  purchases,
  pageContent,
  tokenTransfers,
  type TokenConfig,
  type UpdateTokenConfigRequest,
  type Purchase,
  type InsertPurchase,
  type TokenTransfer,
  type InsertTokenTransfer
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getTokenConfig(): Promise<TokenConfig | undefined>;
  updateTokenConfig(updates: UpdateTokenConfigRequest): Promise<TokenConfig>;
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchases(): Promise<Purchase[]>;
  getPageContent(key: string): Promise<string | undefined>;
  setPageContent(key: string, value: string): Promise<void>;
  createTokenTransfer(transfer: InsertTokenTransfer): Promise<TokenTransfer>;
  getTokenTransferByOrderId(orderId: string): Promise<TokenTransfer | undefined>;
  updateTokenTransfer(orderId: string, updates: Partial<InsertTokenTransfer>): Promise<TokenTransfer>;
}

export class DatabaseStorage implements IStorage {
  async getTokenConfig(): Promise<TokenConfig | undefined> {
    const [config] = await db.select().from(tokenConfig).limit(1);
    return config;
  }

  async updateTokenConfig(updates: UpdateTokenConfigRequest): Promise<TokenConfig> {
    const existing = await this.getTokenConfig();
    if (!existing) {
      const [newConfig] = await db.insert(tokenConfig).values({
        price: updates.price ?? "1.00",
        totalSupply: updates.totalSupply ?? "1000000",
        availableSupply: updates.availableSupply ?? "1000000",
        externalSaleUrl: updates.externalSaleUrl ?? null,
      }).returning();
      return newConfig;
    }

    const [updated] = await db.update(tokenConfig)
      .set(updates)
      .where(eq(tokenConfig.id, existing.id))
      .returning();
    return updated;
  }

  async createPurchase(purchase: InsertPurchase): Promise<Purchase> {
    const [newPurchase] = await db.insert(purchases).values(purchase).returning();
    
    // Update available supply
    const config = await this.getTokenConfig();
    if (config) {
      const currentSupply = parseFloat(config.availableSupply);
      const purchasedAmount = parseFloat(purchase.amount);
      const newSupply = Math.max(0, currentSupply - purchasedAmount).toFixed(4); // Use toFixed(4)
      
      await this.updateTokenConfig({ availableSupply: newSupply });
    }
    
    return newPurchase;
  }

  async getPurchases(): Promise<Purchase[]> {
    return await db.select().from(purchases).orderBy(desc(purchases.createdAt));
  }

  async getPageContent(key: string): Promise<string | undefined> {
    const [row] = await db.select().from(pageContent).where(eq(pageContent.key, key));
    return row?.value;
  }

  async setPageContent(key: string, value: string): Promise<void> {
    await db.insert(pageContent)
      .values({ key, value })
      .onConflictDoUpdate({ target: pageContent.key, set: { value } });
  }

  async createTokenTransfer(transfer: InsertTokenTransfer): Promise<TokenTransfer> {
    const [newTransfer] = await db.insert(tokenTransfers).values(transfer).returning();
    return newTransfer;
  }

  async getTokenTransferByOrderId(orderId: string): Promise<TokenTransfer | undefined> {
    const [transfer] = await db.select().from(tokenTransfers).where(eq(tokenTransfers.paypalOrderId, orderId));
    return transfer;
  }

  async updateTokenTransfer(orderId: string, updates: Partial<InsertTokenTransfer>): Promise<TokenTransfer> {
    const [updated] = await db.update(tokenTransfers)
      .set(updates)
      .where(eq(tokenTransfers.paypalOrderId, orderId))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
