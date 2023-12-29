type Props = {
  handleStartGame: () => void;
};

export const StartView = ({ handleStartGame }: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <h1 className="text-2xl lg:text-4xl font-bold mb-8 text-white">El último Libro 📖</h1>
      <button
        onClick={handleStartGame}
        className="bg-emerald-300 rounded-sm text-neutral-700 p-4 w-32 font-semibold text-xl"
      >
        Empezar
      </button>
    </main>
  );
};
