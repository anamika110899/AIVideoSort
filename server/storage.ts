import { videos, news, type Video, type InsertVideo, type News, type InsertNews } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getVideos(userId: string): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: number, update: Partial<Video>): Promise<Video>;

  // News methods
  getNews(category?: string): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
}

export class DatabaseStorage implements IStorage {
  async getVideos(userId: string): Promise<Video[]> {
    return await db.select().from(videos).where(eq(videos.userId, userId));
  }

  async getVideo(id: number): Promise<Video | undefined> {
    const [video] = await db.select().from(videos).where(eq(videos.id, id));
    return video;
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const [video] = await db
      .insert(videos)
      .values(insertVideo)
      .returning();
    return video;
  }

  async updateVideo(id: number, update: Partial<Video>): Promise<Video> {
    const [video] = await db
      .update(videos)
      .set(update)
      .where(eq(videos.id, id))
      .returning();
    if (!video) throw new Error("Video not found");
    return video;
  }

  async getNews(category?: string): Promise<News[]> {
    let query = db.select().from(news).orderBy(desc(news.publishedAt));
    if (category && category !== "all") {
      query = query.where(eq(news.category, category));
    }
    return await query;
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const [article] = await db
      .insert(news)
      .values(insertNews)
      .returning();
    return article;
  }
}

export const storage = new DatabaseStorage();