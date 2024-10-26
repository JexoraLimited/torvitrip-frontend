import { IEditAccountPayload } from "@/types/api/user";
import { APIResponse, DeleteAccountReason, IUser } from "@/types/common";
import http from "@/utils/http";
import { AxiosError } from "axios";
import { UseMutationResult, useMutation } from "react-query";

export const useChangeProfilePicture = (): UseMutationResult<
  APIResponse<IUser>,
  AxiosError<APIResponse>,
  string
> => {
  const mutation = useMutation<
    APIResponse<IUser>,
    AxiosError<APIResponse>,
    string
  >(async (payload: string) => {
    const response = await http.put("/user/change-profile-pic", {
      profile_pic: payload,
    });
    return response.data;
  });

  return mutation;
};

export const useEditAccount = (): UseMutationResult<
  APIResponse<IUser>,
  AxiosError<APIResponse>,
  IEditAccountPayload
> => {
  const mutation = useMutation<
    APIResponse<IUser>,
    AxiosError<APIResponse>,
    IEditAccountPayload
  >(async (payload) => {
    const response = await http.put("/user/me/update", payload);
    return response.data;
  });

  return mutation;
};

export const useDeleteAccount = (): UseMutationResult<
  APIResponse<IUser>,
  AxiosError<APIResponse>,
  { reason: DeleteAccountReason; comment: string }
> => {
  const mutation = useMutation<
    APIResponse<IUser>,
    AxiosError<APIResponse>,
    { reason: DeleteAccountReason; comment: string }
  >(async (payload) => {
    const response = await http.post("/user/me/delete", payload);
    return response.data;
  });

  return mutation;
};
