import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="px-4 container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a className="mr-4 flex items-center gap-2 lg:mr-6" href="/">
            <span className="font-bold">Three.js Projects</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
