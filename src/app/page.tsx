"use client";

import { ResetedView } from "@/components/ResetedView";
import { StartView } from "@/components/StartView";
import { ChooseBookView } from "@/components/ChooseBookView";

import { useBibleGame } from "@/hooks/useBibleGame";
import { useSetInitCookie } from "@/hooks/useSetInitCookie";
import LottieBubble from "@/components/ui/LottieBubble";
import { SecondsBubble } from "@/components/ui/SecondsBubble";
import { useEffect } from "react";

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

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // We listen to the resize event
    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      return () => {
        window.removeEventListener("resize", () => {});
      };
    });
  }, []);

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
