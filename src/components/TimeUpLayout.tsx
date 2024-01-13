import { useRef } from "react";

import { getFinalMessage } from "@/utils/finalMessage";

type Props = {
  currPoints: number;
};

export const TimeUpLayout = ({ currPoints }: Props) => {
  const message = useRef(getFinalMessage(currPoints));
  return (
    <div className="fixed z-[9999] top-0 left-0 w-full h-full bg-yellow-400 flex items-center justify-center text-white text-3xl lg:text-5xl font-bold">
      {message.current}
    </div>
  );
};
