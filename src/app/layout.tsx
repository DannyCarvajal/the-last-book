import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

// Update the meta informatiuon
export const metadata: Metadata = {
  title: "Last Book",
  // Prevent to zoom on mobile
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  description: "The Last Book",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-[100svh]`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
