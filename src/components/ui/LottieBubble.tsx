import { LastAnswerStatus } from "@/hooks/useBibleGame";
import Lottie from "lottie-react";
import failLottie from "@/lotties/fail.json";
import successLottie from "@/lotties/success.json";
import { tv } from "tailwind-variants";
import { bubbleBase } from "./SecondsBubble";

const bubble = tv({
  base: "rounded-full bg-white flex justify-center items-center absolute lg:-right-16 lg:bottom-10 lg:left-auto left-1/2 lg:translate-x-0  -translate-x-1/2 -translate-y-1/2 h-20 w-20 lg:h-32 lg:w-32",
  variants: {
    type: {
      success: "bg-[#34d399]",
      fail: "bg-[#f87171]",
    },
  },
});

type Props = {
  lastAnswerStatus: LastAnswerStatus;
};

const LottieBubble = ({ lastAnswerStatus }: Props) => {
  if (!lastAnswerStatus) return null;

  return (
    <div className={`${bubble({ type: lastAnswerStatus })} ${bubbleBase()} `}>
      {lastAnswerStatus === "fail" ? (
        <Lottie animationData={failLottie} loop={false} className="h-16 w-16 lg:h-28 lg:w-28" />
      ) : (
        lastAnswerStatus === "success" && (
          <Lottie animationData={successLottie} loop={false} className="h-16 w-16 lg:h-28 lg:w-28" />
        )
      )}
    </div>
  );
};

export default LottieBubble;
