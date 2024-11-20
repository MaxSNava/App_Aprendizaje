import { useQuery } from "@tanstack/react-query";
import { getAuth } from "../api";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuth,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
};
