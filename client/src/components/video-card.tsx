import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Video } from "@shared/schema";
import { format } from "date-fns";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="aspect-video relative">
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt={video.prompt} 
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center rounded-t-lg">
              Processing...
            </div>
          )}
          <Badge 
            className="absolute top-2 right-2"
            variant={video.status === "completed" ? "default" : "secondary"}
          >
            {video.status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-4">
        <p className="text-sm line-clamp-2">{video.prompt}</p>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {format(new Date(video.createdAt), "MMM d, yyyy")}
          </div>
          {video.status === "completed" && (
            <Button size="sm" variant="secondary">
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
