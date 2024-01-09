import { getEmojiFromPoints } from "@/utils/finalMessage";
import { TimeUpLayout } from "./TimeUpLayout";
import { useEffect } from "react";
import { Points } from "@/models/points";
import { shouldAddToLeaderboard } from "@/utils/leaderboard";

type Props = {
  points: number;
  handleStartGame: () => void;
  showTimeUp: boolean;
  username: string;
  userId: string;
  currLeaderboard: Points[];
};

export const ResetedView = ({ points, handleStartGame, showTimeUp, userId, username, currLeaderboard }: Props) => {
  /* Update `leaderboard` and `personal best` right after showing reseted view */
  useEffect(() => {
    console.log("showing here");
    const shouldSendToLeaderboard = shouldAddToLeaderboard({ currLeaderboard, newPoints: points });
  }, []);

  if (showTimeUp) return <TimeUpLayout currPoints={points} />;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      {/* Points accumulated really BIG */}
      <div className="">
        <h2 className="text-4xl lg:text-6xl font-bold text-white font-mono">
          PUNTOS: {points} {getEmojiFromPoints(points)}
        </h2>
      </div>
      <button
        onClick={handleStartGame}
        className="bg-emerald-300 rounded-sm text-neutral-700 p-4 w-32 font-semibold absolute right-12 bottom-12 text-lg lg:text-xl"
      >
        Empezar de nuevo
      </button>
    </main>
  );
};
