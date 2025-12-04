import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type CreatePersonRequest = {
  name: string;
};

export type CreatePersonResponse = {
  id: string;
  name: string;
  groupId: string;
};

export function postCreatePerson(data: CreatePersonRequest) {
  const url = `/people`;
  return appFetch<CreatePersonResponse>(url, {
    method: "POST",
    body: data,
  });
}

export function usePostCreatePerson(
  options?: UseMutationOptions<
    FetchResponse<CreatePersonResponse>,
    AppFetchError,
    CreatePersonRequest
  >
) {
  return useMutation<
    FetchResponse<CreatePersonResponse>,
    AppFetchError,
    CreatePersonRequest
  >({
    mutationFn: postCreatePerson,
    ...options,
  });
}
