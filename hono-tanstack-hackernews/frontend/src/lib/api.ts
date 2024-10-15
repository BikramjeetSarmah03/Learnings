import { hc } from "hono/client";

import type { ApiRoutes, ErrorResponse, SuccessResponse } from "@/shared/types";
import { queryOptions } from "@tanstack/react-query";

const client = hc<ApiRoutes>("/", {
  fetch: (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
}).api.v1;

export const postSignup = async (username: string, password: string) => {
  try {
    const res = await client.auth.signup.$post({
      json: {
        username,
        password,
      },
    });

    if (res.ok) {
      const data = (await res.json()) as SuccessResponse;
      return data;
    }

    const data = (await res.json()) as unknown as ErrorResponse;

    return data;
  } catch (e) {
    return {
      success: false,
      error: String(e),
      isFormError: false,
    } as ErrorResponse;
  }
};

export const postLogin = async (username: string, password: string) => {
  try {
    const res = await client.auth.login.$post({
      json: {
        username,
        password,
      },
    });

    if (res.ok) {
      const data = (await res.json()) as SuccessResponse;
      return data;
    }

    const data = (await res.json()) as unknown as ErrorResponse;

    return data;
  } catch (e) {
    return {
      success: false,
      error: String(e),
      isFormError: false,
    } as ErrorResponse;
  }
};

export const getUser = async () => {
  const res = await client.auth.user.$get();

  const data = await res.json();

  if (data.success) {
    return data.data.username;
  }

  return null;
};

export const userQueryOptions = () =>
  queryOptions({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
  });
