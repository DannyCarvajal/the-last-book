// import { Points } from "@/models/points";
// import { Trophy } from "lucide-react";

// type Props = {
//   leaderboard: Points[];
// };

// const LeaderBoardTable = ({ leaderboard }: Props) => {
//   return (
//     <div className="rounded-lg w-[500px] max-w-[90vw] ">
//       <div className="flex h-24 rounded-tl-lg rounded-tr-lg items-center justify-around bg-[url('https://shots.codepen.io/username/pen/QNzRZp-800.jpg?version=1677465407')]">
//         <Trophy size={32} className="text-yellow-400" />
//         <div className="flex flex-col gap-1">
//           <h2 className="font-extrabold uppercase text-lg text-white">MEJORES</h2>
//           <span className="font-thin uppercase text-lg text-white">PUNTAJES</span>
//         </div>
//       </div>
//       <div className="flex flex-col">
//         {leaderboard.map((points, index) => (
//           <div
//             className={`flex bg-white justify-between h-16 items-center p-2 ${
//               index === leaderboard.length - 1 && "rounded-bl-lg rounded-br-lg"
//             }`}
//             key={index}
//           >
//             <span className="text-gray-600 uppercase font-medium text-lg">{points.username}</span>
//             <span className="font-semibold text-emerald-950">{points.points} PUNTOS</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LeaderBoardTable;

import { usePersonalBest } from "@/hooks/api/usePersonalBest";
import { Points } from "@/models/points";
import { getUser } from "@/store/user";
import { Trophy } from "lucide-react";

type Props = {
  leaderboard: Points[];
};

const LeaderBoardTable = ({ leaderboard }: Props) => {
  const { userId: currUserId } = getUser();
  const youAreInLeaderboardToShow = leaderboard.some(({ userId: id }) => id === currUserId);
  const { personalBest } = usePersonalBest();
  console.log({ personalBest });

  return (
    <div className="w-[450px] flex flex-col gap-8">
      <div className="rounded-lg w-[450px]  bg-white max-w-[90vw] rounded-tl-lg rounded-tr-lg">
        <div className="flex h-16 rounded-tl-lg rounded-tr-lg items-center justify-around bg-[url('https://shots.codepen.io/username/pen/QNzRZp-800.jpg?version=1677465407')]">
          <Trophy size={32} className="text-white" />
          <div className="flex flex-col items-center  justify-center">
            <h2 className="font-extrabold uppercase text-lg text-white">Mejores</h2>
            <span className="font-thin uppercase -mt-1 text-lg text-white">Puntajes</span>
          </div>
        </div>
        <div className="flex flex-col">
          {leaderboard.map(({ username, userId, points }, index) => (
            <div
              className={`flex justify-between items-center h-14 p-2 border-b 
            ${index === leaderboard.length - 1 ? "rounded-bl-lg rounded-br-lg" : "border-gray-200"}
            ${currUserId === userId && "bg-gradient-to-r from-yellow-400 to-orange-500"}
            `}
              key={index}
            >
              <span className="text-gray-200 font-medium text-lg capitalize caret-rose-200">{username}</span>
              <span className={`text-stone-600 uppercase text-[15px] ${currUserId === userId && "text-white"}`}>
                <span className="font-bold">{points}</span> Puntos
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Best */}
      {!youAreInLeaderboardToShow && personalBest && (
        <div className="flex flex-col">
          <div className="flex justify-between items-center h-14 p-2 border-b  bg-gradient-to-r from-yellow-400 to-orange-500">
            <span className="text-gray-200 font-medium text-lg capitalize caret-rose-200">Tu mejor puntuación</span>
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
