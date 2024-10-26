import { useEffect, useState } from "react";

interface TimerCallbacks {
  onTimerEnd?: () => void;
}

const useTimer = (
  initialSeconds: number = 0,
  callbacks: TimerCallbacks = {}
) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1 && callbacks.onTimerEnd) {
            callbacks.onTimerEnd(); // Call the callback function when timer reaches zero
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds, callbacks]);

  const resetTimer = (newSeconds: number = 0) => {
    setSeconds(newSeconds);
  };

  const formattedHours = Math.floor(seconds / 3600);
  const formattedMinutes = Math.floor((seconds % 3600) / 60);
  const formattedSeconds = seconds % 60;

  return {
    minutes: formattedMinutes,
    seconds: formattedSeconds,
    hours: formattedHours,
    formattedMinutes:
      formattedMinutes < 10 ? `0${formattedMinutes}` : `${formattedMinutes}`,
    formattedHours:
      formattedHours < 10 ? `0${formattedHours}` : `${formattedHours}`,
    formattedSeconds:
      formattedSeconds < 10 ? `0${formattedSeconds}` : `${formattedSeconds}`,
    resetTimer,
  };
};

export default useTimer;
