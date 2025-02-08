import { videos, type Video, type InsertVideo } from "@shared/schema";

export interface IStorage {
  getVideos(userId: string): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: number, update: Partial<Video>): Promise<Video>;
}

export class MemStorage implements IStorage {
  private videos: Map<number, Video>;
  private currentId: number;

  constructor() {
    this.videos = new Map();
    this.currentId = 1;
  }

  async getVideos(userId: string): Promise<Video[]> {
    return Array.from(this.videos.values()).filter(
      (video) => video.userId === userId
    );
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentId++;
    const video: Video = {
      ...insertVideo,
      id,
      status: "pending",
      url: null,
      thumbnail: null,
      createdAt: new Date()
    };
    this.videos.set(id, video);
    return video;
  }

  async updateVideo(id: number, update: Partial<Video>): Promise<Video> {
    const video = await this.getVideo(id);
    if (!video) throw new Error("Video not found");
    
    const updatedVideo = { ...video, ...update };
    this.videos.set(id, updatedVideo);
    return updatedVideo;
  }
}

export const storage = new MemStorage();
