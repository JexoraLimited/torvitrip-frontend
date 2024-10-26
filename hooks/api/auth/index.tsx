import { IAuthResponse, ISignIn, ISignUp } from "@/types/api/auth";
import { APIResponse, IUser } from "@/types/common";
import http from "@/utils/http";
import { AxiosError } from "axios";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export const useSignUp = (): UseMutationResult<
  APIResponse<IAuthResponse>,
  AxiosError<APIResponse>,
  ISignUp
> => {
  const mutation = useMutation<
    APIResponse<IAuthResponse>,
    AxiosError<APIResponse>,
    ISignUp
  >(async (payload: ISignUp) => {
    const response = await http.post("/auth/register", payload);
    return response.data;
  });

  return mutation;
};

export const useSignIn = (): UseMutationResult<
  APIResponse<IAuthResponse>,
  AxiosError<APIResponse>,
  ISignIn
> => {
  const mutation = useMutation<
    APIResponse<IAuthResponse>,
    AxiosError<APIResponse>,
    ISignIn
  >(async (payload: ISignIn) => {
    const response = await http.post("/auth/login", payload);
    return response.data;
  });

  return mutation;
};

export const useVerifyCode = (): UseMutationResult<
  APIResponse<IAuthResponse>,
  AxiosError<APIResponse>,
  string
> => {
  const mutation = useMutation<
    APIResponse<IAuthResponse>,
    AxiosError<APIResponse>,
    string
  >(async (payload: string) => {
    const response = await http.put("/auth/verify-email", { code: payload });
    return response.data;
  });

  return mutation;
};

export const useChangePassword = (): UseMutationResult<
  APIResponse<string>,
  AxiosError<APIResponse>,
  { old_password: string; new_password: string }
> => {
  const mutation = useMutation<
    APIResponse<string>,
    AxiosError<APIResponse>,
    { old_password: string; new_password: string }
  >(async (payload) => {
    const response = await http.post("/auth/change-password", payload);
    return response.data;
  });

  return mutation;
};

export const useGetMe = (
  queryOptions?: UseQueryOptions<APIResponse<IUser>, AxiosError<APIResponse>>
): UseQueryResult<APIResponse<IUser>, AxiosError<APIResponse>> => {
  return useQuery<APIResponse<IUser>, AxiosError<APIResponse>>({
    queryFn: async () => {
      const response = await http.get("/auth/me");
      return response.data;
    },
    ...queryOptions,
  });
};
