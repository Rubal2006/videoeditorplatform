"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function VideoUploader() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      simulateUpload();
    }
  }, []);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center justify-center h-130 p-19">
      <div 
        {...getRootProps()}
        className={`border-2 h-100 bg-blue-50 border-dashed rounded-xl p-10 w-full max-w-2xl text-center transition ${
          isDragActive ? "border-primary bg-primary/10" : "border-muted"
        }`}
      >
        <div>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg font-semibold text-primary">Drop the video here ...</p>
        ) : (
          <p className="text-2xl text-muted-foreground py-40">
            Drag & drop a video file here, or click to select
          </p>
        )}
        </div>
      </div>

      {isUploading && (
        <div className="w-full max-w-2xl mt-6">
          <Progress value={uploadProgress} />
          <p className="text-sm text-center mt-2">Uploading... {uploadProgress}%</p>
        </div>
      )}

      {videoURL && !isUploading && (
        <div className="w-full max-w-4xl mt-8 space-y-4">
          <video
            src={videoURL}
            controls
            className="rounded-xl w-full h-auto border"
          />
          <div className="flex justify-center">
            <Button onClick={() => alert("Move to next step!")}>
              Proceed to Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
