import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  return { data, error, isLoading, mutate };
};
export default useCurrentUser;

//This is similar to react query and is used for fetching data. it acts similarly to gsm when maintaining current user.
// instead of having to fetch and figure out who the current user is with redux we store the data here locally and just use it throughout
