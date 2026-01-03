import Link from "next/link";

const links = [{ name: "Interactive Garage", href: "/garage" }];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full p-8">
      <h1 className="text-4xl uppercase tracking-[1.5rem] text-center border-b pb-8 border-b-muted">
        Three.js Projects
      </h1>
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
