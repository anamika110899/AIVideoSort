import NavMenu from "@/components/nav-menu";
import VideoForm from "@/components/video-form";

export default function Generate() {
  return (
    <div>
      <NavMenu />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Generate New Video</h1>
          <VideoForm />
        </div>
      </div>
    </div>
  );
}
