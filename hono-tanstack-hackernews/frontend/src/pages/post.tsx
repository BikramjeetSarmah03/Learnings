import { CommentCard } from "@/components/comment-card";
import { PostCard } from "@/components/post-card";
import { SortBar } from "@/components/sort-bar";
import { Card, CardContent } from "@/components/ui/card";
import { getComments, getPost } from "@/lib/api";
import { useUpvotePost } from "@/lib/api-hooks";
import { orderBySchema, sortBySchema } from "@/shared/types";
import {
  infiniteQueryOptions,
  queryOptions,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { useState } from "react";
import { z } from "zod";

const postSearchSchema = z.object({
  id: fallback(z.number(), 0).default(0),
  sortBy: fallback(sortBySchema, "points").default("points"),
  order: fallback(orderBySchema, "desc").default("desc"),
});

const postQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    staleTime: Infinity,
    retry: false,
    throwOnError: true,
  });

const commetsInfiniteQueryOptions = ({
  id,
  sortBy,
  order,
}: z.infer<typeof postSearchSchema>) =>
  infiniteQueryOptions({
    queryKey: ["commentts", id, sortBy, order],
    queryFn: ({ pageParam }) =>
      getComments(id, pageParam, 10, {
        sortBy,
        order,
      }),
    initialPageParam: 1,
    staleTime: Infinity,
    retry: false,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.pagination.totalPages <= lastPageParam) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

export const Route = createFileRoute("/post")({
  component: SinglePost,
  validateSearch: zodSearchValidator(postSearchSchema),
});

function SinglePost() {
  const { id, sortBy, order } = Route.useSearch();

  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);

  const { data } = useSuspenseQuery(postQueryOptions(id));
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    commetsInfiniteQueryOptions({ id, sortBy, order }),
  );

  const upvotePost = useUpvotePost();

  return (
    <div className="mx-auto max-w-3xl">
      {data.data.id}
      {data && (
        <PostCard
          post={data.data}
          onUpvote={() => upvotePost.mutate(id.toString())}
        />
      )}

      <div className="mb-4 mt-8">
        <h2 className="mb-2 text-lg font-semibold text-foreground">Comments</h2>

        {comments && comments.pages[0].data.length > 0 && (
          <SortBar sortBy={sortBy} order={order} />
        )}
      </div>

      {comments && comments.pages[0].data.length > 0 && (
        <Card>
          <CardContent className="p-4">
            {comments.pages.map((page) =>
              page.data.map((comment, index) => (
                <CommentCard
                  comment={comment}
                  depth={0}
                  activeReplyId={activeReplyId}
                  setActiveReplyId={setActiveReplyId}
                  key={comment.id}
                  isLast={index === page.data.length - 1}
                  toggleUpVote={() => {}}
                />
              )),
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
