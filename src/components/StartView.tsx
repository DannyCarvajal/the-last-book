"use client";

import { useEffect } from "react";

import { RegisterDialog } from "@/components/RegisterDialog";
import AdminDataModal from "./ui/AdminDataModal";

import useDisclosure from "@/hooks/useDisclosure";
import { useUser } from "@/hooks/api/useUser";
import { getLocalStorageOrCookiesUser } from "@/utils/session";

type Props = {
  handleStartGame: () => void;
};

export const StartView = ({ handleStartGame }: Props) => {
  const { username, isAdmin } = useUser();
  const { isOpen, close, open } = useDisclosure(false);

  // Check local Data to validate if user exists
  useEffect(() => {
    const isTestingMode = process.env.NEXT_PUBLIC_USE_OLIVER_ADMIN_USER === "true";
    const { userId } = getLocalStorageOrCookiesUser();
    if (!userId && !isTestingMode) return open();
  }, []);

  return (
    <>
      <main className="flex flex-col h-[100svh] items-center justify-center p-24 bg-black ">
        <h1 className="absolute top-4 left-4 text-base lg:text-xl mb-8 text-white capitalize">Hi {username} 👋🏻</h1>
        <div className="left-3 top-14 py-2 px-4 rounded-lg lg:left-auto text-lg font-bold text-white absolute lg:top-8 lg:right-8 bg-gradient-to-r from-emerald-800 to-slate-800">
          elultimolibro.co
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold mb-8 text-white w-max">El Último Libro 📖</h1>

        {isAdmin && <AdminDataModal />}

        <button
          onClick={handleStartGame}
          className="bg-emerald-300 rounded-sm text-neutral-700 p-4 w-32 font-semibold text-xl"
        >
          Empezar
        </button>
      </main>
      <RegisterDialog isOpen={isOpen} onClose={close} />
    </>
  );
};
