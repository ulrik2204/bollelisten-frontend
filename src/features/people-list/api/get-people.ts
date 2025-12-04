import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type Person = {
  id: string;
  name: string;
  groupId: string;
};

export type GetPeopleResponse = Person[];

export function getPeople() {
  const url = `/people`;
  return appFetch<GetPeopleResponse>(url, {
    method: "GET",
  });
}

export function useGetPeople(
  options?: UseQueryOptions<FetchResponse<GetPeopleResponse>, AppFetchError>
) {
  return useQuery<FetchResponse<GetPeopleResponse>, AppFetchError>({
    queryKey: ["people"],
    queryFn: getPeople,
    ...options,
  });
}
