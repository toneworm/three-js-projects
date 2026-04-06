import type { Metadata } from "next";

import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "ThreeJS Projects | Combination",
  description: "Combination Viewer",
};

export default function CombinationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Combination Viewer" />
      {children}
    </>
  );
}
