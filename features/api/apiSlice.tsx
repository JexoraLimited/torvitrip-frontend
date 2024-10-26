import { Keys } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: Keys.API_BASE_URL,
  }),
  endpoints: () => ({}),
});

export default apiSlice;
