"use client";

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

type Scene = {
  id: string;
  label: string;
};

const ItemType = {
  SCENE: "scene",
};

function SceneItem({ scene, index, moveScene, removeScene }: any) {
  const [, ref] = useDrag({
    type: ItemType.SCENE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.SCENE,
    hover: (item: any) => {
      if (item.index !== index) {
        moveScene(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <Card
    ref={(node) => {
        if (node) ref(drop(node));
      }}
      
      className="w-32 h-20 flex items-center justify-center bg-muted hover:bg-accent cursor-move relative"
    >
      {scene.label}
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
        onClick={() => removeScene(index)}
      >
        x
      </Button>
    </Card>
  );
}

export default function TimelineEditor() {
  const [scenes, setScenes] = useState<Scene[]>([
    { id: uuidv4(), label: "Scene 1" },
    { id: uuidv4(), label: "Scene 2" },
    { id: uuidv4(), label: "Scene 3" },
  ]);

  const moveScene = (from: number, to: number) => {
    const updated = [...scenes];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setScenes(updated);
  };

  const addScene = () => {
    const newScene = { id: uuidv4(), label: `Scene ${scenes.length + 1}` };
    setScenes([...scenes, newScene]);
  };

  const removeScene = (index: number) => {
    const updated = [...scenes];
    updated.splice(index, 1);
    setScenes(updated);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center space-y-6 p-8">
        <h2 className="text-4xl font-bold">Video Timeline</h2>

        <div className="flex items-center space-x-4 overflow-x-auto p-4 border rounded-xl w-full max-w-4xl bg-background">
          {scenes.map((scene, index) => (
            <SceneItem
              key={scene.id}
              scene={scene}
              index={index}
              moveScene={moveScene}
              removeScene={removeScene}
            />
          ))}
        </div>

        <Button onClick={addScene}>Add Scene</Button>
      </div>
    </DndProvider>
  );
}
