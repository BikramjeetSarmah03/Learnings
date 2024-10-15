import { hc, InferResponseType } from "hono/client";

import type { ApiRoutes, ErrorResponse, SuccessResponse } from "@/shared/types";
import { queryOptions } from "@tanstack/react-query";
import type { SortBy, OrderBy } from "@/shared/types";

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

export const getPosts = async ({
  pageParam = 1,
  pagination,
}: {
  pageParam: number;
  pagination: {
    sortBy?: SortBy;
    order?: OrderBy;
    author?: string;
    site?: string;
  };
}) => {
  const res = await client.posts.$get({
    query: {
      page: pageParam.toString(),
      sortBy: pagination.sortBy,
      order: pagination.order,
      author: pagination.author,
      site: pagination.site,
    },
  });

  if (!res.ok) {
    const data = (await res.json()) as unknown as ErrorResponse;

    throw new Error(data.error);
  }

  const data = await res.json();
  return data;
};

export async function upvotePost(id: string) {
  const res = await client.posts[":id"].upvote.$post({
    param: {
      id,
    },
  });

  if (res.ok) {
    const data = await res.json();

    return data;
  }

  const data = (await res.json()) as unknown as ErrorResponse;
  throw new Error(data.error);
}

export type GetPostsSuccess = InferResponseType<typeof client.posts.$get>;
