import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full px-4 flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-4 flex items-center gap-2 lg:mr-6" href="/">
            <span className="uppercase tracking-widest">
              Three.js Projects | Interactive Garage
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
