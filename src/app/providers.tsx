"use client";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Toaster />
      {children}
    </SWRConfig>
  );
};
