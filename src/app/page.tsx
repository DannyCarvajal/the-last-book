"use client";
import { useEffect, useRef, useState } from "react";
import { use30SecondsCounter } from "@/hooks/use30SecondsCounter";
import { BookTuple, getBookPairs } from "@/logic/getBiblePairs";
import { getFinalMessage } from "@/utils/finalMessage";
import { ResetedView } from "@/components/ResetedView";
import { PointsLayout } from "@/components/PointsLayout";

export default function Home() {
  const { isReseted, secondsLeft, startTimer } = use30SecondsCounter();

  const [start, setStart] = useState(false);
  const [book, setBook] = useState<BookTuple | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<"success" | "fail" | null>(null);
  const [showTimeUp, setShowTimeUp] = useState(false);

  const points = useRef(0);

  const getCurrentLevel = () => {
    if (secondsLeft > 20) return 1;
    if (secondsLeft > 10) return 2;
    return 3;
  };

  const handleStartGame = () => {
    setStart(true);
    points.current = 0;
    startTimer();
    const newBook = getBookPairs(1);
    setBook(newBook);
  };

  const checkAnswer = (selectedBook: string) => {
    if (!book || !selectedBook) return;

    const wasCorrect = selectedBook === book.correctBook.book;

    if (wasCorrect) {
      points.current += 10;
    } else {
      points.current -= 30;
    }

    setCurrentAnswer(wasCorrect ? "success" : "fail");

    // Reset answser
    setTimeout(() => {
      setCurrentAnswer(null);
    }, 600);

    const newBook = getBookPairs(getCurrentLevel());
    setBook(newBook);
  };

  useEffect(() => {
    // Show time out for 3 seconds
    if (isReseted) {
      setShowTimeUp(true);
      setTimeout(() => {
        setShowTimeUp(false);
      }, 1500);
    }
  }, [isReseted]);

  if (showTimeUp) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-yellow-400 flex items-center justify-center text-white text-6xl font-bold">
        {getFinalMessage(points.current)}
      </div>
    );
  }

  if (isReseted) return <ResetedView points={points.current} handleStartGame={handleStartGame} />;

  if (!start) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">El último Libro 📖</h1>
        <button
          onClick={handleStartGame}
          className="bg-emerald-300 rounded-sm text-neutral-700 p-4 w-32 font-semibold text-xl"
        >
          Empezar
        </button>
      </main>
    );
  }

  if (currentAnswer) return <PointsLayout type={currentAnswer} />;

  if (start && book) {
    return (
      <main className="relative flex min-h-screen justify-between flex-wrap max-w-[100vw] overflow-hidden">
        <div
          className="relative flex-1 flex-wrap border-2 cursor-pointer border-x-emerald-300 hover:bg-neutral-950 duration-500"
          onClick={() => checkAnswer(book.firstBook.book)}
        >
          {/* Legend choose the last book */}
          <div className="absolute top-4 text-xl lg:-right-28 flex justify-center items-center bg-zinc-800 px-8 py-4 font-semibold rounded-lg text-white">
            Elige el último libro 📖
          </div>

          <div className="flex flex-col items-center justify-center h-full min-w-[500px]">
            <h2 className="text-6xl font-bold text-white">{book.firstBook.book}</h2>
          </div>

          {/* Time left */}
          <div className="rounded-full bg-indigo-800 absolute lg:-right-16 lg:bottom-10 lg:left-auto left-1/2 lg:translate-x-0  -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center h-32 w-32">
              <h2 className="text-4xl font-bold text-white">{secondsLeft}</h2>
            </div>
          </div>
        </div>

        <div
          className="cursor-pointer flex-1 hover:bg-neutral-950 duration-500 border-2 border-x-emerald-300"
          onClick={() => checkAnswer(book.secondBook.book)}
        >
          <div className="flex flex-col items-center justify-center h-full min-w-[500px]">
            <h2 className="text-6xl font-bold text-white">{book.secondBook.book}</h2>
          </div>
        </div>
      </main>
    );
  }
}
