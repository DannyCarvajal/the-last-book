type Props = {
  book: string;
};

export const CurrentBook = ({ book }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-screen lg:w-auto lg:min-w-[500px] max-w-[100vw]">
      <h2 className=" text-[35px] md:text-6xl font-bold text-white">{book}</h2>
    </div>
  );
};
