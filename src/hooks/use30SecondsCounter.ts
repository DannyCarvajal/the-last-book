import { useEffect, useState } from "react";

export const use30SecondsCounter = () => {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [start, setStart] = useState(false);
  const [isReseted, setIsReseted] = useState(false);

  const startTimer = () => {
    setStart(true);
    setIsReseted(false);
  };

  const resetTimer = () => {
    setSecondsLeft(30);
    setStart(false);
    setIsReseted(true);
  };

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        if (secondsLeft === 0) {
          resetTimer();
          return;
        }
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [start]);

  // When get to 0, reset the timer
  useEffect(() => {
    if (secondsLeft === 0) {
      resetTimer();
    }
  }, [secondsLeft]);

  return { secondsLeft, startTimer, resetTimer, isReseted };
};
