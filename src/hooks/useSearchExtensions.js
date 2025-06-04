import { useQuery } from "@tanstack/react-query";
import { fetchExtensions } from "@/api/api";

export const useSearchExtensions = (query) => {
  return useQuery({
    queryKey: ['extensions', query],
    queryFn: () => fetchExtensions(query),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 5分钟缓存
  });
};
