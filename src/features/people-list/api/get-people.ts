import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";

export type Person = {
  id: string;
  name: string;
  groupId: string;
};

export type GetPeopleResponse = Person[];

export function getPeople(groupSlug: string) {
  const url = `/groups/${groupSlug}/people`;
  return appFetch<GetPeopleResponse>(url, {
    method: "GET",
  });
}

export function useGetPeople(
  groupSlug: string,
  options?: UseQueryOptions<FetchResponse<GetPeopleResponse>, AppFetchError>
) {
  return useQuery<FetchResponse<GetPeopleResponse>, AppFetchError>({
    queryKey: ["people", groupSlug],
    queryFn: () => getPeople(groupSlug),
    enabled: !!groupSlug,
    ...options,
  });
}
