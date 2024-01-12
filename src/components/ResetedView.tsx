"use client";

import { getEmojiFromPoints } from "@/utils/finalMessage";
import { TimeUpLayout } from "./TimeUpLayout";
import { useLeaderboard } from "@/hooks/api/useLeaderboard";
import LeaderBoardTable from "./ui/LeaderboardTable";
import { tv } from "tailwind-variants";
import { cn } from "@/utils/cn";
import { usePersonalBest } from "@/hooks/api/usePersonalBest";

type Props = {
  points: number;
  handleStartGame: () => void;
  showTimeUp: boolean;
};

export const bgPoints = tv({
  variants: {
    type: {
      bestPoints: "bg-gradient-to-r from-emerald-400 to-gray-500",
      current: "bg-gradient-to-r from-blue-400 to-gray-400",
      regular: "bg-gradient-to-r from-gray-400 to-gray-500",
    },
  },
});

export const ResetedView = ({ points, handleStartGame, showTimeUp }: Props) => {
  const { data } = useLeaderboard();
  const { personalBest } = usePersonalBest();

  const thisMatchIsTheBest = points === personalBest;

  if (showTimeUp) return <TimeUpLayout currPoints={points} />;

  return (
    <main className="relative flex h-[100svh]  gap-8  lg:justify-around flex-col lg:flex-row items-center w-full p-8 lg:p-16 bg-black">
      <h2 className="text-3xl max-w-[95vw] w-max flex gap-1 justify-center items-center h lg:text-5xl font-bold text-white font-mono">
        PUNTOS:{" "}
        <span
          className={cn(
            bgPoints({ type: thisMatchIsTheBest ? "bestPoints" : "current" }),
            `flex justify-center items-center  pt-2 px-3  rounded-lg`
          )}
        >
          {points} {getEmojiFromPoints(points)}
        </span>
      </h2>
      <LeaderBoardTable leaderboard={data} currPoints={points} />
      <button
        onClick={handleStartGame}
        className="bg-emerald-300 rounded-sm text-neutral-700 p-4 w-max lg:w-32 font-semibold lg:absolute right-12 bottom-12 text-lg lg:text-xl"
      >
        Empezar de nuevo
      </button>
    </main>
  );
};
