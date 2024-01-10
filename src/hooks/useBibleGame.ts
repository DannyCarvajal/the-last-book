import { useEffect, useRef, useState } from "react";
import { use30SecondsCounter } from "./use30SecondsCounter";
import { BookTuple, getBookPairs } from "@/logic/getBiblePairs";
import { usePersonalBest } from "./api/usePersonalBest";
import { getUser } from "@/store/user";
import { updatePersonalBest } from "@/services/leaderboard";

const TIME_UP_DURATION = 1500;
const POINTS_DISPLAY_TIME = 500;
const POINTS_GAINED_PER_RIGHT_ANSWER = 10;
const POINTS_LOST_PER_WRONG_ANSWER = 30;

export type LastAnswerStatus = "success" | "fail" | null;

type PointsToUpdate = {
  points: number;
  personalBest: number | null | undefined;
  username: string | null;
  userId: string | null;
};

const updateBestPoints = async ({ points, personalBest, username, userId }: PointsToUpdate) => {
  const isNewRecord = !personalBest || points > personalBest;
  if (!isNewRecord) return;
  if (!userId || !username) return;

  const updated = await updatePersonalBest({ userId, username, points });
  console.log({ updated });
};

export const useBibleGame = () => {
  const { userId, username } = getUser();

  const { isReseted, secondsLeft, startTimer } = use30SecondsCounter();
  const { personalBest } = usePersonalBest();

  const [start, setStart] = useState(false);
  const [currBook, setCurrBook] = useState<BookTuple | null>(null);
  const [lastAnswerStatus, setLastAnswerStatus] = useState<LastAnswerStatus>(null);
  const [showTimeUp, setShowTimeUp] = useState(false);

  const points = useRef(0);

  // After game completes, show timeUp message for some seconds
  useEffect(() => {
    if (!isReseted) return;

    setShowTimeUp(true);

    setTimeout(() => {
      setShowTimeUp(false);
    }, TIME_UP_DURATION);

    // Update DB
    console.log("updating your best points");
    console.log({ points: points.current, personalBest, username, userId });
    updateBestPoints({ points: points.current, personalBest, username, userId });
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
