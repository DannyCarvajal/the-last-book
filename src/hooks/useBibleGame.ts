import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { use30SecondsCounter } from "./use30SecondsCounter";
import { BookTuple, getBookPairs } from "@/logic/getBiblePairs";
import { usePersonalBest } from "./api/usePersonalBest";
import { updatePersonalBest } from "@/services/leaderboard";
import { useLeaderboard } from "./api/useLeaderboard";
import { useUser } from "./api/useUser";

const TIME_UP_DURATION = 2200;
const POINTS_DISPLAY_TIME = 1500;
const POINTS_GAINED_PER_RIGHT_ANSWER = 10;
const POINTS_LOST_PER_WRONG_ANSWER = 30;

export type LastAnswerStatus = "success" | "fail" | null;

type PointsToUpdate = {
  points: number;
  personalBest: number | null | undefined;
  username: string | null;
  userId: string | null;
  mutateGameData: () => void;
};

const saveBestPoints = async ({ points, personalBest, username, userId, mutateGameData }: PointsToUpdate) => {
  const isNewRecord = !personalBest || points > personalBest;
  if (!isNewRecord) return;
  if (!userId || !username) return;

  toast.loading("Saving your new best record 🤩");
  const updated = await updatePersonalBest({ userId, username, points });
  mutateGameData();
  toast.dismiss();

  if (updated) {
    toast.success("Saved");
  } else {
    toast.error("Failed to save, sorry 😔");
  }
};

export const useBibleGame = () => {
  const { userId, username } = useUser();
  const { isReseted, secondsLeft, startTimer } = use30SecondsCounter();
  const { personalBest, mutate: mutatePersonalBest } = usePersonalBest();
  const { mutate: mutateLeaderboard } = useLeaderboard();

  const [start, setStart] = useState(false);
  const [currBook, setCurrBook] = useState<BookTuple | null>(null);
  const [lastAnswerStatus, setLastAnswerStatus] = useState<LastAnswerStatus>(null);
  const [showTimeUp, setShowTimeUp] = useState(false);

  const points = useRef(0);

  const isMobile = typeof window !== "undefined" && window?.innerWidth < 768;
  let timeOut = useRef<NodeJS.Timeout | null>(null);

  const mutateGameData = () => {
    mutatePersonalBest();
    mutateLeaderboard();
  };

  // After game completes, show timeUp message for some seconds
  useEffect(() => {
    if (!isReseted) return;
    toast.dismiss();

    setShowTimeUp(true);

    setTimeout(() => {
      setShowTimeUp(false);
    }, TIME_UP_DURATION);

    // Update DB
    if (!username || !userId) return;

    saveBestPoints({ points: points.current, personalBest, username, userId, mutateGameData });
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
    if (timeOut.current) {
      clearTimeout(timeOut.current);
    }

    toast.dismiss();

    const wasCorrect = selectedBook === currBook.correctBook.book;

    const toastStyles = {
      height: isMobile ? "60px" : "80px",
      width: isMobile ? "180px" : "220px",
      fontSize: isMobile ? "1.2rem" : "1.4rem",
      bottom: isMobile ? "25px" : "0px",
      fontWeight: "bold",
      color: "white",
    };

    if (wasCorrect) {
      points.current += POINTS_GAINED_PER_RIGHT_ANSWER;
      toast.success("+10 Points", {
        duration: POINTS_DISPLAY_TIME,
        position: "top-center",

        // Styling
        style: {
          ...toastStyles,
          backgroundColor: "#34d399",
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
        duration: POINTS_DISPLAY_TIME,
        position: "top-center",

        // Styling
        style: {
          ...toastStyles,
          backgroundColor: "#f87171",
        },
      });
    }

    setLastAnswerStatus(wasCorrect ? "success" : "fail");

    // Reset answer
    timeOut.current = setTimeout(() => {
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
