import { appFetch, AppFetchError, FetchResponse } from "@/lib/fetch-client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function postLogin(groupSlug: string) {
  const url = `/login`;
  return appFetch<void>(url, {
    method: "POST",
    body: { groupSlug },
  });
}

export function usePostLogin(
  options?: UseMutationOptions<FetchResponse<void>, AppFetchError, string>
) {
  return useMutation<FetchResponse<void>, AppFetchError, string>({
    mutationFn: postLogin,
    ...options,
  });
}
