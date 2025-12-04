import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type CreateEntryRequest = {
  personId: string;
  incidentTime: string;
  fulfilledTime: string | null;
};

export type CreateEntryResponse = {
  id: string;
  personId: string;
  personName: string;
  incidentTime: string;
  fulfilledTime: string | null;
};

export function postCreateEntry(data: CreateEntryRequest) {
  const url = `/entries`;
  return appFetch<CreateEntryResponse>(url, {
    method: "POST",
    body: data,
  });
}

export function usePostCreateEntry(
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
    mutationFn: postCreateEntry,
    ...options,
  });
}
