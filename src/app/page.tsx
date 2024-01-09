"use client";

import { useEffect, useState } from "react";

import { ResetedView } from "@/components/ResetedView";
import { StartView } from "@/components/StartView";
import { ChooseBookView } from "@/components/ChooseBookView";
import { PointsLayout } from "@/components/PointsLayout";

import { useBibleGame } from "@/hooks/useBibleGame";
import { NameDialog } from "@/components/NameDialog";
import useDisclosure from "@/hooks/useDisclosure";
import { useSetInitCookie } from "@/hooks/useSetInitCookie";
import { getUserFromLocal } from "@/utils/user";
import useSWR from "swr";
import { Points } from "@/models/points";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const { data, error, isLoading } = useSWR<Points[]>("/api/leaderboard", fetcher);
  // Sort by points, if points are same then sort by which date is first
  const currLeaderboard = data
    ? data.sort(function (a, b) {
        if (a.points === b.points) {
          return a.date! > b.date! ? 1 : -1;
        }
        return a.points! < b.points! ? 1 : -1;
      })
    : [];
  console.log({ currLeaderboard });
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

  const { isOpen, close, open } = useDisclosure(false);

  // Open the Name Dialog if no user saved
  useEffect(() => {
    const user = getUserFromLocal();
    if (!user) return open();

    const userHasUsername = user?.localUsername || user?.cookieUsername;
    const userHasUserId = user?.localUserId || user?.cookieUserId;
    if (!userHasUsername || !userHasUserId) open();

    setUsername(user.localUsername || user.cookieUsername || "");
    setUserId(user.localUserId || user.cookieUserId || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Finish view when game is completed */
  if (isReseted) {
    return (
      <ResetedView
        points={currPoints}
        username={username}
        userId={userId}
        handleStartGame={handleStartGame}
        showTimeUp={showTimeUp}
        currLeaderboard={currLeaderboard || []}
      />
    );
  }

  /* Initial Game View */
  if (!start) {
    return (
      <>
        <StartView handleStartGame={handleStartGame} username={username} />
        <NameDialog isOpen={isOpen} onClose={close} setUsername={setUsername} />
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
