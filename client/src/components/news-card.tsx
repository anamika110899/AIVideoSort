import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { News } from "@shared/schema";
import { format } from "date-fns";

interface NewsCardProps {
  article: News;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video relative">
          {article.imageUrl ? (
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              No image available
            </div>
          )}
          <Badge 
            className="absolute top-2 right-2"
            variant="secondary"
          >
            {article.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-4">
        <h3 className="font-semibold line-clamp-2">{article.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.description}
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            {format(new Date(article.publishedAt), "MMM d, yyyy")}
          </div>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-primary hover:underline"
          >
            Read more
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
