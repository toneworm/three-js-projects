import type { Metadata } from "next";

import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "ThreeJS Projects | Configurator",
  description: "Component / Collection Configurator",
};

export default function GarageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Component / Collection Configurator" />
      {children}
    </>
  );
}
