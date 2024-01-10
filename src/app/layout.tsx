import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

// Update the meta informatiuon
export const metadata: Metadata = {
  title: "The Last Book",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} max-h-[100svh]`}>{children}</body>
      </Providers>
    </html>
  );
}
