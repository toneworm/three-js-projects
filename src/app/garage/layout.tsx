import type { Metadata } from "next";

import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "ThreeJS Projects | Garage",
  description: "Interactive Garage",
};

export default function GarageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Interactive Garage" />
      {children}
    </>
  );
}
