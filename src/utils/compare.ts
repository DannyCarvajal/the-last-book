import { NAMES } from "@/constants/names";

function removeAccents(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[0-9]/g, "");
}

export const removeAccentsFromNameArray = (names: string[]): string[] => {
  return names.map((name) => removeAccents(name).toLocaleLowerCase());
};

export const nicknameContainsOneValidName = (nickname: string) => {
  const nicknameParts = nickname.split(" ");
  const nickanamesParsed = Array.isArray(nicknameParts)
    ? removeAccentsFromNameArray(nicknameParts)
    : removeAccentsFromNameArray([nickname]);

  const hasValidName = NAMES.some((nameData) => nickanamesParsed.includes(nameData));
  const validNames = NAMES.filter((nameData) => nickanamesParsed.includes(nameData));
  return hasValidName;
};
