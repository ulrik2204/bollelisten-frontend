import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";

export type CreatePersonRequest = {
  name: string;
};

export type CreatePersonResponse = {
  id: string;
  name: string;
  groupId: string;
};

export function postCreatePerson(groupSlug: string, data: CreatePersonRequest) {
  const url = `/groups/${groupSlug}/people`;
  return appFetch<CreatePersonResponse>(url, {
    method: "POST",
    body: data,
  });
}

export function usePostCreatePerson(
  groupSlug: string,
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
    mutationFn: (data: CreatePersonRequest) =>
      postCreatePerson(groupSlug, data),
    ...options,
  });
}
