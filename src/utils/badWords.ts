import { BAD_WORDS } from "@/constants/badWords";
import { ES_BAD_WORDS } from "@/constants/badWordsEs";
import { NAMES } from "@/constants/names";

const wordToConsonants = (word: string) => {
  const vowels = "aeiouAEIOU";
  const consonants = Array.from(word).filter((letter) => !vowels.includes(letter) && isNaN(Number(letter)));
  return consonants.join("");
};

const countVowels = (letter: string): number => {
  const vowels = "aeiouAEIOU";
  return Array.from(letter).filter((char) => vowels.includes(char)).length;
};

const countNumbers = (word: string): number => {
  return Array.from(word).filter((char) => !isNaN(Number(char))).length;
};

const badWordsConsonants = BAD_WORDS.map(wordToConsonants);

/**
 * Checks if a given username is offensive based on various criteria.
 *
 * @param {string} username - The input username to be checked for offensiveness.
 * @returns {boolean} - `true` if the username is offensive, otherwise `false`.
 */
export const isOffensiveWord = (username: string): boolean => {
  const usernameParts = username.split(" ").map((word) => word.toLocaleLowerCase());

  // Check if the word is explicitly in the bad word list
  if (BAD_WORDS.includes(username.toLowerCase())) {
    return true;
  }

  // Check if the word part is explicitly in the bad word list
  for (const word of usernameParts) {
    if (BAD_WORDS.includes(word.toLowerCase())) {
      return true;
    }

    const wordWithoutNumbers = word.replace(/\d+/g, "");
    const isHalfOffensive = BAD_WORDS.filter((badWord) => word.includes(badWord));
    const isPartOfNameList = NAMES.includes(word) || NAMES.includes(wordWithoutNumbers);
    const isOffensiveInSpanish = ES_BAD_WORDS.some((badWord) => word.includes(badWord) && !isPartOfNameList);

    if (isHalfOffensive.length > 0 && !isPartOfNameList && isOffensiveInSpanish) return true;
  }

  // Check if the word contains numbers as replacements for letters (e.g., estupido -> estup1d0)
  const isOffensiveByConstantAnalysis = checkOffensiveWordsByConstants(usernameParts);
  if (isOffensiveByConstantAnalysis) return true;

  // Check if the word is created by any configuration of spaces (e.g., daniel pu ta)
  const firstSecondWord = usernameParts[0] + usernameParts[1];
  const secondThirdWord = usernameParts[2] ? usernameParts[1] + usernameParts[2] : "";
  const wordVariants = [firstSecondWord, secondThirdWord].filter((word) => word);

  const isOffensiveVariants = checkOffensiveWordsByConstants(wordVariants);
  if (isOffensiveVariants) return true;

  return false;
};

const checkOffensiveWordsByConstants = (words: string[]): boolean => {
  const usernameInConstants = words.map(wordToConsonants);

  for (const [index, word] of usernameInConstants.entries()) {
    const fullWord = words[index];

    // Save the index of all the similar bad words
    const similarBadWordsIndex = badWordsConsonants.reduce((acc, badWord, index) => {
      if (badWord === word) acc.push(index);
      return acc;
    }, [] as number[]);

    if (similarBadWordsIndex.length === 0) continue;
    const realBadWords = similarBadWordsIndex.map((index) => BAD_WORDS[index]);

    // If has the same amount of vowels and numbers is bad word
    for (const realBadWord of realBadWords) {
      if (realBadWord === fullWord) {
        return true;
      }

      const vowelsBadWord = countVowels(realBadWord);
      const numbersCurrWord = countNumbers(fullWord);

      if (vowelsBadWord === numbersCurrWord) {
        return true;
      }

      // Validate is in names list
      const wordWithoutNumbers = fullWord.replace(/\d+/g, "");
      const isInList = NAMES.includes(wordWithoutNumbers);

      // If it ends the same way and contains numbers is a bad word
      const partialWordStart = fullWord.substring(0, Math.floor(fullWord.length / 2));
      if (realBadWord.includes(partialWordStart) && numbersCurrWord > 0 && !isInList) {
        return true;
      }

      // If it starts the same way and contains numbers is a bad word
      const partialWordEnd = fullWord.substring(Math.floor(fullWord.length / 2));

      if (realBadWord.includes(partialWordEnd) && numbersCurrWord > 0 && !isInList) {
        return true;
      }
    }

    // Check if it has one letter, one number, one letter and one number
    const patternRegexLetterFirst = /[a-zA-Z]\d[a-zA-Z]\d/;
    const patternRegexNumberFirst = /\d[a-zA-Z]\d[a-zA-Z]/;
    const badWordRegex = patternRegexLetterFirst.test(fullWord) || patternRegexNumberFirst.test(fullWord);

    if (badWordRegex) return true;
  }

  return false;
};
