import { useQuery } from "@tanstack/react-query";
import { getTotalUsuarios, getTotalTests } from "../api";

export function useDashboardData() {
  const {
    data: totalUsuarios,
    isLoading: loadingUsuarios,
    error: errorUsuarios,
  } = useQuery<number, Error>({
    queryKey: ["totalUsuarios"],
    queryFn: getTotalUsuarios,
  });

  const {
    data: totalTests,
    isLoading: loadingTests,
    error: errorTests,
  } = useQuery<{ vark: number; mbti: number }, Error>({
    queryKey: ["totalTests"],
    queryFn: getTotalTests,
  });

  return {
    totalUsuarios,
    totalTests,
    loading: loadingUsuarios || loadingTests,
    error: errorUsuarios || errorTests,
  };
}
