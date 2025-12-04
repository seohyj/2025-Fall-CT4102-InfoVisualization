import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Spectrum of Extinction",
  description:
    "An interactive visualization of species extinction crisis using IUCN Red List data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
