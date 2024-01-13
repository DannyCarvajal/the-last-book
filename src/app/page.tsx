"use client";

import { ResetedView } from "@/components/ResetedView";

import { StartView } from "@/components/StartView";
import { ChooseBookView } from "@/components/ChooseBookView";
import { SecondsBubble } from "@/components/ui/SecondsBubble";
import LottieBubble from "@/components/ui/LottieBubble";

import { useBibleGame } from "@/hooks/useBibleGame";

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
    return <ResetedView points={currPoints} handleStartGame={handleStartGame} showTimeUp={showTimeUp} />;
  }

  /* Initial Game View */
  if (!start) {
    return <StartView handleStartGame={handleStartGame} />;
  }

  /* Choosing a book */
  return (
    <ChooseBookView currBook={currBook} checkAnswer={checkAnswer}>
      {/* Time left */}
      {lastAnswerStatus ? (
        <LottieBubble lastAnswerStatus={lastAnswerStatus} />
      ) : (
        <SecondsBubble secondsLeft={secondsLeft} />
      )}
    </ChooseBookView>
  );
}
