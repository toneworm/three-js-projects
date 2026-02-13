"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { Config } from "@/types/poc";

interface ConfigurablePanelProps<
  TState = Record<string, string | boolean>,
  TResult = string[],
> {
  config?: Config;
  className?: string;
  resolver?: (state: TState) => TResult;
  onResolvedChange?: (resolved: TResult) => void;
}

const initialFormState: Record<string, string | boolean> = {
  roofType: "gable",
  windowType: "none",
  logStoreLeft: false,
  logStoreRight: false,
  claddingType: "none",
};

export function ConfigurablePanel<
  TState = Record<string, string | boolean>,
  TResult = string[],
>({
  config,
  className,
  resolver,
  onResolvedChange,
}: ConfigurablePanelProps<TState, TResult>) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] =
    useState<Record<string, string | boolean>>(initialFormState);

  // Store the latest callbacks in refs to avoid dependency issues
  const resolverRef = useRef(resolver);
  const onResolvedChangeRef = useRef(onResolvedChange);

  // Update refs when props change
  useEffect(() => {
    resolverRef.current = resolver;
    onResolvedChangeRef.current = onResolvedChange;
  });

  // Only depend on formState - use refs for callbacks
  useEffect(() => {
    if (Object.keys(formState).length > 0) {
      console.log("Form state updated:", formState);

      if (resolverRef.current && onResolvedChangeRef.current) {
        const resolved = resolverRef.current(formState as TState);
        console.log("Resolved components:", resolved);
        onResolvedChangeRef.current(resolved);
      }
    }
  }, [formState]); // ← Only formState now

  const handleRadioChange = (controlId: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [controlId]: value,
    }));
  };

  const handleCheckboxChange = (controlId: string, checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      [controlId]: checked,
    }));
  };

  return (
    <div
      className={cn(
        "bg-background border border-border p-4 min-w-48",
        className,
      )}
    >
      <Button
        variant="default"
        size="lg"
        className="px-4 uppercase tracking-widest rounded-none w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide" : "Configure"}
      </Button>

      {isOpen && (
        <div className="mt-4 p-4 border border-border bg-muted/50 space-y-6">
          {!config ? (
            <p className="text-sm text-muted-foreground">
              No configuration available
            </p>
          ) : (
            config.groups.map((group) => (
              <div key={group.id} className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {group.label}
                </h3>
                {group.controls.map((control) => (
                  <div key={control.id} className="space-y-2">
                    {control.options ? (
                      <>
                        {control.label && (
                          <Label className="text-sm text-muted-foreground">
                            {control.label}
                          </Label>
                        )}
                        <RadioGroup
                          value={formState[control.id] as string}
                          onValueChange={(value) =>
                            handleRadioChange(control.id, value)
                          }
                        >
                          {control.options.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center space-x-2"
                            >
                              <Label
                                htmlFor={`${control.id}-${option.value}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                <RadioGroupItem
                                  className="cursor-pointer"
                                  value={option.value}
                                  id={`${control.id}-${option.value}`}
                                />
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor={control.id}
                          className="text-sm font-normal cursor-pointer"
                        >
                          <Checkbox
                            id={control.id}
                            checked={formState[control.id] === true}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                control.id,
                                checked as boolean,
                              )
                            }
                            className="cursor-pointer"
                          />
                          {control.label || control.id}
                        </Label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
