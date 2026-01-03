import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { ComponentInfo } from "@/types";
import { cn } from "@/lib/utils";

interface ComponentInfoPanelProps {
  info: ComponentInfo | null;
}

export function ComponentInfoPanel({ info }: ComponentInfoPanelProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!info) {
    return (
      <div className="absolute top-4 right-4 w-48 sm:w-64 z-10 text-right">
        Click on a structural element to see more details...
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute top-4 right-4 p-4 w-48 sm:w-64 bg-foreground text-background z-10 overflow-hidden interpolate-panel",
        isVisible ? "max-h-72" : "max-h-20"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="uppercase tracking-widest font-medium">{info.name}</h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="cursor-pointer shrink-0 hover:opacity-70 transition-opacity rounded bg-background text-foreground p-1"
          aria-label={isVisible ? "Hide details" : "Show details"}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <div className={cn("mt-2 transition-all", !isVisible && "hidden")}>
        <p className="text-sm text-muted-foreground">{info.dimensions}</p>
        <p className="text-sm mt-2">{info.description}</p>
      </div>
    </div>
  );
}
