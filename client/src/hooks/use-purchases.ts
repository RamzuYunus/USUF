import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type PurchaseInput } from "@shared/routes";
import { useToast } from "./use-toast";

export function usePurchases() {
  return useQuery({
    queryKey: [api.purchases.list.path],
    queryFn: async () => {
      const res = await fetch(api.purchases.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch purchases");
      return api.purchases.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreatePurchase() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: PurchaseInput) => {
      const res = await fetch(api.purchases.create.path, {
        method: api.purchases.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.purchases.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to complete purchase");
      }
      return api.purchases.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.purchases.list.path] });
      // Also invalidate token config as available supply would change
      queryClient.invalidateQueries({ queryKey: [api.token.get.path] });
    },
    onError: (error) => {
      toast({
        title: "Transaction Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });
}
