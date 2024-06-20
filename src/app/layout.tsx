import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import { Providers } from "./providers";
import ProtectedWrapper from "./protectedWrapper";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus",
  description: "SaaS MVP for Nexus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <Suspense>
            <ProtectedWrapper>{children}</ProtectedWrapper>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
