import { createFileRoute } from "@tanstack/react-router";

import { z } from "zod";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { orderBySchema, sortBySchema } from "@/shared/types";
import {
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { getPosts } from "@/lib/api";
import { SortBar } from "@/components/sort-bar";
import { PostCard } from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { useUpvotePost } from "@/lib/api-hooks";

const homeSearchSchema = z.object({
  sortBy: fallback(sortBySchema, "points").default("recent"),
  order: fallback(orderBySchema, "desc").default("desc"),
  author: z.optional(fallback(z.string(), "")),
  site: z.optional(fallback(z.string(), "")),
});

const postsInfiniteQueryOptions = ({
  sortBy,
  order,
  author,
  site,
}: z.infer<typeof homeSearchSchema>) =>
  infiniteQueryOptions({
    queryKey: ["posts", sortBy, order, author, site],
    queryFn: ({ pageParam }) =>
      getPosts({
        pageParam,
        pagination: {
          author,
          order,
          sortBy,
          site,
        },
      }),
    initialPageParam: 1,
    staleTime: Infinity,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.pagination.totalPages <= lastPageParam) {
        return undefined;
      }
      return lastPageParam - 1;
    },
  });

export const Route = createFileRoute("/")({
  component: HomeComponent,
  validateSearch: zodSearchValidator(homeSearchSchema),
});

function HomeComponent() {
  const { sortBy, order, author, site } = Route.useSearch();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(
      postsInfiniteQueryOptions({
        sortBy,
        order,
        author,
        site,
      }),
    );

  const upvoteMutation = useUpvotePost();

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Submissions</h1>

      <SortBar sortBy={sortBy} order={order} />

      <div className="space-y-4">
        {data?.pages.map((page) =>
          page.data.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpvote={() => upvoteMutation.mutate(post.id.toString())}
            />
          )),
        )}
      </div>

      <div className="mt-6">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more"}
        </Button>
      </div>
    </div>
  );
}
