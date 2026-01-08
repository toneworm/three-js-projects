import { Header } from "@/components/layout/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThreeJS Projects | Garage Proof of Concept",
  description: "Garage Proof of Concept",
};

export default function GarageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="Garage Proof of Concept" />
      {children}
    </>
  );
}
