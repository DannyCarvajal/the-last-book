type Props = {
  book: string;
};

export const CurrentBook = ({ book }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-screen lg:min-w-[500px] max-w-[100vw]">
      <h2 className=" text-4xl md:text-6xl font-bold text-white">{book}</h2>
    </div>
  );
};
