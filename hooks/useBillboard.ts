import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, error, isLoading } = useSWR(
    "/api/random",
    fetcher
    //an optional argument to look into
    //   {
    //     revalidateIfStale: false,
    //     revalidateOnFocus: false,
    //     revalidateOnReconnect: false,
    //   }
  );

  return { data, error, isLoading };
};
export default useBillboard;
