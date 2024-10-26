import { APIResponse, IFile } from "@/types/common";
import http from "@/utils/http";
import { AxiosError } from "axios";
import { UseMutationResult, useMutation } from "react-query";

export const useUploadFile = (): UseMutationResult<
  APIResponse<IFile>,
  AxiosError<APIResponse>,
  File
> => {
  const mutation = useMutation<
    APIResponse<IFile>,
    AxiosError<APIResponse>,
    File
  >(async (payload: File) => {
    const formData = new FormData();
    formData.append("file", payload);
    const response = await http.post<APIResponse<IFile>>("/file", formData);
    return response.data;
  });
  return mutation;
};
