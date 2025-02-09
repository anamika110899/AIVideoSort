import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { News } from "@shared/schema";
import { Button } from "@/components/ui/button";
import NewsCard from "@/components/news-card";

const categories = [
  { value: "all", label: "All" },
  { value: "news", label: "News" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "general", label: "General" }
];

export default function NewsFeed() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory === "all" 
        ? "/api/news"
        : `/api/news?category=${selectedCategory}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.value)}
            className="whitespace-nowrap"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[300px] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news?.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
