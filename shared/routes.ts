import { z } from 'zod';
import { insertTokenConfigSchema, insertPurchaseSchema, tokenConfig, purchases } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  content: {
    get: {
      method: 'GET' as const,
      path: '/api/content/:key' as const,
    },
    set: {
      method: 'POST' as const,
      path: '/api/content/:key' as const,
      input: z.object({ value: z.string() }),
    },
  },
  token: {
    get: {
      method: 'GET' as const,
      path: '/api/token' as const,
      responses: {
        200: z.custom<typeof tokenConfig.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/token' as const,
      input: insertTokenConfigSchema.partial(),
      responses: {
        200: z.custom<typeof tokenConfig.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  purchases: {
    list: {
      method: 'GET' as const,
      path: '/api/purchases' as const,
      responses: {
        200: z.array(z.custom<typeof purchases.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/purchases' as const,
      input: insertPurchaseSchema,
      responses: {
        201: z.custom<typeof purchases.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  paypal: {
    capture: {
      method: 'POST' as const,
      path: '/api/paypal/capture' as const,
      input: z.object({
        orderId: z.string(),
        recipientAddress: z.string(),
        usdAmount: z.string(),
      }),
      responses: {
        200: z.object({
          success: z.boolean(),
          transactionHash: z.string(),
          tokenAmount: z.string(),
          usdAmount: z.string(),
          recipient: z.string(),
        }),
        400: z.object({
          success: z.boolean(),
          message: z.string(),
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type TokenConfigResponse = z.infer<typeof api.token.get.responses[200]>;
export type TokenConfigUpdateInput = z.infer<typeof api.token.update.input>;
export type PurchasesListResponse = z.infer<typeof api.purchases.list.responses[200]>;
export type PurchaseInput = z.infer<typeof api.purchases.create.input>;
export type PurchaseResponse = z.infer<typeof api.purchases.create.responses[201]>;
