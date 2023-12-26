type Props = {
  secondsLeft: number;
};
export const SecondsBubble = ({ secondsLeft }: Props) => {
  return (
    <div className="rounded-full bg-indigo-800 absolute lg:-right-16 lg:bottom-10 lg:left-auto left-1/2 lg:translate-x-0  -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center justify-center h-24 w-24 lg:h-32 lg:w-32">
        <h2 className="text-2xl lg:text-4xl font-bold text-white">{secondsLeft}</h2>
      </div>
    </div>
  );
};
