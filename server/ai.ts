import OpenAI from "openai";

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateVideo(prompt: string): Promise<{ 
  url: string;
  thumbnail: string;
}> {
  // For demo purposes, return mock data
  // In production, this would call OpenAI's API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: "https://example.com/video.mp4",
        thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868"
      });
    }, 5000);
  });
}
