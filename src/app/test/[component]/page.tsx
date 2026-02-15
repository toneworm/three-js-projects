"use client";

import { Suspense, useLayoutEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

import Plate from "@/components/building/plate";
import Post from "@/components/building/post";
import Rafter from "@/components/building/rafter";
import { Loader } from "@/components/general/loader";
import { COMPONENT_DEFAULTS } from "@/config/component-defaults";
import useComponentStore from "@/stores/use-component-store";
import type {
  ComponentType,
  PlateProps,
  PostProps,
  RafterProps,
} from "@/types/building";
import { buildControls } from "./build-controls";

const COMPONENT_TYPES: ComponentType[] = ["post", "plate", "rafter"];

// Parse query parameters into component props
function parseQueryParams(
  searchParams: URLSearchParams,
  componentType: ComponentType,
): PostProps | PlateProps | RafterProps {
  const params: Record<string, string | number | boolean> = {};

  searchParams.forEach((value, key) => {
    // Try to parse as number
    const numValue = Number(value);
    if (!Number.isNaN(numValue)) {
      params[key] = numValue;
    }
    // Parse booleans
    else if (value === "true") {
      params[key] = true;
    } else if (value === "false") {
      params[key] = false;
    }
    // Keep as string (for enum values like topEnd, leftEnd, etc.)
    else {
      params[key] = value;
    }
  });

  return { ...COMPONENT_DEFAULTS[componentType], ...params };
}

// Generate example query string for each component type
function getExampleQuery(componentType: ComponentType): string {
  switch (componentType) {
    case "post":
      return "?width=0.2&height=2.4&depth=0.2&topEnd=tenon&bottomEnd=bevel";
    case "plate":
      return "?length=3&height=0.2&depth=0.2&leftEnd=top&rightEnd=bottom";
    case "rafter":
      return "?height=0.15&depth=0.05&run=2&rise=1&mouthSize=0.1";
  }
}

export default function TestComponentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const componentType = params.component as ComponentType;

  const setComponent = useComponentStore((state) => state.setComponent);
  const updateProps = useComponentStore((state) => state.updateProps);
  const storeComponentType = useComponentStore((state) => state.componentType);
  const props = useComponentStore((state) => state.props);

  const isValidType = COMPONENT_TYPES.includes(componentType);

  // Parse initial props synchronously
  const initialProps = useMemo(() => {
    if (isValidType) {
      return parseQueryParams(searchParams, componentType);
    }
    return COMPONENT_DEFAULTS[componentType];
  }, [isValidType, componentType, searchParams]);

  // Initialize store synchronously before first paint
  useLayoutEffect(() => {
    if (isValidType) {
      setComponent(componentType, initialProps);
    }
  }, [isValidType, componentType, initialProps, setComponent]);

  // Only render controls once store is initialized with correct component type
  const isStoreReady = storeComponentType === componentType;

  useControls(
    componentType ?? "post",
    () => buildControls(componentType, isStoreReady ? props : initialProps, updateProps),
    [componentType, props, isStoreReady],
  );

  return (
    <div className="h-screen w-full relative">
      {/* Navigation tabs */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {COMPONENT_TYPES.map((type) => (
          <Link
            key={type}
            href={`/test/${type}`}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              componentType === type
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {type}
          </Link>
        ))}
      </div>

      {/* Props display */}
      <div className="absolute top-14 left-4 z-10 max-w-sm">
        <div className="bg-background/80 backdrop-blur-sm rounded-md p-3 text-xs font-mono">
          <div className="text-muted-foreground mb-1">Current props:</div>
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(props, null, 2)}
          </pre>
        </div>
      </div>

      {/* Example query hint */}
      <div className="absolute bottom-4 left-4 z-10 max-w-lg">
        <div className="bg-background/80 backdrop-blur-sm rounded-md p-3 text-xs font-mono">
          <div className="text-muted-foreground mb-1">Example query:</div>
          <code className="text-primary break-all">
            /test/{componentType}
            {isValidType && getExampleQuery(componentType)}
          </code>
        </div>
      </div>

      {!isValidType ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Invalid component type</h1>
            <p className="text-muted-foreground mb-4">
              Use one of: {COMPONENT_TYPES.join(", ")}
            </p>
            <div className="flex gap-2 justify-center">
              {COMPONENT_TYPES.map((type) => (
                <Link
                  key={type}
                  href={`/test/${type}`}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  {type}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Canvas
          camera={{ position: [-2.77, 3.68, 6.23], fov: 50 }}
          className="bg-background"
        >
          <Suspense fallback={<Loader />}>
            <Suspense fallback={null}>
              <Environment preset="sunset" background={false} />
            </Suspense>

            <Scene componentType={componentType} props={isStoreReady ? props : initialProps} />

            <OrbitControls target={[0, 1, 0]} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

function Scene({
  componentType,
  props,
}: {
  componentType: ComponentType;
  props: PostProps | PlateProps | RafterProps;
}) {
  if (!componentType || !props) return null;

  switch (componentType) {
    case "post":
      return <Post {...(props as PostProps)} />;
    case "plate":
      return <Plate {...(props as PlateProps)} />;
    case "rafter":
      return <Rafter {...(props as RafterProps)} />;
  }
}
