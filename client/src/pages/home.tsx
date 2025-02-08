import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          AI-Powered Video Generation
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
          Create stunning videos with the power of artificial intelligence. Just describe what you want to see, and let our AI do the magic.
        </p>

        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button size="lg">
              Get Started
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {[
            "https://images.unsplash.com/photo-1603566234384-f5f5b59168cc",
            "https://images.unsplash.com/photo-1667302146840-e314e50a47d2",
            "https://images.unsplash.com/photo-1676373740452-7779b00f1dd2"
          ].map((src, i) => (
            <div key={i} className="aspect-video rounded-lg overflow-hidden">
              <img src={src} alt="Sample video" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}