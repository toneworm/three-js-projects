import type { ComponentInfo } from "@/types";

interface ComponentInfoPanelProps {
  info: ComponentInfo | null;
}

export function ComponentInfoPanel({ info }: ComponentInfoPanelProps) {
  if (!info) return null;

  return (
    <div className="absolute top-4 right-8 p-4 pb-6 max-w-64 min-w-32 min-h-24 bg-foreground text-background z-10">
      <h3 className="uppercase tracking-widest font-medium">{info.name}</h3>
      <p className="text-sm text-muted-foreground">{info.dimensions}</p>
      <p className="text-sm mt-2">{info.description}</p>
    </div>
  );
}
