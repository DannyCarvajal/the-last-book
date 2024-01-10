import { type LastAnswerStatus } from "@/hooks/useBibleGame";

type Props = {
  type: LastAnswerStatus;
};

export const PointsLayout = ({ type }: Props) => {
  const SUCCESS_POINTS = 10;
  const FAIL_POINTS = -30;

  /* ADD POINTS */
  if (type === "success") {
    return (
      <div className="fixed z-20 top-0 left-0 w-full h-full bg-emerald-700 flex items-center justify-center text-white text-4xl lg:text-6xl font-bold">
        +{SUCCESS_POINTS} Puntos
      </div>
    );
  }

  /* DELETE POINTS */
  return (
    <div className="fixed z-20 top-0 left-0 w-full h-full bg-red-500 flex items-center justify-center text-white text-4xl lg:text-6xl font-bold">
      {FAIL_POINTS} Puntos
    </div>
  );
};
