import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { userTable } from "./auth";
import { commentsTable } from "./comments";
import { postsTable } from "./posts";

export const postsUpvotesTable = pgTable("post_upvotes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const commentsUpvotesTable = pgTable("comments_upvotes", {
  id: serial("id").primaryKey(),
  commentId: integer("comment_id").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const postUpvoteRaltions = relations(postsUpvotesTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [postsUpvotesTable.postId],
    references: [postsTable.id],
    relationName: "postUpvotes",
  }),
  user: one(userTable, {
    fields: [postsUpvotesTable.userId],
    references: [userTable.id],
    relationName: "user",
  }),
}));

export const commentUpvoteRaltions = relations(
  commentsUpvotesTable,
  ({ one }) => ({
    post: one(commentsTable, {
      fields: [commentsUpvotesTable.commentId],
      references: [commentsTable.id],
      relationName: "commentUpvotes",
    }),
    user: one(userTable, {
      fields: [commentsUpvotesTable.userId],
      references: [userTable.id],
      relationName: "user",
    }),
  }),
);
