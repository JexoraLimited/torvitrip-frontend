import { APIResponse, IAirport } from "@/types/common";
import apiSlice from "../api/apiSlice";

const airportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchAirports: builder.query<APIResponse<IAirport[]>, string>({
      query: (keyword) => ({
        url: `/airport/airport-search?keyword=${keyword}`,
      }),
    }),
  }),
});

export const { useSearchAirportsQuery } = airportApi;
