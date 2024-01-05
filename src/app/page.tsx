"use client";

import mongoose from "mongoose";
import { ResetedView } from "@/components/ResetedView";
import { StartView } from "@/components/StartView";
import { ChooseBookView } from "@/components/ChooseBookView";
import { PointsLayout } from "@/components/PointsLayout";
import { TimeUpLayout } from "@/components/TimeUpLayout";

import { useBibleGame } from "@/hooks/useBibleGame";
import { useEffect, useState } from "react";
import { NameDialog } from "@/components/NameDialog";
import useDisclosure from "@/hooks/useDisclosure";
import { getCookie, getLocalStorage, setCookie } from "@/utils/session";
import { mongodbURI } from "@/lib/mongodb";

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

  const { isOpen, close, open } = useDisclosure(false);

  const getUsers = async () => {
    await mongoose.connect(mongodbURI);
  };

  // Create a cookie if the user doesn't have one
  useEffect(() => {
    const localUserName = getLocalStorage("username");
    const localUserId = getLocalStorage("userId");

    const cookieUsername = getCookie("username");
    const cookieUserId = getCookie("userId");

    /* Show Session form on first time  */
    const isLogged = (!!localUserName && !!localUserId) || (!!cookieUsername && !!cookieUserId);
    if (!isLogged) {
      open();
    }

    /* Save name */
    setUserName(localUserName || cookieUsername);

    if (!localUserName || !localUserId) return;

    if (!cookieUsername) {
      // Create a cookie
      setCookie("username", localUserName, 100);
      setCookie("userId", localUserId, 100);
    }
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
        <NameDialog isOpen={isOpen} onClose={close} />
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
