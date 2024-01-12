import { CurrentBook } from "@/components/ui/CurrentBook";
import { SecondsBubble } from "@/components/ui/SecondsBubble";
import { BookTuple } from "@/logic/getBiblePairs";

import { type LastAnswerStatus } from "@/hooks/useBibleGame";
import LottieBubble from "./ui/LottieBubble";

type Props = {
  currBook: BookTuple | null;
  checkAnswer: (book: string) => void;
  children: React.ReactNode;
};

export const ChooseBookView = ({ currBook, checkAnswer, children }: Props) => {
  if (!currBook) return null;

  const { firstBook, secondBook } = currBook || {};
  return (
    <main className="relative flex justify-between flex-wrap h-[100svh] overflow-hidden">
      <div
        className="relative flex-1 flex-wrap border-2 cursor-pointer border-x-emerald-300 bg-black hover:bg-neutral-950 duration-500"
        onClick={() => checkAnswer(firstBook.book)}
      >
        {/* Legend choose the last book */}
        <div className="absolute top-3 lg:top-10 text-base lg:text-xl lg:-right-36 flex justify-center items-center bg-zinc-800 px-8 py-4 font-semibold rounded-lg text-white">
          Elige el último libro 📖
        </div>
        <CurrentBook book={firstBook.book} />
        {children}
      </div>
      <div
        className="cursor-pointer flex-1 hover:bg-neutral-950 duration-500 bg-black border-2 border-x-emerald-300"
        onClick={() => checkAnswer(secondBook.book)}
      >
        <CurrentBook book={secondBook.book} />
      </div>
    </main>
  );
};
