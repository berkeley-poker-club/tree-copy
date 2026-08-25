import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const instagramPostsTable = pgTable("instagram_posts", {
  id: serial("id").primaryKey(),
  shortcode: text("shortcode").notNull(),
  caption: text("caption"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertInstagramPostSchema = createInsertSchema(instagramPostsTable).omit({ id: true, createdAt: true });
export type InsertInstagramPost = z.infer<typeof insertInstagramPostSchema>;
export type InstagramPost = typeof instagramPostsTable.$inferSelect;
