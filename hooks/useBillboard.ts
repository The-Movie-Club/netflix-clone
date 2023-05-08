//useSWR will be a common method used in hooks. We use it to cache information once it is fetched to help optizmizr
// the site by being able to handle requests more quickly
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
