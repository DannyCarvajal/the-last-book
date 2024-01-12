export const getEmojiFromPoints = (points: number) => {
  if (points < -90) return "💀💩";
  if (points < -60) return "💀💀";
  if (points < -30) return "💀";
  if (points < 0) return "😭";
  if (points < 50) return "👍🏻";
  if (points < 100) return "😀";
  if (points < 150) return "😎";
  if (points < 190) return "🤩";
  if (points < 240) return "🤩🖤";
  return "❤️‍🔥";
};

const finalMessages = ["Se acabo el tiempo ⌛️!", "Se hizo lo que se pudo!", "Se acabo el tiempo, te tengo Fé 🌚"];

export const getFinalMessage = (points: number) => {
  if (points < 0) return "No lo sé Rick ⌛️";
  if (points < 30) return "Mejor algo que nada ⌛️!";
  return finalMessages[Math.floor(Math.random() * finalMessages.length)];
};
