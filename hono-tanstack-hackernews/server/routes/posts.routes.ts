import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { and, asc, countDistinct, desc, eq, sql } from "drizzle-orm";

import { db } from "@/adapter";
import type { Context } from "@/context";
import { userTable } from "@/db/schemas/auth";
import { postsTable } from "@/db/schemas/posts";
import { postsUpvotesTable } from "@/db/schemas/upvotes";
import { isAuthenticated } from "@/middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import {
  createPostSchema,
  paginationSchema,
  type PaginatedResponse,
  type Post,
  type SuccessResponse,
} from "@/shared/types";
import { getISOFormatDateQuery } from "@/lib/utils";

export const postRouter = new Hono<Context>()
  .post(
    "/",
    isAuthenticated,
    zValidator("form", createPostSchema),
    async (c) => {
      const { title, url, content } = c.req.valid("form");

      const user = c.get("user")!;

      const [post] = await db
        .insert(postsTable)
        .values({
          title,
          content,
          url,
          userId: user.id,
        })
        .returning({ id: postsTable.id });

      return c.json<SuccessResponse<{ postId: number }>>(
        {
          success: true,
          message: "Post created",
          data: {
            postId: post.id,
          },
        },
        201,
      );
    },
  )
  .get("/", zValidator("query", paginationSchema), async (c) => {
    const { limit, page, sortBy, order, author, site } = c.req.valid("query");
    const user = c.get("user");

    const offset = (page - 1) * limit;

    const sortByColumn =
      sortBy === "points" ? postsTable.points : postsTable.createdAt;

    const sortOrder = order === "dsc" ? desc(sortByColumn) : asc(sortByColumn);

    const [count] = await db
      .select({ count: countDistinct(postsTable.id) })
      .from(postsTable)
      .where(
        and(
          author ? eq(postsTable.userId, author) : undefined,
          site ? eq(postsTable.url, site) : undefined,
        ),
      );

    const postsQuery = db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        url: postsTable.url,
        content: postsTable.content,
        points: postsTable.points,
        commentCount: postsTable.commentCount,
        createdAt: getISOFormatDateQuery(postsTable.createdAt),
        author: {
          username: userTable.username,
          id: userTable.id,
        },
        isUpvoted: user
          ? sql<boolean>`CASE WHEN ${postsUpvotesTable.userId} IS NOT NULL THEN true ELSE false END`
          : sql<boolean>`false`,
      })
      .from(postsTable)
      .leftJoin(userTable, eq(postsTable.userId, userTable.id))
      .orderBy(sortOrder)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          author ? eq(postsTable.userId, author) : undefined,
          site ? eq(postsTable.url, site) : undefined,
        ),
      );

    if (user) {
      postsQuery.leftJoin(
        postsUpvotesTable,
        and(
          eq(postsUpvotesTable.postId, postsTable.id),
          eq(postsUpvotesTable.userId, user.id),
        ),
      );
    }

    const posts = await postsQuery;

    return c.json<PaginatedResponse<Post[]>>(
      {
        success: true,
        message: "Posts",
        data: posts as Post[],
        pagination: {
          page: page,
          totalPages: Math.ceil(count.count / limit) as number,
        },
      },
      200,
    );
  })
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
          .from(postsUpvotesTable)
          .where(
            and(
              eq(postsUpvotesTable.postId, id),
              eq(postsUpvotesTable.userId, user.id),
            ),
          )
          .limit(1);

        pointsChange = existingUpvote ? -1 : 1;

        const [updated] = await tx
          .update(postsTable)
          .set({ points: sql`${postsTable.points} + ${pointsChange}` })
          .where(eq(postsTable.id, id))
          .returning({ points: postsTable.points });

        if (!updated) {
          throw new HTTPException(404, { message: "Post not found" });
        }

        if (existingUpvote) {
          await tx
            .delete(postsUpvotesTable)
            .where(eq(postsUpvotesTable.id, existingUpvote.id));
        } else {
          await tx.insert(postsUpvotesTable).values({
            postId: id,
            userId: user.id,
          });
        }

        return updated.points;
      });

      return c.json<SuccessResponse<{ count: number; isUpvoted: boolean }>>(
        {
          success: true,
          message: "Post points updated",
          data: { count: points, isUpvoted: points > 0 },
        },
        200,
      );
    },
  );
