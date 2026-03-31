import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Entry } from "./get-entries";

export function getEntry(groupSlug: string, entryId: string) {
  const url = `/groups/${groupSlug}/entries/${entryId}`;
  return appFetch<Entry>(url, {
    method: "GET",
  });
}

export function useGetEntry(
  groupSlug: string,
  entryId: string,
  options?: UseQueryOptions<FetchResponse<Entry>, AppFetchError>
) {
  return useQuery<FetchResponse<Entry>, AppFetchError>({
    queryKey: ["entry", groupSlug, entryId],
    queryFn: () => getEntry(groupSlug, entryId),
    enabled: !!groupSlug && !!entryId,
    ...options,
  });
}
