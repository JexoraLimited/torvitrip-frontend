import { AxiosError } from "axios";
import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

import { APIResponse, ILocation } from "@/types/common";
import http from "@/utils/http";

export const useFetchLocation = (
  queryOptions?: UseQueryOptions<any, any>
): UseQueryResult<APIResponse<ILocation[]>, AxiosError<APIResponse>> => {
  return useQuery({
    queryKey: "locations",
    queryFn: async () => {
      const response = await http.get<APIResponse<ILocation[]>>("/location");
      return response.data;
    },
    ...queryOptions,
  });
};
