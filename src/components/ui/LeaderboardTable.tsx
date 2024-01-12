import { usePersonalBest } from "@/hooks/api/usePersonalBest";
import { Points } from "@/models/points";
import { getUser } from "@/store/user";
import { cn } from "@/utils/cn";
import { Trophy } from "lucide-react";
import { bgPoints } from "../ResetedView";

type Props = {
  leaderboard: Points[];
  currPoints: number;
};

const LeaderBoardTable = ({ leaderboard, currPoints }: Props) => {
  const { userId: currUserId } = getUser();
  const youAreInLeaderboardToShow = leaderboard.some(({ userId: id }) => id === currUserId);
  const { personalBest } = usePersonalBest();
  const thisMatchIsTheBest = currPoints !== personalBest;

  return (
    <div className="w-[450px] max-w-[90vw] flex flex-col gap-8">
      <div className="rounded-lg  rounded-tl-lg rounded-tr-lg">
        <div className="flex h-16 rounded-tl-lg rounded-tr-lg items-center justify-around bg-[url('https://shots.codepen.io/username/pen/QNzRZp-800.jpg?version=1677465407')]">
          <Trophy size={32} className="text-white" />
          <div className="flex flex-col items-center  justify-center">
            <h2 className="font-extrabold uppercase text-lg text-white">Mejores</h2>
            <span className="font-thin uppercase -mt-1 text-lg text-white">Puntajes</span>
          </div>
        </div>
        <div className="flex flex-col">
          {leaderboard.map(({ username, userId, points }, index) => {
            const isYou = currUserId === userId;
            const isCurrPersonalBest = isYou && thisMatchIsTheBest;

            return (
              <div
                className={cn(
                  `flex justify-between items-center h-14 p-2 border-b bg-white
            ${index === leaderboard.length - 1 ? "rounded-bl-lg rounded-br-lg" : "border-gray-200"}
            `,
                  bgPoints({ type: isCurrPersonalBest ? "bestPoints" : undefined })
                )}
                key={index}
              >
                <span className="text-gray-200 font-medium text-lg capitalize caret-rose-200">{username}</span>
                <span className={`text-stone-600 uppercase text-[15px] ${isCurrPersonalBest && "text-white"}`}>
                  <span className="font-bold">{points}</span> Puntos
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Best */}
      {!youAreInLeaderboardToShow && personalBest && (
        <div className="flex flex-col">
          <div
            className={cn(
              `flex justify-between items-center h-14 p-2 border-b  rounded-lg`,
              bgPoints({ type: "bestPoints" })
            )}
          >
            <span className="text-white font-medium text-lg capitalize caret-rose-200">Tu mejor puntuación</span>
            <span className="uppercase text-[15px] text-white">
              <span className="font-bold">{personalBest}</span> Puntos
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoardTable;
