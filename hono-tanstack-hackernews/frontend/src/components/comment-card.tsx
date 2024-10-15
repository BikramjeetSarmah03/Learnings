import { getCommentComments, userQueryOptions } from "@/lib/api";
import { cn, relativeTime } from "@/lib/utils";
import { Comment } from "@/shared/types";
import {
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import {
  ChevronUpIcon,
  MessageSquareIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import React, { useState } from "react";

interface CommentCardProps {
  comment: Comment;
  depth: number;
  activeReplyId: number | null;
  setActiveReplyId: React.Dispatch<React.SetStateAction<number | null>>;
  isLast: boolean;
  toggleUpVote: () => void;
}

export const CommentCard = ({
  comment,
  depth,
  activeReplyId,
  setActiveReplyId,
  isLast,
  toggleUpVote,
}: CommentCardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const queryClient = useQueryClient();

  const { data: comments } = useSuspenseInfiniteQuery({
    queryKey: ["comments", "comment", comment.id],
    queryFn: ({ pageParam }) => getCommentComments(comment.id, pageParam),
    initialPageParam: 1,
    staleTime: Infinity,
    initialData: {
      pageParams: [1],
      pages: [
        {
          success: true,
          message: "Commets Fetched",
          data: comment.childComments ?? [],
          pagination: {
            page: 1,
            totalPages: Math.ceil(comment.commentCount / 2),
          },
        },
      ],
    },
    getNextPageParam: function (lastPage, allPages, lastPageParam) {
      if (lastPage.pagination.totalPages <= lastPageParam) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  const { data: user } = useQuery(userQueryOptions());
  const isUpvoted = comment.commentUpvotes.length > 0;

  const isReplying = activeReplyId === comment.id;

  return (
    <div className={cn(depth > 0 && "ml-4 border-l border-border pl-4")}>
      <div className="py-2">
        <div className="mb-2 flex items-center space-x-1 text-xs">
          <button
            disabled={!user}
            className={cn(
              "flex items-center gap-1 hover:text-primary",
              isUpvoted ? "text-primary" : "text-muted-foreground",
            )}
          >
            <ChevronUpIcon size={14} />
            <span className="font-medium">{comment.points}</span>
          </button>

          <span className="text-muted-foreground">·</span>
          <span className="font-medium">{comment.author.username}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">
            {relativeTime(comment.createdAt)}
          </span>

          <button
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? <PlusIcon size={14} /> : <MinusIcon size={14} />}
          </button>
        </div>

        {!isCollapsed && (
          <>
            <p className="mb-2 text-sm text-foreground">{comment.content}</p>

            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {user && (
                <button
                  className="flex items-center space-x-1 hover:text-foreground"
                  onClick={() => {
                    setActiveReplyId(isReplying ? null : comment.id);
                  }}
                >
                  <MessageSquareIcon size={12} />
                  <span>Reply</span>
                </button>
              )}
            </div>

            {isReplying && <div className="mt-2">COMMENT FORM</div>}
          </>
        )}
      </div>

      {!isCollapsed &&
        comments &&
        comments.pages.map((page, index) => {
          const isLastPage = index === comments.pages.length - 1;
          return page.data.map((reply, index) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              isLast={isLastPage && index === page.data.length - 1}
              toggleUpVote={() => {}}
            />
          ));
        })}
    </div>
  );
};
