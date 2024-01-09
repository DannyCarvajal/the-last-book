"use client";

import { useEffect, useState } from "react";

import { ResetedView } from "@/components/ResetedView";
import { StartView } from "@/components/StartView";
import { ChooseBookView } from "@/components/ChooseBookView";
import { PointsLayout } from "@/components/PointsLayout";
import { TimeUpLayout } from "@/components/TimeUpLayout";

import { useBibleGame } from "@/hooks/useBibleGame";
import { NameDialog } from "@/components/NameDialog";
import useDisclosure from "@/hooks/useDisclosure";
import { useSetInitCookie } from "@/hooks/useSetInitCookie";
import { getUserFromLocal } from "@/utils/user";

export default function Home() {
  const [userName, setUserName] = useState("");

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

  useSetInitCookie();
  const { isOpen, close, open } = useDisclosure(false);

  // Open the Name Dialog if no user saved
  useEffect(() => {
    const user = getUserFromLocal();
    if (!user) return open();

    const userHasUsername = user?.localUserName || user?.cookieUsername;
    if (!userHasUsername) open();

    setUserName(user.localUserName || user.cookieUsername || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  if (!start) {
    return (
      <>
        <StartView handleStartGame={handleStartGame} userName={userName} />
        <NameDialog isOpen={isOpen} onClose={close} setUserName={setUserName} />
      </>
    );
  }

  /* Choosing a book */
  return (
    <>
      {lastAnswerStatus && <PointsLayout type={lastAnswerStatus} />}
      <ChooseBookView currBook={currBook} secondsLeft={secondsLeft} checkAnswer={checkAnswer} />
    </>
  );
}
