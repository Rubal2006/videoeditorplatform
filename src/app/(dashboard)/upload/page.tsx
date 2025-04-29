import VideoUploader from "@/components/VideoUploader";

export default function UploadPage() {
  return (
    <main className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Upload Your Video</h1>
      <VideoUploader />
    </main>
  );
}
