"use client";

import { ResetedView } from "@/components/ResetedView";
import { StartView } from "@/components/StartView";
import { PointsLayout } from "@/components/PointsLayout";
import { TimeUpLayout } from "@/components/TimeUpLayout";

import { useBibleGame } from "@/hooks/useBibleGame";
import { ChooseBookView } from "@/components/ChooseBookView";

export default function Home() {
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
    return (
      <>
        {showTimeUp && <TimeUpLayout currPoints={currPoints} />}
        <ResetedView points={currPoints} handleStartGame={handleStartGame} />
      </>
    );
  }

  /* Initial Game View */
  if (!start) return <StartView handleStartGame={handleStartGame} />;

  /* Choosing a book */
  return (
    <>
      {lastAnswerStatus && <PointsLayout type={lastAnswerStatus} />}
      <ChooseBookView currBook={currBook} secondsLeft={secondsLeft} checkAnswer={checkAnswer} />
    </>
  );
}
