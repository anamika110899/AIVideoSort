import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { VideoIcon, HomeIcon } from "lucide-react";

export default function NavMenu() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Button variant="link" className="font-bold text-xl">
            AI Video Gen
          </Button>
        </Link>

        <nav className="flex gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <HomeIcon className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href="/generate">
            <Button variant="ghost" size="sm">
              <VideoIcon className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
