"use client";
import { useEffect, useRef, useState } from "react";
import { use30SecondsCounter } from "@/hooks/use30SecondsCounter";
import { BookTuple, getBookPairs } from "@/logic/getBiblePairs";

export default function Home() {
  const [start, setStart] = useState(false);
  const [book, setBook] = useState<BookTuple | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<"success" | "fail" | null>(null);
  const [showTimeUp, setShowTimeUp] = useState(false);
  const { isReseted, secondsLeft, startTimer } = use30SecondsCounter();
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

  const emojiBasedOnPoints = () => {
    if (points.current < -90) return "💀💩💀";
    if (points.current < -60) return "💀💀";
    if (points.current < -30) return "💀";
    if (points.current < 0) return "😭";
    if (points.current < 50) return "👍🏻";
    if (points.current < 100) return "😀";
    if (points.current < 150) return "😎";
    return "🤩";
  };

  const finalMessages = ["Se acabo el tiempo ⌛️!", "Se hizo lo que se pudo!", "Se acabo el tiempo, te tengo Fé 🌚"];

  const getFinalMessage = () => {
    if (points.current < 0) return "No lo sé Rick ⌛️";
    if (points.current < 30) return "Mejor algo que nada ⌛️!";
    return finalMessages[Math.floor(Math.random() * finalMessages.length)];
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
        {getFinalMessage()}
      </div>
    );
  }

  if (isReseted) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center p-24">
        {/* Points accumulated really BIG */}
        <div className="">
          <h2 className="text-6xl font-bold text-white font-mono">
            PUNTOS: {points.current} {emojiBasedOnPoints()}
          </h2>
        </div>
        <button
          onClick={handleStartGame}
          className="bg-emerald-300 rounded-sm text-neutral-700 p-4 w-32 font-semibold absolute right-12 bottom-12 text-xl"
        >
          Empezar de nuevo
        </button>
      </main>
    );
  }

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

  if (currentAnswer === "success") {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-emerald-700 flex items-center justify-center text-white text-6xl font-bold">
        +10 Puntos
      </div>
    );
  }

  if (currentAnswer === "fail") {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-red-500 flex items-center justify-center text-white text-6xl font-bold">
        -30 Puntos
      </div>
    );
  }

  if (start && book) {
    return (
      <main className="relative flex min-h-screen justify-between flex-wrap">
        <div
          className="relative flex-1 flex-wrap border-2 cursor-pointer border-x-emerald-300 hover:bg-neutral-950 duration-500"
          onClick={() => checkAnswer(book.firstBook.book)}
        >
          {/* Legend choose the last book */}
          <div className="absolute top-4 text-xl -right-28 flex justify-center items-center bg-zinc-800 px-8 py-4 font-semibold rounded-lg text-white">
            Elige el último libro 📖
          </div>

          <div className="flex flex-col items-center justify-center h-full min-w-[500px]">
            <h2 className="text-6xl font-bold text-white">{book.firstBook.book}</h2>
          </div>
          {/* Time left */}
          <div className="rounded-full bg-indigo-800 absolute -right-16 bottom-10">
            <div className="flex items-center justify-center h-32 w-32">
              <h2 className="text-4xl font-bold text-white">{secondsLeft}</h2>
            </div>
          </div>
        </div>

        <div
          className="cursor-pointer flex-1 hover:bg-neutral-950 duration-500 border-x-emerald-300"
          onClick={() => checkAnswer(book.secondBook.book)}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-6xl font-bold text-white">{book.secondBook.book}</h2>
          </div>
        </div>
      </main>
    );
  }
}
