import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVideoSchema, insertNewsSchema } from "@shared/schema";
import { generateVideo } from "./ai";

export function registerRoutes(app: Express): Server {
  // Get videos for user
  app.get("/api/videos", async (req, res) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
      const videos = await storage.getVideos(userId);
      res.json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get single video
  app.get("/api/videos/:id", async (req, res) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
      const video = await storage.getVideo(Number(req.params.id));
      if (!video) return res.status(404).json({ message: "Video not found" });
      if (video.userId !== userId) return res.status(403).json({ message: "Forbidden" });

      res.json(video);
    } catch (error) {
      console.error("Error fetching video:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create new video generation request
  app.post("/api/videos", async (req, res) => {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
      const parseResult = insertVideoSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid request", errors: parseResult.error });
      }

      const video = await storage.createVideo({
        ...parseResult.data,
        userId
      });

      // Start AI processing
      generateVideo(video.prompt)
        .then(async ({ url, thumbnail }) => {
          await storage.updateVideo(video.id, {
            status: "completed",
            url,
            thumbnail
          });
        })
        .catch(async (error) => {
          console.error("Error generating video:", error);
          await storage.updateVideo(video.id, {
            status: "failed"
          });
        });

      res.json(video);
    } catch (error) {
      console.error("Error creating video:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get news articles with optional category filter
  app.get("/api/news", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const articles = await storage.getNews(category);
      res.json(articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}