"use client";

import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

type OverlayImage = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function ImageOverlayManager() {
  const [images, setImages] = useState<OverlayImage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const src = URL.createObjectURL(file);
      const newImage: OverlayImage = {
        id: uuidv4(),
        src,
        x: 100,
        y: 100,
        width: 120,
        height: 120,
      };
      setImages([...images, newImage]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleDrag = (e: any, id: string) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, x: x - img.width / 2, y: y - img.height / 2 } : img
      )
    );
  };

  const handleResize = (id: string, factor: number) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              width: img.width * factor,
              height: img.height * factor,
            }
          : img
      )
    );
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <h2 className="text-4xl font-bold">Image Overlay Manager</h2>

      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-xl p-6 w-full max-w-2xl text-center cursor-pointer transition hover:bg-accent"
      >
        <input {...getInputProps()} />
        <p className="text-muted-foreground">Drag & drop image here or click to upload</p>
      </div>

      <div
        ref={containerRef}
        className="relative border w-[640px] h-[360px] bg-black rounded-xl overflow-hidden mt-6"
      >
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              position: "absolute",
              top: img.y,
              left: img.x,
              width: img.width,
              height: img.height,
              cursor: "move",
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const onMove = (moveEvent: any) => handleDrag(moveEvent, img.id);
              const onUp = () => {
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };
              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          >
            <img
              src={img.src}
              alt="overlay"
              draggable={false}
              className="w-full h-full object-contain rounded-md"
            />
            <div className="absolute bottom-0 right-0 flex space-x-2 p-1">
              <Button size="sm" variant="secondary" onClick={() => handleResize(img.id, 1.1)}>
                +
              </Button>
              <Button size="sm" variant="secondary" onClick={() => handleResize(img.id, 0.9)}>
                -
              </Button>
              <Button size="sm" variant="destructive" onClick={() => removeImage(img.id)}>
                ×
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
