"use client";

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { v4 as uuidv4 } from "uuid";

type AudioClip = {
  id: string;
  label: string;
  muted: boolean;
};

const ItemType = {
  AUDIO: "audio",
};

function AudioClipItem({ clip, index, moveClip, toggleMute }: any) {
  const [, ref] = useDrag({
    type: ItemType.AUDIO,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.AUDIO,
    hover: (item: any) => {
      if (item.index !== index) {
        moveClip(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <Card
    ref={(node) => {
        if (node) ref(drop(node));
      }}
      
      className="w-60 p-4 flex items-center justify-between bg-muted hover:bg-accent cursor-move"
    >
      <span>{clip.label}</span>
      <Switch
        checked={!clip.muted}
        onCheckedChange={() => toggleMute(index)}
        className="ml-2"
      />
    </Card>
  );
}

export default function AudioManager() {
  const [clips, setClips] = useState<AudioClip[]>([
    { id: uuidv4(), label: "Audio Clip 1", muted: false },
    { id: uuidv4(), label: "Audio Clip 2", muted: false },
    { id: uuidv4(), label: "Background Music", muted: false },
  ]);

  const moveClip = (from: number, to: number) => {
    const updated = [...clips];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setClips(updated);
  };

  const toggleMute = (index: number) => {
    const updated = [...clips];
    updated[index].muted = !updated[index].muted;
    setClips(updated);
  };

  const addClip = () => {
    const newClip = {
      id: uuidv4(),
      label: `Audio Clip ${clips.length + 1}`,
      muted: false,
    };
    setClips([...clips, newClip]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col  items-center space-y-6 p-8">
        <h2 className="text-4xl font-bold">Audio Manager</h2>

        <div className="flex flex-col items-center space-y-4 w-full max-w-4xl">
          {clips.map((clip, index) => (
            <AudioClipItem
              key={clip.id}
              clip={clip}
              index={index}
              moveClip={moveClip}
              toggleMute={toggleMute}
            />
          ))}
        </div>

        <Button onClick={addClip}>Add Audio Clip</Button>
      </div>
    </DndProvider>
  );
}
