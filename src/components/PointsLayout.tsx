type Props = {
  type: "success" | "fail";
};

export const PointsLayout = ({ type }: Props) => {
  const SUCCESS_POINTS = 10;
  const FAIL_POINTS = -30;

  /* ADD POINTS */
  if (type === "success") {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-emerald-700 flex items-center justify-center text-white text-6xl font-bold">
        +{SUCCESS_POINTS} Puntos
      </div>
    );
  }

  /* DELETE POINTS */
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-red-500 flex items-center justify-center text-white text-6xl font-bold">
      {FAIL_POINTS} Puntos
    </div>
  );
};
