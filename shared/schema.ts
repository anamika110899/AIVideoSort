import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  prompt: text("prompt").notNull(),
  category: text("category").notNull().default("general"),
  status: text("status").notNull().default("pending"),
  url: text("url"),
  thumbnail: text("thumbnail"),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertVideoSchema = createInsertSchema(videos)
  .omit({ id: true, url: true, thumbnail: true, createdAt: true })
  .extend({
    prompt: z.string().min(10).max(1000),
    category: z.enum(["news", "technology", "business", "sports", "entertainment", "general"])
  });

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;