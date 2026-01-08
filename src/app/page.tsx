import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { name: "Interactive Garage", href: "/garage" },
  { name: "Garage Proof of Concept", href: "/garage-poc" },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full p-8">
      <div className="relative w-full">
        <h1 className="text-4xl uppercase tracking-[1.5rem] text-center border-b pb-8 border-b-muted">
          Three.js Projects
        </h1>
        <div className="absolute top-0 right-0 flex items-center justify-end gap-2">
          <ThemeToggle />
        </div>
      </div>

      <ul className="flex flex-col gap-4 items-center mt-4">
        {links.map((link) => (
          <li key={link.href} className="list-disc">
            <Link
              href={link.href}
              className="text-xl text-primary hover:underline"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
