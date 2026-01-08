"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfigurablePanelProps {
  config?: Record<string, any>;
  className?: string;
}

export function ConfigurablePanel({
  config,
  className,
}: ConfigurablePanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "bg-background border border-border p-4 min-w-62.5",
        className
      )}
    >
      <div className="flex items-center justify-start gap-2">
        <Button
          variant="default"
          size="lg"
          className="px-4 uppercase tracking-widest rounded-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide" : "Configure"}
        </Button>
      </div>

      {isOpen && (
        <div className="mt-4 p-4 border border-border bg-muted/50">
          <p className="text-sm text-muted-foreground">Configure items here</p>
        </div>
      )}
    </div>
  );
}
