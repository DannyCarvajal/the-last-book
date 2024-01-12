import { useEffect } from "react";
import { RegisterDialog } from "@/components/RegisterDialog";
import useDisclosure from "@/hooks/useDisclosure";
import { getUser } from "@/store/user";

type Props = {
  handleStartGame: () => void;
};

export const StartView = ({ handleStartGame }: Props) => {
  const { username } = getUser();
  const { isOpen, close, open } = useDisclosure(false);

  // On first load, show the register dialog
  useEffect(() => {
    const { username, userId } = getUser();
    if (!username || !userId) return open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="flex flex-col h-[100svh] items-center justify-center p-24 bg-black ">
        <h1 className="absolute top-4 left-4 text-base lg:text-xl mb-8 text-white capitalize">Hi {username} 👋🏻</h1>
        <div className="left-3 top-14 py-2 px-4 rounded-lg lg:left-auto text-lg font-bold text-white absolute lg:top-8 lg:right-8 bg-gradient-to-r from-emerald-800 to-slate-800">
          elultimolibro.co
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold mb-8 text-white w-max">El Último Libro 📖</h1>

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
