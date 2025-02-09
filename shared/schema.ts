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

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  url: text("url").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertVideoSchema = createInsertSchema(videos)
  .omit({ id: true, url: true, thumbnail: true, createdAt: true })
  .extend({
    prompt: z.string().min(10).max(1000),
    category: z.enum(["news", "technology", "business", "sports", "entertainment", "general"])
  });

export const insertNewsSchema = createInsertSchema(news)
  .omit({ id: true, createdAt: true })
  .extend({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
    category: z.enum(["news", "technology", "business", "sports", "entertainment", "general"]),
    url: z.string().url(),
    imageUrl: z.string().url().optional(),
    publishedAt: z.string().transform(str => new Date(str))
  });

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;