import { ISignUp } from "@/types/api/auth";
import { APIResponse, IFlightOfferSearchResponse } from "@/types/common";
import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      APIResponse<IFlightOfferSearchResponse>,
      ISignUp
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
