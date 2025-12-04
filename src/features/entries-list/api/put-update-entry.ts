import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type UpdateEntryRequest = {
  incidentTime?: string | null;
  fulfilledTime?: string | null;
};

export type UpdateEntryResponse = {
  id: string;
  personId: string;
  personName: string;
  incidentTime: string;
  fulfilledTime: string | null;
};

export function putUpdateEntry(entryId: string, data: UpdateEntryRequest) {
  const url = `/entries/${entryId}`;
  return appFetch<UpdateEntryResponse>(url, {
    method: "PUT",
    body: data,
  });
}

export function usePutUpdateEntry(
  options?: UseMutationOptions<
    FetchResponse<UpdateEntryResponse>,
    AppFetchError,
    { entryId: string; data: UpdateEntryRequest }
  >
) {
  return useMutation<
    FetchResponse<UpdateEntryResponse>,
    AppFetchError,
    { entryId: string; data: UpdateEntryRequest }
  >({
    mutationFn: ({ entryId, data }) => putUpdateEntry(entryId, data),
    ...options,
  });
}
