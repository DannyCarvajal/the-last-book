"use client";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Toaster containerStyle={{ top: isMobile ? 12 : 34 }} />
      {children}
    </SWRConfig>
  );
};
