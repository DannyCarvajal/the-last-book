import { LastAnswerStatus } from "@/hooks/useBibleGame";
import Lottie, { useLottie } from "lottie-react";
import failLottie from "@/lotties/fail.json";
import successLottie from "@/lotties/success.json";
import { Check, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

type Props = {
  secondsLeft: number;
  lastAnswerStatus: LastAnswerStatus;
};
export const SecondsBubble = ({ secondsLeft, lastAnswerStatus }: Props) => {
  // const optionsSuccess = {
  //   animationData: successLottie,
  //   loop: false,
  //   setSpeed: 2,
  // };

  // const { View: LottieSuccess } = useLottie(optionsSuccess);

  // const optionsFail = {
  //   animationData: failLottie,
  //   loop: false,
  //   setSpeed: 2,
  //   className: "flex items-center justify-center rounded-full h-24 w-24 lg:h-32 lg:w-32 bg-[#f87171] ",
  // };

  // const { View: LottieFail } = useLottie(optionsFail);

  return (
    <div
      className={`rounded-full ${
        lastAnswerStatus == null && "bg-indigo-800"
      } absolute lg:-right-16 lg:bottom-10 lg:left-auto left-1/2 lg:translate-x-0  -translate-x-1/2 -translate-y-1/2`}
    >
      {lastAnswerStatus === "fail" ? (
        <Lottie
          animationData={failLottie}
          loop={false}
          className="flex items-center justify-center rounded-full h-24 w-24 lg:h-32 lg:w-32 bg-[#f87171] "
        />
      ) : // <CheckCircle2 className="text-white bg-[#34d399]" size={32} />
      lastAnswerStatus === "success" ? (
        <Lottie
          animationData={failLottie}
          loop={false}
          className="flex items-center justify-center rounded-full h-24 w-24 lg:h-32 lg:w-32 bg-[#34d399]"
        />
      ) : (
        // <XCircle className="text-white bg-[#34d399]"  />
        <div className="flex items-center justify-center h-24 w-24 lg:h-32 lg:w-32">
          <h2 className="text-2xl lg:text-4xl font-bold text-white">{secondsLeft}</h2>
        </div>
      )}
    </div>
  );
};
