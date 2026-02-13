import type { Metadata } from "next";

import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "ThreeJS Projects | Collection",
  description: "Collection Viewer",
};

export default function CollectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Collection Viewer" />
      {children}
    </>
  );
}
