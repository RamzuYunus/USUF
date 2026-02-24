import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type TokenConfigUpdateInput } from "@shared/routes";
import { useToast } from "./use-toast";

export function useTokenConfig() {
  return useQuery({
    queryKey: [api.token.get.path],
    queryFn: async () => {
      const res = await fetch(api.token.get.path, { credentials: "include" });
      if (res.status === 404) return null; // Handle uninitialized DB state
      if (!res.ok) throw new Error("Failed to fetch token config");
      return api.token.get.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateTokenConfig() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: TokenConfigUpdateInput) => {
      const res = await fetch(api.token.update.path, {
        method: api.token.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.token.update.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to update token config");
      }
      return api.token.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.token.get.path] });
      toast({
        title: "Success",
        description: "Token configuration updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });
}
