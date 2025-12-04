import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type CreateGroupRequest = {
  slug: string;
  name: string;
  description: string | null;
};

export type CreateGroupResponse = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

export function postCreateGroup(data: CreateGroupRequest) {
  const url = `/groups`;
  return appFetch<CreateGroupResponse>(url, {
    method: "POST",
    body: data,
  });
}

export function usePostCreateGroup(
  options?: UseMutationOptions<
    FetchResponse<CreateGroupResponse>,
    AppFetchError,
    CreateGroupRequest
  >
) {
  return useMutation<
    FetchResponse<CreateGroupResponse>,
    AppFetchError,
    CreateGroupRequest
  >({
    mutationFn: postCreateGroup,
    ...options,
  });
}
