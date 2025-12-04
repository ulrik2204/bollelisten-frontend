import { env } from "@/config/env";

export type FetchResponse<T> = {
  body: T;
  status: number;
  statusText: string;
};

export class AppFetchError extends Error {
  constructor(public info: FetchResponse<string>) {
    super(info.body);
    this.name = "AppFetchError";
  }

  toString() {
    return `AppFetchError: ${this.info.status} ${this.info.statusText} - ${this.info.body}`;
  }
}

function getOrCreateSessionId() {
  if (!sessionStorage.getItem("sessionId")) {
    const sessionId = crypto.randomUUID();
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionStorage.getItem("sessionId")!;
}

export async function appFetch<TResponse>(
  url: string,
  options?: Omit<RequestInit, "body"> & {
    baseUrl?: string;
    body?: Record<string, unknown>;
  }
): Promise<FetchResponse<TResponse>> {
  const { baseUrl, body, ...restOptions } = options || {};
  const backendUrl = baseUrl || env.backendUrl || "";
  const res = await fetch(`${backendUrl}${url}`, {
    ...restOptions,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      "X-SessionId": getOrCreateSessionId(),
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new AppFetchError({
      status: res.status,
      statusText: res.statusText,
      body: await res.text(),
    });
  }
  return {
    body: (await res.json().catch(() => null)) as TResponse,
    status: res.status,
    statusText: res.statusText,
  };
}
