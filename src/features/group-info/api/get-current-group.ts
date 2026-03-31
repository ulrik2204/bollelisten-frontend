import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type Group = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

export type GetCurrentGroupResponse = Group;

export function getGroup(groupSlug: string) {
  const url = `/groups/${groupSlug}`;
  return appFetch<GetCurrentGroupResponse>(url, {
    method: "GET",
  });
}

export function useGetGroup(
  groupSlug: string,
  options?: UseQueryOptions<
    FetchResponse<GetCurrentGroupResponse>,
    AppFetchError
  >
) {
  return useQuery<FetchResponse<GetCurrentGroupResponse>, AppFetchError>({
    queryKey: ["groups", groupSlug],
    queryFn: () => getGroup(groupSlug),
    enabled: !!groupSlug,
    ...options,
  });
}
