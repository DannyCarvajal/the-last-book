"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { storeUser, usernameAlreadyUsed } from "@/services/users";

import { parseName } from "@/utils/parsing";
import { isOffensiveWord } from "@/utils/badWords";
import { nicknameContainsOneValidName } from "@/utils/compare";
import { useUser } from "@/hooks/api/useUser";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export type FormValues = {
  name: string;
};

export const RegisterDialog = ({ isOpen, onClose }: Props) => {
  const { mutate: mutateUser } = useUser();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, getValues, reset, setError } = useForm<FormValues>();
  const { errors } = formState;

  const name = getValues("name");
  const parsedName = parseName(name);

  const saveUserToDB = async () => {
    setLoading(true);
    const loadingToast = toast.loading("Guardando tu usuario...", { position: "bottom-center" });
    const storedUser = await storeUser({ name });
    toast.dismiss(loadingToast);

    if (!storedUser) {
      toast.error("Hubo un error guardando tu usuario 😢", { position: "bottom-center" });
      return;
    }

    toast.success("Usuario guardado! 🎉", { position: "bottom-center" });

    mutateUser();
    setLoading(false);
    onClose();
  };

  const resetForm = () => {
    setShowConfirm(false);
  };

  const validateNameLengthAndSymbols = (value: string) => {
    if (value.length > 40) return "El nombre es muy largo 🤨";

    const hasProperLength = value.trim().split(" ").length > 1;
    if (!hasProperLength) return "Escribe tu nombre completo 🙌🏻";

    // Max length should be 3 words
    const passedMaxLength = value.trim().split(" ").length > 3;
    if (passedMaxLength) return "Máximo 3 palabras 🙌🏻";

    // Letter number letter number is avoid for malitious names
    const patternRegexLetterFirst = /[a-zA-Z]\d[a-zA-Z]\d/;
    const patternRegexNumberFirst = /\d[a-zA-Z]\d[a-zA-Z]/;
    const badWordRegex = patternRegexLetterFirst.test(value) || patternRegexNumberFirst.test(value);
    if (badWordRegex) return "No puedes usar números como si fueran letras 👀";

    // Must contain at least one valid name or last name
    const hasOneValidName = nicknameContainsOneValidName(value);
    if (!hasOneValidName) return "Debes escribir al menos un nombre o apellido válido 😃";

    const regex = /^[A-Za-z0-9\sáéíóúüñ¿]+$/; // Letters, numbers, and spaces allowed
    const hasValidSymbols = regex.test(value);
    if (!hasValidSymbols) return "Solo se permiten letras y números 🙌🏻";
  };

  const onSave = async ({ name }: FormValues) => {
    // Validate if its not a bad name
    const mayBeOffensive = isOffensiveWord(name);
    if (mayBeOffensive) {
      setError("name", { message: "Puede que este nombre no sea apropiado? 🤨" });
      return;
    }

    // Validate if its unique name
    const alreadyCreatedUsername = await usernameAlreadyUsed(name);

    if (alreadyCreatedUsername) {
      setError("name", { message: "Nombre de usuario ya existe 🥲" });
      return;
    }

    setShowConfirm(true);
  };

  if (showConfirm) {
    return (
      <Dialog open={isOpen}>
        <DialogContent className="bg-gray-100 text-white border-0 max-w-[95vw] w-[600px] scale-100 lg:scale-110">
          <DialogHeader>
            <DialogTitle>
              Te quieres llamar <span className="italic font-semibold text-zinc-400">{parsedName}</span> ?
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 flex-wrap mt-2">
            <p className="mt-1 text-gray-800 min-w-[300px]">No lo podrás cambiar luego</p>
            <div className="flex gap-4 flex-wrap flex-1">
              <Button onClick={resetForm} className="bg-red-500 text-black flex-1  hover:bg-red-600">
                Cambiar
              </Button>
              <Button
                onClick={saveUserToDB}
                disabled={loading}
                className="bg-emerald-200 text-black flex-1 hover:bg-emerald-300"
              >
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
      <DialogContent className="bg-gray-100 text-white border-0 max-w-[90vw] w-[600px] scale-100 lg:scale-110">
        <DialogHeader>
          <DialogTitle>Escribe tu nombre completo</DialogTitle>
        </DialogHeader>
        <p className="text-gray-800">Será usado para guardar tus records, y competir en el leaderboard</p>
        <form className="flex gap-4 mt-4 flex-wrap" onSubmit={handleSubmit(onSave)}>
          <div className="flex flex-col flex-wrap gap-2 w-full">
            <Input
              type="text"
              className="text-black min-w-[300px]"
              {...register("name", {
                validate: (value) => validateNameLengthAndSymbols(value),
              })}
            />
            {!name && !errors?.name?.message && (
              <p className="text-gray-800 text-xs">Usa 2 o 3 palabras. Puedes usar números</p>
            )}
            {errors?.name?.message && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          </div>
          <Button type="submit" className="bg-emerald-200 w-full text-black hover:bg-emerald-300">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
