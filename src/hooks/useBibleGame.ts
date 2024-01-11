import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { use30SecondsCounter } from "./use30SecondsCounter";
import { BookTuple, getBookPairs } from "@/logic/getBiblePairs";
import { usePersonalBest } from "./api/usePersonalBest";
import { getUser } from "@/store/user";
import { updatePersonalBest } from "@/services/leaderboard";
import { useLeaderboard } from "./api/useLeaderboard";

const TIME_UP_DURATION = 1500;
const POINTS_DISPLAY_TIME = 2000;
const POINTS_GAINED_PER_RIGHT_ANSWER = 10;
const POINTS_LOST_PER_WRONG_ANSWER = 30;

export type LastAnswerStatus = "success" | "fail" | null;

type PointsToUpdate = {
  points: number;
  personalBest: number | null | undefined;
  username: string | null;
  userId: string | null;
  mutate: () => void;
};

const saveBestPoints = async ({ points, personalBest, username, userId, mutate }: PointsToUpdate) => {
  const isNewRecord = !personalBest || points > personalBest;
  if (!isNewRecord) return;
  if (!userId || !username) return;

  const updated = await updatePersonalBest({ userId, username, points });
  mutate();
  console.log({ updated });
};

export const useBibleGame = () => {
  const { userId, username } = getUser();

  const { isReseted, secondsLeft, startTimer } = use30SecondsCounter();

  const { mutate } = useLeaderboard();
  const { personalBest, mutate: mutateBest } = usePersonalBest();

  const mutateEp = () => {
    mutateBest();
    mutate();
  };

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
    saveBestPoints({ points: points.current, personalBest, username, userId, mutate: mutateEp });
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
    toast.dismiss();

    const wasCorrect = selectedBook === currBook.correctBook.book;

    if (wasCorrect) {
      console.log("correct");
      points.current += POINTS_GAINED_PER_RIGHT_ANSWER;
      toast.success("+10 Points", {
        duration: 2000,
        position: "top-center",

        // Styling
        style: {
          height: "80px",
          width: "220px",
          fontSize: "1.4rem",
          backgroundColor: "#34d399",
          fontWeight: "bold",
          color: "white",
        },

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#10b981",
          secondary: "#064e3b",
        },
      });
    } else {
      points.current -= POINTS_LOST_PER_WRONG_ANSWER;
      toast.error("-30 Points", {
        duration: 2000,
        position: "top-center",

        // Styling
        style: {
          height: "80px",
          width: "220px",
          fontSize: "1.3rem",
          backgroundColor: "#f87171",

          fontWeight: "bold",
          color: "white",
        },
      });
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
