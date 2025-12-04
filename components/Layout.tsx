"use client";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {children}
    </div>
  );
}
