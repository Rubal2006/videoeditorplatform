"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, Download } from "lucide-react";

export default function PreviewPlayer() {
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [rendered, setRendered] = useState(false);

  const startRendering = () => {
    setIsRendering(true);
    setRenderProgress(0);
    setRendered(false);

    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          setRendered(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const simulateDownload = () => {
    alert("Simulated: Final video downloaded!");
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      <h2 className="text-4xl font-bold">Final Preview</h2>

      <div className="border w-[640px] h-[360px] bg-black rounded-xl overflow-hidden">
        <video
          src="/sample.mp4" // You can change to dynamic src later
          controls
          className="w-full h-full object-cover"
        />
      </div>

      {!rendered && (
        <Button onClick={startRendering} disabled={isRendering}>
          {isRendering ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Rendering...
            </>
          ) : (
            "Render Final Video"
          )}
        </Button>
      )}

      {isRendering && (
        <div className="w-full max-w-md">
          <Progress value={renderProgress} />
          <p className="text-center text-sm mt-2">Rendering... {renderProgress}%</p>
        </div>
      )}

      {rendered && (
        <Button onClick={simulateDownload} variant="default">

          <Download className="mr-2 h-4 w-4" />
          Download Video
        </Button>
      )}
    </div>
  );
}
