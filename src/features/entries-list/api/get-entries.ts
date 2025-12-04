import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type Entry = {
  id: string;
  personId: string;
  personName: string;
  incidentTime: string;
  fulfilledTime: string | null;
};

export type GetEntriesParams = {
  limit?: number;
  offset?: number;
};

export type GetEntriesResponse = Entry[];

export function getEntries(params?: GetEntriesParams) {
  const queryParams = new URLSearchParams();
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.offset) queryParams.append("offset", params.offset.toString());

  const url = `/entries${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return appFetch<GetEntriesResponse>(url, {
    method: "GET",
  });
}

export function useGetEntries(
  params?: GetEntriesParams,
  options?: UseQueryOptions<FetchResponse<GetEntriesResponse>, AppFetchError>
) {
  return useQuery<FetchResponse<GetEntriesResponse>, AppFetchError>({
    queryKey: ["entries", params],
    queryFn: () => getEntries(params),
    ...options,
  });
}
