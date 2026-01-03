import { Header } from "@/components/layout/header";
import { Metadata } from "next";

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
