"use client";

import { getEmojiFromPoints } from "@/utils/finalMessage";
import { TimeUpLayout } from "./TimeUpLayout";
import { useLeaderboard } from "@/hooks/api/useLeaderboard";
import LeaderBoardTable from "./ui/LeaderboardTable";

type Props = {
  points: number;
  handleStartGame: () => void;
  showTimeUp: boolean;
};

export const ResetedView = ({ points, handleStartGame, showTimeUp }: Props) => {
  const { leaderboardToShow } = useLeaderboard();

  if (showTimeUp) return <TimeUpLayout currPoints={points} />;

  return (
    <main className="relative flex min-h-screen max-h-[100svh] gap-8 lg:justify-around flex-col lg:flex-row items-center w-full p-16 bg-black">
      <h2 className="text-3xl lg:text-5xl font-bold text-white font-mono">
        PUNTOS: {points} {getEmojiFromPoints(points)}
      </h2>
      <LeaderBoardTable leaderboard={leaderboardToShow} />
      <button
        onClick={handleStartGame}
        className="bg-emerald-300 rounded-sm text-neutral-700 p-4 w-max lg:w-32 font-semibold lg:absolute right-12 bottom-12 text-lg lg:text-xl"
      >
        Empezar de nuevo
      </button>
    </main>
  );
};
