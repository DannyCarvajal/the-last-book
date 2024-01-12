import { getFinalMessage } from "@/utils/finalMessage";

type Props = {
  currPoints: number;
};

export const TimeUpLayout = ({ currPoints }: Props) => {
  const message = getFinalMessage(currPoints);
  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full bg-yellow-400 flex items-center justify-center text-white text-4xl lg:text-6xl font-bold">
      {message}
    </div>
  );
};
