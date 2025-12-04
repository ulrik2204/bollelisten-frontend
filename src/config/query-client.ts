import { QueryClient } from "@tanstack/react-query";

import { AppFetchError } from "@/lib/fetch-client";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // By default only retry up to 3 times only on network errors
        retry: (failureCount, error) => {
          const shouldKeepTrying = failureCount < 3;
          if (error instanceof AppFetchError && shouldKeepTrying) {
            return error.info.status >= 500;
          }
          return shouldKeepTrying;
        },
      },
    },
  });
}
