import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type CreateEntryRequest = {
  personId: string;
  incidentTime: string;
  fulfilledTime: string | null;
};

export type CreateEntryResponse = {
  id: string;
  person: {
    id: string;
    name: string;
  };
  incidentTime: string;
  fulfilledTime: string | null;
};

export function postCreateEntry(groupSlug: string, data: CreateEntryRequest) {
  const url = `/groups/${groupSlug}/entries`;
  return appFetch<CreateEntryResponse>(url, {
    method: "POST",
    body: data,
  });
}

export function usePostCreateEntry(
  groupSlug: string,
  options?: UseMutationOptions<
    FetchResponse<CreateEntryResponse>,
    AppFetchError,
    CreateEntryRequest
  >
) {
  return useMutation<
    FetchResponse<CreateEntryResponse>,
    AppFetchError,
    CreateEntryRequest
  >({
    mutationFn: (data: CreateEntryRequest) => postCreateEntry(groupSlug, data),
    ...options,
  });
}
