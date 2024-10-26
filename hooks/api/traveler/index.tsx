import { ICreateTravelerPayload } from "@/types/api/traveler";
import { APIResponse, IPaginatedAPIResponse, ITraveler } from "@/types/common";
import { getSearchParams } from "@/utils/common";
import http from "@/utils/http";
import { AxiosError } from "axios";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export const useGetTravelers = (
  queryOptions?: UseQueryOptions<
    IPaginatedAPIResponse<ITraveler>,
    AxiosError<APIResponse>,
    IPaginatedAPIResponse<ITraveler>,
    ["travelers", { offset: number; limit: number }]
  >
): UseQueryResult<
  IPaginatedAPIResponse<ITraveler>,
  AxiosError<APIResponse>
> => {
  return useQuery({
    ...queryOptions,
    queryFn: async (_params) => {
      const searchParams = getSearchParams(_params.queryKey[1]);
      const response = await http.get<IPaginatedAPIResponse<ITraveler>>(
        `/traveler?${searchParams.toString()}`
      );
      return response.data;
    },
  });
};

export const useCreateTraveler = (): UseMutationResult<
  APIResponse<ITraveler>,
  AxiosError<APIResponse>,
  ICreateTravelerPayload
> => {
  const mutation = useMutation<
    APIResponse<ITraveler>,
    AxiosError<APIResponse>,
    ICreateTravelerPayload
  >(async (payload) => {
    const response = await http.post<APIResponse<ITraveler>>(
      "/traveler",
      payload
    );
    return response.data;
  });
  return mutation;
};

export const useEditTraveler = (): UseMutationResult<
  APIResponse<ITraveler>,
  AxiosError<APIResponse>,
  { id: string; data: ICreateTravelerPayload }
> => {
  const mutation = useMutation<
    APIResponse<ITraveler>,
    AxiosError<APIResponse>,
    { id: string; data: ICreateTravelerPayload }
  >(async (payload) => {
    const response = await http.put<APIResponse<ITraveler>>(
      `/traveler/${payload.id}`,
      payload.data
    );
    return response.data;
  });
  return mutation;
};

export const useDeleteTraveler = (): UseMutationResult<
  APIResponse<string>,
  AxiosError<APIResponse>,
  string
> => {
  const mutation = useMutation<
    APIResponse<string>,
    AxiosError<APIResponse>,
    string
  >(async (id) => {
    const response = await http.delete<APIResponse<string>>(`/traveler/${id}`);
    return response.data;
  });
  return mutation;
};
