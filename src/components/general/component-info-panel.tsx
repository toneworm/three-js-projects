import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { ComponentInfo } from "@/types";

interface ComponentInfoPanelProps {
  info: ComponentInfo | null;
}

export function ComponentInfoPanel({ info }: ComponentInfoPanelProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!info) return null;

  return (
    <div className="absolute top-4 right-8 p-4 max-w-64 min-w-32 bg-foreground text-background z-10">
      <div className="flex items-center justify-between gap-4">
        <h3 className="uppercase tracking-widest font-medium">{info.name}</h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="cursor-pointer shrink-0 hover:opacity-70 transition-opacity rounded-sm bg-background text-foreground p-1"
          aria-label={isVisible ? "Hide details" : "Show details"}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {isVisible && (
        <>
          <p className="text-sm text-muted-foreground">{info.dimensions}</p>
          <p className="text-sm mt-2">{info.description}</p>
        </>
      )}
    </div>
  );
}
