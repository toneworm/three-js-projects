"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Config } from "@/types";

interface ConfigurablePanelProps<TState = Record<string, string | boolean>, TResult = string[]> {
  config?: Config;
  className?: string;
  resolver?: (state: TState) => TResult;
  onResolvedChange?: (resolved: TResult) => void;
}

export function ConfigurablePanel<TState = Record<string, string | boolean>, TResult = string[]>({
  config,
  className,
  resolver,
  onResolvedChange,
}: ConfigurablePanelProps<TState, TResult>) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<Record<string, string | boolean>>(
    {}
  );

  // Initialize form state with default values
  useEffect(() => {
    if (!config) return;

    const initialState: Record<string, string | boolean> = {};
    config.groups.forEach((group) => {
      group.controls.forEach((control) => {
        initialState[control.id] = control.defaultValue;
      });
    });
    setFormState(initialState);
  }, [config]);

  // Call resolver whenever form state changes
  useEffect(() => {
    if (Object.keys(formState).length > 0) {
      console.log("Form state updated:", formState);

      if (resolver && onResolvedChange) {
        const resolved = resolver(formState as TState);
        console.log("Resolved components:", resolved);
        onResolvedChange(resolved);
      }
    }
  }, [formState, resolver, onResolvedChange]);

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
        <div className="mt-4 p-4 border border-border bg-muted/50 space-y-6">
          {!config ? (
            <p className="text-sm text-muted-foreground">
              No configuration available
            </p>
          ) : (
            <>
              {config.groups.map((group) => (
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
                                <RadioGroupItem
                                  value={option.value}
                                  id={`${control.id}-${option.value}`}
                                  className="cursor-pointer"
                                />
                                <Label
                                  htmlFor={`${control.id}-${option.value}`}
                                  className="text-sm font-normal cursor-pointer"
                                >
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </>
                      ) : (
                        // Checkbox for boolean controls - label inline
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={control.id}
                            checked={formState[control.id] === true}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                control.id,
                                checked as boolean
                              )
                            }
                            className="cursor-pointer"
                          />
                          {control.label && (
                            <Label
                              htmlFor={control.id}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {control.label}
                            </Label>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
