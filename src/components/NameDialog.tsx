"use client";

import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import useDisclosure from "@/hooks/useDisclosure";
import { setCookie } from "@/utils/session";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  name: string;
};
export const NameDialog = ({ isOpen, onClose }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, formState, getValues, reset } = useForm<FormValues>();
  const { open, close } = useDisclosure();
  const { errors } = formState;

  const name = getValues("name");

  const storeUser = () => {
    console.log(name);
    const randomUserId = crypto.randomUUID();

    // Local save your 'simulated' user data
    setCookie("username", name, 100);
    localStorage.setItem("username", name);

    setCookie("userId", randomUserId, 100);
    localStorage.setItem("userId", randomUserId);

    // Validate if it exists in the previous leaderboard
    onClose();
  };

  const resetForm = () => {
    setShowConfirm(false);
    reset();
  };

  const onSave = () => setShowConfirm(true);

  /*
      When submitting new score:
      - validate there is not another user called the same, if it is called the same it should match the identifier
      - Send id, name, score, country, date
  */

  if (showConfirm) {
    return (
      <Dialog open={isOpen}>
        <DialogContent className="bg-gray-100 text-white border-0 max-w-[95vw] w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Te quieres llamar `<span className="italic font-semibold text-zinc-400">{name}</span>`?
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 flex-wrap mt-2">
            <p className="mt-1 text-gray-800 min-w-[300px]">No lo podrás cambiar luego</p>
            <div className="flex gap-4 flex-wrap flex-1">
              <Button onClick={resetForm} className="bg-red-500 text-black flex-1  hover:bg-red-600">
                Cambiar
              </Button>
              <Button onClick={storeUser} className="bg-emerald-200 text-black flex-1 hover:bg-emerald-300">
                Guardar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-gray-100 text-white border-0 max-w-[90vw] w-[600px]">
        <DialogHeader>
          <DialogTitle>Escribe tu nombre completo</DialogTitle>
        </DialogHeader>
        <p className="mt-1 text-gray-800">Será usado para guardar tus records, y competir en el leaderboard</p>
        <form className="flex gap-4 mt-4 flex-wrap" onSubmit={handleSubmit(onSave)}>
          <div className="flex flex-col flex-wrap gap-2 w-full">
            <Input
              type="text"
              className="text-black min-w-[300px]"
              {...register("name", {
                validate: (value) => value.split(" ").length > 1 || "Escribe tu nombre completo",
              })}
            />
            {errors?.name?.message && <p className="text-red-700 text-xs">{errors.name.message}</p>}
          </div>
          <Button type="submit" className="bg-emerald-200 w-full text-black hover:bg-emerald-300">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
