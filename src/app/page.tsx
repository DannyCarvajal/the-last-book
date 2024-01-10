"use client";

import { ResetedView } from "@/components/ResetedView";
import { StartView } from "@/components/StartView";
import { ChooseBookView } from "@/components/ChooseBookView";

import { useBibleGame } from "@/hooks/useBibleGame";
import { useSetInitCookie } from "@/hooks/useSetInitCookie";

export default function Home() {
  useSetInitCookie();

  const {
    start,
    isReseted,
    lastAnswerStatus,
    showTimeUp,
    currPoints,
    currBook,
    secondsLeft,
    checkAnswer,
    handleStartGame,
  } = useBibleGame();

  /* Finish view when game is completed */
  if (isReseted) {
    return <ResetedView points={currPoints} handleStartGame={handleStartGame} showTimeUp={showTimeUp} />;
  }

  /* Initial Game View */
  if (!start) {
    return <StartView handleStartGame={handleStartGame} />;
  }

  /* Choosing a book */
  return (
    <ChooseBookView
      currBook={currBook}
      secondsLeft={secondsLeft}
      lastAnswerStatus={lastAnswerStatus}
      checkAnswer={checkAnswer}
    />
  );
}
