import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type Group = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
};

export type GetCurrentGroupResponse = Group;

export function getCurrentGroup() {
  const url = `/groups/current`;
  return appFetch<GetCurrentGroupResponse>(url, {
    method: "GET",
  });
}

export function useGetCurrentGroup(
  options?: UseQueryOptions<
    FetchResponse<GetCurrentGroupResponse>,
    AppFetchError
  >
) {
  return useQuery<FetchResponse<GetCurrentGroupResponse>, AppFetchError>({
    queryKey: ["groups", "current"],
    queryFn: getCurrentGroup,
    ...options,
  });
}
