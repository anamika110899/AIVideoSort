import { useQuery } from "@tanstack/react-query";
import VideoCard from "@/components/video-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "wouter";
import type { Video } from "@shared/schema";
import NavMenu from "@/components/nav-menu";

export default function Dashboard() {
  const { data: videos, isLoading } = useQuery<Video[]>({ 
    queryKey: ["/api/videos"]
  });

  return (
    <div>
      <NavMenu />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Videos</h1>
          <Link href="/generate">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Video
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos?.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
