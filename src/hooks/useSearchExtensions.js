import { useQuery } from "@tanstack/react-query";
import { fetchExtensions, fetchStats } from "@/api/api";

export const useSearchExtensions = (query, page) => {
  return useQuery({
    queryKey: ['extensions', query, page],
    queryFn: () => fetchExtensions(query, page),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 5分钟缓存
  });
};

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });
};
