export type BookPair = { book: string; abbreviation: string };
export type BookTuple = { firstBook: BookPair; secondBook: BookPair; correctBook: BookPair };

export const bibleBooks: BookPair[] = [
  { book: "Génesis", abbreviation: "Génesis" },
  { book: "Éxodo", abbreviation: "Éxodo" },
  { book: "Levítico", abbreviation: "Levít." },
  { book: "Números", abbreviation: "Núm." },
  { book: "Deuteronomio", abbreviation: "Deut." },
  { book: "Josué", abbreviation: "Jos." },
  { book: "Jueces", abbreviation: "Juec." },
  { book: "Rut", abbreviation: "Rut" },
  { book: "1 Samuel", abbreviation: "1 Sam." },
  { book: "2 Samuel", abbreviation: "2 Sam." },
  { book: "1 Reyes", abbreviation: "1 Rey." },
  { book: "2 Reyes", abbreviation: "2 Rey." },
  { book: "1 Crónicas", abbreviation: "1 Crón." },
  { book: "2 Crónicas", abbreviation: "2 Crón." },
  { book: "Esdras", abbreviation: "Esd." },
  { book: "Nehemías", abbreviation: "Neh." },
  { book: "Ester", abbreviation: "Ester" },
  { book: "Job", abbreviation: "Job" },
  { book: "Salmos", abbreviation: "Sal." },
  { book: "Proverbios", abbreviation: "Prov." },
  { book: "Eclesiastés", abbreviation: "Ecl." },
  { book: "Cantares", abbreviation: "Cant." },
  { book: "Isaías", abbreviation: "Isa." },
  { book: "Jeremías", abbreviation: "Jer." },
  { book: "Lamentaciones", abbreviation: "Lam." },
  { book: "Ezequiel", abbreviation: "Eze." },
  { book: "Daniel", abbreviation: "Dan." },
  { book: "Oseas", abbreviation: "Ose." },
  { book: "Joel", abbreviation: "Joel" },
  { book: "Amós", abbreviation: "Amós" },
  { book: "Abdías", abbreviation: "Abd." },
  { book: "Jonás", abbreviation: "Jon." },
  { book: "Miqueas", abbreviation: "Miq." },
  { book: "Nahúm", abbreviation: "Nah." },
  { book: "Habacuc", abbreviation: "Hab." },
  { book: "Sofonías", abbreviation: "Sof." },
  { book: "Hageo", abbreviation: "Hag." },
  { book: "Zacarías", abbreviation: "Zac." },
  { book: "Malaquías", abbreviation: "Mal." },
  { book: "Mateo", abbreviation: "Mat." },
  { book: "Marcos", abbreviation: "Mar." },
  { book: "Lucas", abbreviation: "Luc." },
  { book: "Juan", abbreviation: "Juan" },
  { book: "Hechos", abbreviation: "Hech." },
  { book: "Romanos", abbreviation: "Rom." },
  { book: "1 Corintios", abbreviation: "1 Cor." },
  { book: "2 Corintios", abbreviation: "2 Cor." },
  { book: "Gálatas", abbreviation: "Gál." },
  { book: "Efesios", abbreviation: "Efe." },
  { book: "Filipenses", abbreviation: "Fil." },
  { book: "Colosenses", abbreviation: "Col." },
  { book: "1 Tesalonicenses", abbreviation: "1 Tes." },
  { book: "2 Tesalonicenses", abbreviation: "2 Tes." },
  { book: "1 Timoteo", abbreviation: "1 Tim." },
  { book: "2 Timoteo", abbreviation: "2 Tim." },
  { book: "Tito", abbreviation: "Tito" },
  { book: "Filemón", abbreviation: "File." },
  { book: "Hebreos", abbreviation: "Heb." },
  { book: "Santiago", abbreviation: "Sant." },
  { book: "1 Pedro", abbreviation: "1 Ped." },
  { book: "2 Pedro", abbreviation: "2 Ped." },
  { book: "1 Juan", abbreviation: "1 Juan" },
  { book: "2 Juan", abbreviation: "2 Juan" },
  { book: "3 Juan", abbreviation: "3 Juan" },
  { book: "Judas", abbreviation: "Jud." },
  { book: "Apocalipsis", abbreviation: "Apo." },
];

export function getBookPairs(level: 1 | 2 | 3): BookTuple {
  const getRandomBook = (): BookPair => {
    const randomIndex = Math.floor(Math.random() * bibleBooks.length);
    return bibleBooks[randomIndex];
  };

  const getRandomBookFarAway = (baseIndex: number, range: number, excludedIndex: number): BookPair => {
    const minIndex = Math.max(0, baseIndex - range);
    const maxIndex = Math.min(bibleBooks.length - 1, baseIndex + range);
    let randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

    // Ensure the randomly selected index is not the excluded index (index of firstBook)
    while (randomIndex === excludedIndex) {
      randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    }

    return bibleBooks[randomIndex];
  };

  const firstBook = getRandomBook();
  let secondBook: BookPair;
  let range: number;

  switch (level) {
    case 1:
      range = Math.floor(Math.random() * 6) + 10; // 10-15 books far away
      secondBook = getRandomBookFarAway(bibleBooks.indexOf(firstBook), range, bibleBooks.indexOf(firstBook));
      break;
    case 2:
      range = Math.floor(Math.random() * 6) + 5; // 5-10 books far away
      secondBook = getRandomBookFarAway(bibleBooks.indexOf(firstBook), range, bibleBooks.indexOf(firstBook));
      break;
    case 3:
      range = Math.floor(Math.random() * 5) + 1; // 1-5 books far away
      secondBook = getRandomBookFarAway(bibleBooks.indexOf(firstBook), range, bibleBooks.indexOf(firstBook));
      break;
    default:
      throw new Error("Invalid level. Choose 1, 2, or 3.");
  }

  const indexFirstBook = bibleBooks.findIndex(({ book }) => book === firstBook.book);
  const indexSecondBook = bibleBooks.findIndex(({ book }) => book === secondBook.book);
  const correctBook = bibleBooks[Math.max(indexFirstBook, indexSecondBook)];

  return { firstBook, secondBook, correctBook };
}
