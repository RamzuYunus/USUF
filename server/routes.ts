import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get('/api/content/:key', async (req, res) => {
    const { key } = req.params;
    const value = await storage.getPageContent(key);
    if (value === undefined) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ key, value });
  });

  app.post('/api/content/:key', async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    if (typeof value !== 'string') {
      return res.status(400).json({ message: 'value must be a string' });
    }
    await storage.setPageContent(key, value);
    res.json({ key, value });
  });

  app.get(api.token.get.path, async (req, res) => {
    let config = await storage.getTokenConfig();
    if (!config) {
      // Seed default config if none exists
      config = await storage.updateTokenConfig({
        price: "0.10", // 10 cents per USUF
        totalSupply: "10000000", // 10 million USUF
        availableSupply: "10000000"
      });
    }
    res.json(config);
  });

  app.patch(api.token.update.path, async (req, res) => {
    try {
      const input = api.token.update.input.parse(req.body);
      const updated = await storage.updateTokenConfig(input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.purchases.list.path, async (req, res) => {
    const list = await storage.getPurchases();
    res.json(list);
  });

  app.post(api.purchases.create.path, async (req, res) => {
    try {
      const input = api.purchases.create.input.parse(req.body);
      const purchase = await storage.createPurchase(input);
      res.status(201).json(purchase);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
