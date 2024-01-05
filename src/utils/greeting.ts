export const getGreeting = (name: string) => {
  // send a custom message depdending on the time of day use emojis
  const date = new Date();
  const hour = date.getHours();

  if (hour < 12) {
    return `Good morning ${name} 🌅`;
  } else if (hour < 18) {
    return `Good afternoon ${name} 🌇`;
  } else {
    return `Good evening ${name} 🌃`;
  }
};
