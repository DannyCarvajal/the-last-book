import { useEffect, useRef, useState } from "react";
import { use30SecondsCounter } from "./use30SecondsCounter";
import { BookTuple, getBookPairs } from "@/logic/getBiblePairs";

const TIME_UP_DURATION = 1500;
const POINTS_DISPLAY_TIME = 500;
const POINTS_GAINED_PER_RIGHT_ANSWER = 10;
const POINTS_LOST_PER_WRONG_ANSWER = 30;

export const useBibleGame = () => {
  const { isReseted, secondsLeft, startTimer } = use30SecondsCounter();

  const [start, setStart] = useState(false);
  const [currBook, setCurrBook] = useState<BookTuple | null>(null);
  const [lastAnswerStatus, setLastAnswerStatus] = useState<"success" | "fail" | null>(null);
  const [showTimeUp, setShowTimeUp] = useState(false);

  const points = useRef(0);

  // After game completes, show timeUp message for some seconds
  useEffect(() => {
    if (!isReseted) return;

    setShowTimeUp(true);

    setTimeout(() => {
      setShowTimeUp(false);
    }, TIME_UP_DURATION);
  }, [isReseted]);

  const handleStartGame = () => {
    setStart(true);
    points.current = 0;
    startTimer();
    const newBook = getBookPairs(1);

    setCurrBook(newBook);
  };

  const checkAnswer = (selectedBook: string) => {
    if (!currBook || !selectedBook) return;

    const wasCorrect = selectedBook === currBook.correctBook.book;

    if (wasCorrect) {
      points.current += POINTS_GAINED_PER_RIGHT_ANSWER;
    } else {
      points.current -= POINTS_LOST_PER_WRONG_ANSWER;
    }

    setLastAnswerStatus(wasCorrect ? "success" : "fail");

    // Reset answer
    setTimeout(() => {
      setLastAnswerStatus(null);
    }, POINTS_DISPLAY_TIME);

    const newBook = getBookPairs(getCurrentLevel());
    setCurrBook(newBook);
  };

  /* Util Functions */
  const getCurrentLevel = () => {
    if (secondsLeft > 20) return 1;
    if (secondsLeft > 10) return 2;
    return 3;
  };

  return {
    handleStartGame,
    start,
    showTimeUp,
    isReseted,
    lastAnswerStatus,
    currBook,
    currPoints: points.current,
    secondsLeft,
    checkAnswer,
  };
};
