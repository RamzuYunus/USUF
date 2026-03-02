import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";

export function usePageContent<T>(key: string, defaultValue: T) {
  const { data, isLoading } = useQuery<{ key: string; value: string } | null>({
    queryKey: ["/api/content", key],
    queryFn: async () => {
      const res = await fetch(`/api/content/${key}`);
      if (!res.ok) return null;
      return res.json();
    },
    retry: false,
  });

  const parsed: T = (() => {
    if (!data?.value) return defaultValue;
    try {
      return JSON.parse(data.value) as T;
    } catch {
      return defaultValue;
    }
  })();

  return { content: parsed, isLoading };
}

export function useSetPageContent() {
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: unknown }) => {
      return apiRequest("POST", `/api/content/${key}`, { value: JSON.stringify(value) });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/content", variables.key] });
    },
  });
}
