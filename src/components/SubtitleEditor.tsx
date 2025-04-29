"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";

type SubtitleBlock = {
  id: string;
  text: string;
  start: number;
  end: number;
  font: string;
  size: string;
  color: string;
  position: string;
};

const fonts = ["Arial", "Roboto", "Times New Roman", "Comic Sans MS"];
const sizes = ["12px", "16px", "20px", "24px", "32px"];
const colors = ["white", "black", "red", "blue", "yellow"];
const positions = ["Top", "Center", "Bottom"];

export default function SubtitleEditor() {
  const [subtitles, setSubtitles] = useState<SubtitleBlock[]>([]);

  const addSubtitle = () => {
    const newSubtitle: SubtitleBlock = {
      id: uuidv4(),
      text: "",
      start: 0,
      end: 5,
      font: "Arial",
      size: "16px",
      color: "white",
      position: "Bottom",
    };
    setSubtitles([...subtitles, newSubtitle]);
  };

  const updateSubtitle = (id: string, key: keyof SubtitleBlock, value: any) => {
    setSubtitles((prev) =>
      prev.map((subtitle) =>
        subtitle.id === id ? { ...subtitle, [key]: value } : subtitle
      )
    );
  };

  const removeSubtitle = (id: string) => {
    setSubtitles((prev) => prev.filter((subtitle) => subtitle.id !== id));
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-8">
      <h2 className="text-4xl font-bold">Subtitles & Text Overlay</h2>

      <div className="flex flex-col space-y-6 w-full max-w-4xl">
        {subtitles.map((subtitle) => (
          <Card key={subtitle.id} className="p-6 space-y-4">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1">
                <Label>Text</Label>
                <Input
                  value={subtitle.text}
                  onChange={(e) => updateSubtitle(subtitle.id, "text", e.target.value)}
                  placeholder="Enter subtitle text"
                />
              </div>

              <div className="w-24">
                <Label>Start (s)</Label>
                <Input
                  type="number"
                  value={subtitle.start}
                  onChange={(e) => updateSubtitle(subtitle.id, "start", Number(e.target.value))}
                />
              </div>

              <div className="w-24">
                <Label>End (s)</Label>
                <Input
                  type="number"
                  value={subtitle.end}
                  onChange={(e) => updateSubtitle(subtitle.id, "end", Number(e.target.value))}
                />
              </div>

              <div className="w-36">
                <Label>Font</Label>
                <Select
                  value={subtitle.font}
                  onValueChange={(val) => updateSubtitle(subtitle.id, "font", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-28">
                <Label>Size</Label>
                <Select
                  value={subtitle.size}
                  onValueChange={(val) => updateSubtitle(subtitle.id, "size", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-28">
                <Label>Color</Label>
                <Select
                  value={subtitle.color}
                  onValueChange={(val) => updateSubtitle(subtitle.id, "color", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-36">
                <Label>Position</Label>
                <Select
                  value={subtitle.position}
                  onValueChange={(val) => updateSubtitle(subtitle.id, "position", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button variant="destructive" onClick={() => removeSubtitle(subtitle.id)}>
              Remove Subtitle
            </Button>
          </Card>
        ))}
      </div>

      <Button onClick={addSubtitle}>Add Subtitle</Button>
    </div>
  );
}
