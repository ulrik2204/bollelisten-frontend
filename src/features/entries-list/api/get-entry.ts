import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Entry } from "./get-entries";

export function getEntry(entryId: string) {
  const url = `/entries/${entryId}`;
  return appFetch<Entry>(url, {
    method: "GET",
  });
}

export function useGetEntry(
  entryId: string,
  options?: UseQueryOptions<FetchResponse<Entry>, AppFetchError>
) {
  return useQuery<FetchResponse<Entry>, AppFetchError>({
    queryKey: ["entry", entryId],
    queryFn: () => getEntry(entryId),
    enabled: !!entryId,
    ...options,
  });
}
