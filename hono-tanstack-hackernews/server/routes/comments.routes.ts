import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { and, asc, countDistinct, desc, eq, isNull, sql } from "drizzle-orm";

import { db } from "@/adapter";
import type { Context } from "@/context";
import { commentsTable } from "@/db/schemas/comments";
import { postsTable } from "@/db/schemas/posts";
import { commentsUpvotesTable } from "@/db/schemas/upvotes";
import { isAuthenticated } from "@/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import {
  createCommentSchema,
  paginationSchema,
  type Comment,
  type PaginatedResponse,
  type SuccessResponse,
} from "@/shared/types";
import { getISOFormatDateQuery } from "@/lib/utils";

export const commentsRouter = new Hono<Context>()
  .post(
    "/:id",
    isAuthenticated,
    zValidator("param", z.object({ id: z.coerce.number() })),
    zValidator("json", createCommentSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const { content } = c.req.valid("json");
      const user = c.get("user")!;

      const [comment] = await db.transaction(async (tx) => {
        const [parentComment] = await tx
          .select({
            id: commentsTable.id,
            postId: commentsTable.postId,
            depth: commentsTable.depth,
          })
          .from(commentsTable)
          .where(eq(commentsTable.id, id))
          .limit(1);

        if (!parentComment) {
          throw new HTTPException(404, { message: "Comment not found" });
        }

        const postId = parentComment.postId;

        const [updateParentComment] = await tx
          .update(commentsTable)
          .set({ commentCount: sql`${commentsTable.commentCount} + 1` })
          .where(eq(commentsTable.id, parentComment.id))
          .returning({ commentCount: commentsTable.commentCount });

        const [updatedPost] = await tx
          .update(postsTable)
          .set({ commentCount: sql`${postsTable.commentCount} + 1` })
          .where(eq(postsTable.id, postId))
          .returning({ commentCount: postsTable.commentCount });

        if (!updateParentComment || !updatedPost) {
          throw new HTTPException(404, { message: "Error creating comment" });
        }

        return await tx
          .insert(commentsTable)
          .values({
            content,
            userId: user.id,
            postId: postId,
            parentCommentId: parentComment.id,
            depth: parentComment.depth + 1,
          })
          .returning({
            id: commentsTable.id,
            userId: commentsTable.userId,
            postId: commentsTable.postId,
            content: commentsTable.content,
            depth: commentsTable.depth,
            points: commentsTable.points,
            parentCommentId: commentsTable.parentCommentId,
            createdAt: getISOFormatDateQuery(commentsTable.createdAt).as(
              "created_at",
            ),
            commentCount: commentsTable.commentCount,
          });
      });

      return c.json<SuccessResponse<Comment>>({
        success: true,
        message: "Comment Created",
        data: {
          ...comment,
          childComments: [],
          commentUpvotes: [],
          author: {
            id: user.id,
            username: user.username,
          },
        } as Comment,
      });
    },
  )
  .post(
    "/:id/upvote",
    isAuthenticated,
    zValidator("param", z.object({ id: z.coerce.number() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const user = c.get("user")!;

      let pointsChange: -1 | 1 = 1;

      const points = await db.transaction(async (tx) => {
        const [existingUpvote] = await tx
          .select()
          .from(commentsUpvotesTable)
          .where(
            and(
              eq(commentsUpvotesTable.commentId, id),
              eq(commentsUpvotesTable.userId, user.id),
            ),
          )
          .limit(1);

        pointsChange = existingUpvote ? -1 : 1;

        const [updated] = await tx
          .update(commentsTable)
          .set({ points: sql`${commentsTable.points} + ${pointsChange}` })
          .where(eq(commentsTable.id, id))
          .returning({ points: commentsTable.points });

        if (!updated) {
          throw new HTTPException(404, { message: "Comment not found" });
        }

        if (existingUpvote) {
          await tx
            .delete(commentsUpvotesTable)
            .where(eq(commentsUpvotesTable.id, existingUpvote.id));
        } else {
          await tx.insert(commentsUpvotesTable).values({
            commentId: id,
            userId: user.id,
          });
        }

        return updated.points;
      });

      return c.json<
        SuccessResponse<{ count: number; commentUpvotes: { userId: string }[] }>
      >(
        {
          success: true,
          message: "Comment updated",
          data: {
            count: points,
            commentUpvotes: pointsChange === 1 ? [{ userId: user.id }] : [],
          },
        },
        200,
      );
    },
  )
  .get(
    "/:id/comments",
    zValidator("param", z.object({ id: z.coerce.number() })),
    zValidator("query", paginationSchema),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");

      const { limit, page, order, sortBy } = c.req.valid("query");
      const offset = (page - 1) * limit;

      const sortByColumn =
        sortBy === "points" ? commentsTable.points : commentsTable.createdAt;
      const sortOrder =
        order === "desc" ? desc(sortByColumn) : asc(sortByColumn);

      const [count] = await db
        .select({ count: countDistinct(commentsTable.id) })
        .from(commentsTable)
        .where(eq(commentsTable.parentCommentId, id));

      const comments = await db.query.comments.findMany({
        where: and(
          eq(commentsTable.parentCommentId, id),
          isNull(commentsTable.parentCommentId),
        ),
        orderBy: sortOrder,
        limit: limit,
        offset: offset,
        with: {
          author: {
            columns: {
              username: true,
              id: true,
            },
          },
          commentUpvotes: {
            columns: {
              userId: true,
            },
            where: eq(commentsUpvotesTable.userId, user?.id ?? ""),
            limit: 1,
          },
        },
        extras: {
          createdAt: getISOFormatDateQuery(commentsTable.createdAt).as(
            "created_at",
          ),
        },
      });

      return c.json<PaginatedResponse<Comment[]>>({
        success: true,
        message: "Commets fetched",
        data: comments as Comment[],
        pagination: {
          page,
          totalPages: Math.ceil(count.count / limit) as number,
        },
      });
    },
  );