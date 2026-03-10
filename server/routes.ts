import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { ethers, JsonRpcProvider, Wallet, Contract, parseUnits, isAddress } from "ethers";

const USUF_CONTRACT = "0x6c5bb1576Ce4D6A48dEEC014C06577d19676712d";
const USUF_DECIMALS = 18;

// ERC20 transfer function signature
const ERC20_ABI = ["function transfer(address to, uint256 amount) public returns (bool)"];

function isValidAddress(address: string): boolean {
  try {
    return isAddress(address) !== false;
  } catch {
    return false;
  }
}

async function transferUSUFTokens(
  recipientAddress: string,
  usdAmount: string,
  paypalOrderId: string
): Promise<string> {
  if (!isValidAddress(recipientAddress)) {
    throw new Error("Invalid recipient address format");
  }

  const privKey = process.env.TREASURY_PRIVATE_KEY;
  const rpcUrl = process.env.POLYGON_RPC;

  if (!privKey || !rpcUrl) {
    throw new Error("Missing TREASURY_PRIVATE_KEY or POLYGON_RPC environment variables");
  }

  try {
    // Check for duplicate transfer
    const existing = await storage.getTokenTransferByOrderId(paypalOrderId);
    if (existing && existing.status === "confirmed") {
      return existing.transactionHash || "";
    }

    // Create provider and signer
    const provider = new JsonRpcProvider(rpcUrl);
    const wallet = new Wallet(privKey, provider);

    // Create contract instance
    const contract = new Contract(USUF_CONTRACT, ERC20_ABI, wallet);

    // Convert USD to tokens (1 USD = 1 USUF)
    const tokenAmount = parseUnits(usdAmount, USUF_DECIMALS);

    // Execute transfer
    const tx = await contract.transfer(recipientAddress, tokenAmount);
    const receipt = await tx.wait(1);

    const txHash = receipt?.transactionHash;
    
    // Update transfer status
    await storage.updateTokenTransfer(paypalOrderId, {
      transactionHash: txHash,
      status: "confirmed"
    });

    return txHash;
  } catch (error: any) {
    const errorMsg = error.message || "Unknown error during token transfer";
    
    // Store error state
    try {
      const existing = await storage.getTokenTransferByOrderId(paypalOrderId);
      if (existing && existing.status === "pending") {
        await storage.updateTokenTransfer(paypalOrderId, {
          status: "failed",
          errorMessage: errorMsg
        });
      }
    } catch (updateError) {
      console.error("Failed to update transfer status:", updateError);
    }

    throw new Error(`Token transfer failed: ${errorMsg}`);
  }
}

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

  app.post(api.paypal.capture.path, async (req, res) => {
    try {
      const input = api.paypal.capture.input.parse(req.body);
      const { orderId, recipientAddress, usdAmount } = input;

      // Create transfer record
      let transfer = await storage.getTokenTransferByOrderId(orderId);
      if (!transfer) {
        transfer = await storage.createTokenTransfer({
          paypalOrderId: orderId,
          recipientAddress,
          tokenAmount: usdAmount,
          usdAmount,
          status: "pending"
        });
      }

      // Transfer tokens
      const txHash = await transferUSUFTokens(recipientAddress, usdAmount, orderId);

      // Return transaction confirmation
      res.json({
        success: true,
        transactionHash: txHash,
        tokenAmount: usdAmount,
        usdAmount,
        recipient: recipientAddress
      });
    } catch (err: any) {
      const errorMsg = err.message || "Token transfer failed";
      res.status(400).json({
        success: false,
        message: errorMsg
      });
    }
  });

  return httpServer;
}
