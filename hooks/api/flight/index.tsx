import { IFlightFilterQuery } from "@/types/api/flight";
import {
  APIResponse,
  IFlightFilterResponse,
  IFlightOfferSearchResponse,
} from "@/types/common";
import http from "@/utils/http";
import { AxiosError } from "axios";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "react-query";

export const useSearchFlights = (
  mutationOptions?: UseMutationOptions<
    APIResponse<IFlightOfferSearchResponse>,
    AxiosError<APIResponse>,
    any
  >
): UseMutationResult<
  APIResponse<IFlightOfferSearchResponse>,
  AxiosError<APIResponse>,
  any
> => {
  const mutation = useMutation<
    APIResponse<IFlightOfferSearchResponse>,
    AxiosError<APIResponse>,
    any
  >({
    mutationFn: async (payload) => {
      const response = await http.post<APIResponse<IFlightOfferSearchResponse>>(
        "/flight/flight-offers-search",
        payload
      );
      return response.data;
    },
    ...mutationOptions,
  });
  return mutation;
};

export const useFilterFlights = (
  mutationOptions?: UseMutationOptions<
    APIResponse<IFlightFilterResponse>,
    AxiosError<APIResponse>,
    IFlightFilterQuery
  >
): UseMutationResult<
  APIResponse<IFlightFilterResponse>,
  AxiosError<APIResponse>,
  IFlightFilterQuery
> => {
  const mutation = useMutation<
    APIResponse<IFlightFilterResponse>,
    AxiosError<APIResponse>,
    IFlightFilterQuery
  >({
    mutationFn: async (payload) => {
      const response = await http.post<APIResponse<IFlightFilterResponse>>(
        "/flight/filter-search",
        payload
      );
      return response.data;
    },
    ...mutationOptions,
  });
  return mutation;
};
