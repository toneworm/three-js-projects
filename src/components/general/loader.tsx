// components/Loader.tsx
"use client";
import { Html, useProgress } from "@react-three/drei";

export function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-sm">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}
