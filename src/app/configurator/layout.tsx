import { Header } from "@/components/layout/header";
import { Metadata } from "next";

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
