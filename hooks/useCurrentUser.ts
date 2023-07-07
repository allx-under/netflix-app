import fetcher from "@/lib/fetcher";
import useSwr from "swr";

const useCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSwr("/api/current", fetcher);
  return { data, isLoading, error, mutate };
};

export default useCurrentUser;
