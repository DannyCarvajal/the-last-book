import { CurrentBook } from "@/components/ui/CurrentBook";
import { SecondsBubble } from "@/components/ui/SecondsBubble";
import { BookTuple } from "@/logic/getBiblePairs";

type Props = {
  currBook: BookTuple | null;
  secondsLeft: number;
  checkAnswer: (book: string) => void;
};

export const ChooseBookView = ({ currBook, secondsLeft, checkAnswer }: Props) => {
  if (!currBook) return null;

  const { firstBook, secondBook } = currBook || {};
  return (
    <main className="relative flex min-h-screen justify-between flex-wrap max-w-[100vw] max-h-[100vh] overflow-hidden">
      <div
        className="relative flex-1 flex-wrap border-2 cursor-pointer border-x-emerald-300 bg-black hover:bg-neutral-950 duration-500"
        onClick={() => checkAnswer(firstBook.book)}
      >
        {/* Legend choose the last book */}
        <div className="absolute top-4 text-lg lg:text-xl lg:-right-28 flex justify-center items-center bg-zinc-800 px-8 py-4 font-semibold rounded-lg text-white">
          Elige el último libro 📖
        </div>
        <CurrentBook book={firstBook.book} />

        {/* Time left */}
        <SecondsBubble secondsLeft={secondsLeft} />
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
