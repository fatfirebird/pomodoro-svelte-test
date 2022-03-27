export const formatTimer = (timer: number) => {
  const minutes = (timer / 60) | 0;
  const seconds = timer - minutes * 60;

  if (minutes > 0)
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  return seconds;
};
